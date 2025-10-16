/**
 * Migration script to move data from Firebase to PostgreSQL
 * Run this script once to migrate existing data
 */

const { Pool } = require('pg');
const bcrypt = require('bcrypt');
require('dotenv').config();

const FIREBASE_URL = "https://creative33-9f884-default-rtdb.firebaseio.com";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

/**
 * Fetch data from Firebase
 */
async function fetchFromFirebase(path) {
  const fetch = (await import('node-fetch')).default;
  const response = await fetch(`${FIREBASE_URL}${path}.json`);
  if (!response.ok) {
    throw new Error(`Failed to fetch from Firebase: ${response.statusText}`);
  }
  return await response.json();
}

/**
 * Migrate users from Firebase to PostgreSQL
 */
async function migrateUsers() {
  console.log('Migrating users...');
  const usersData = await fetchFromFirebase('/users');
  
  if (!usersData) {
    console.log('No users found in Firebase');
    return {};
  }

  const userIdMap = {};

  for (const [firebaseId, user] of Object.entries(usersData)) {
    try {
      // Hash the password (Firebase stores plain text passwords - security issue!)
      const password_hash = await bcrypt.hash(user.password, 10);
      
      const result = await pool.query(
        'INSERT INTO users (name, initials, email, password_hash) VALUES ($1, $2, $3, $4) ON CONFLICT (email) DO UPDATE SET name = $1, initials = $2, password_hash = $4 RETURNING id',
        [user.name, user.initials, user.mail || user.email, password_hash]
      );
      
      userIdMap[firebaseId] = result.rows[0].id;
      console.log(`✓ Migrated user: ${user.name}`);
    } catch (error) {
      console.error(`✗ Failed to migrate user ${user.name}:`, error.message);
    }
  }

  return userIdMap;
}

/**
 * Migrate contacts from Firebase to PostgreSQL
 */
async function migrateContacts(userIdMap) {
  console.log('\nMigrating contacts...');
  const contactsData = await fetchFromFirebase('/contact');
  
  if (!contactsData) {
    console.log('No contacts found in Firebase');
    return {};
  }

  const contactIdMap = {};
  
  // Use first user as owner if no owner specified
  const defaultOwnerId = Object.values(userIdMap)[0];

  for (const [firebaseId, contact] of Object.entries(contactsData)) {
    try {
      const result = await pool.query(
        'INSERT INTO contacts (owner_user_id, name, email, phone, initials, color) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
        [defaultOwnerId, contact.name, contact.email, contact.telefonnummer || contact.phone, contact.initials, contact.color]
      );
      
      contactIdMap[firebaseId] = result.rows[0].id;
      console.log(`✓ Migrated contact: ${contact.name}`);
    } catch (error) {
      console.error(`✗ Failed to migrate contact ${contact.name}:`, error.message);
    }
  }

  return contactIdMap;
}

/**
 * Migrate tasks from Firebase to PostgreSQL
 */
async function migrateTasks(userIdMap, contactIdMap) {
  console.log('\nMigrating tasks...');
  const tasksData = await fetchFromFirebase('/task');
  
  if (!tasksData) {
    console.log('No tasks found in Firebase');
    return;
  }

  // Use first user as creator if no creator specified
  const defaultCreatorId = Object.values(userIdMap)[0];

  for (const [firebaseId, task] of Object.entries(tasksData)) {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // Map Firebase status to PostgreSQL status
      const statusMap = {
        'toDo': 'todo',
        'inProgress': 'in_progress',
        'awaitFeedback': 'awaiting_feedback',
        'done': 'done'
      };
      
      const status = statusMap[task.PositionID] || 'todo';
      const priority = task.Prio === 'urgent' ? 'high' : (task.Prio || 'medium');
      
      // Create task
      const taskResult = await client.query(
        'INSERT INTO tasks (creator_user_id, title, description, due_date, priority, category, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
        [defaultCreatorId, task.Title, task.Description, task.DueDate, priority, task.Category, status]
      );
      
      const taskId = taskResult.rows[0].id;
      
      // Migrate subtasks if they exist
      if (task.Subtasks && Array.isArray(task.Subtasks)) {
        for (const subtask of task.Subtasks) {
          await client.query(
            'INSERT INTO subtasks (task_id, title, is_completed) VALUES ($1, $2, $3)',
            [taskId, subtask.title || subtask.Title, subtask.completed || subtask.is_completed || false]
          );
        }
      }
      
      // Migrate assigned contacts if they exist
      if (task.AssignedTo && Array.isArray(task.AssignedTo)) {
        for (const contactName of task.AssignedTo) {
          // Find contact ID by name
          const contactResult = await client.query(
            'SELECT id FROM contacts WHERE name = $1 LIMIT 1',
            [contactName]
          );
          
          if (contactResult.rows.length > 0) {
            await client.query(
              'INSERT INTO task_assignments (task_id, contact_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
              [taskId, contactResult.rows[0].id]
            );
          }
        }
      }
      
      await client.query('COMMIT');
      console.log(`✓ Migrated task: ${task.Title}`);
    } catch (error) {
      await client.query('ROLLBACK');
      console.error(`✗ Failed to migrate task ${task.Title}:`, error.message);
    } finally {
      client.release();
    }
  }
}

/**
 * Main migration function
 */
async function migrate() {
  try {
    console.log('Starting migration from Firebase to PostgreSQL...\n');
    console.log(`Firebase URL: ${FIREBASE_URL}`);
    console.log(`PostgreSQL: Connected\n`);
    
    // Migrate in order: users -> contacts -> tasks
    const userIdMap = await migrateUsers();
    const contactIdMap = await migrateContacts(userIdMap);
    await migrateTasks(userIdMap, contactIdMap);
    
    console.log('\n✓ Migration completed successfully!');
    console.log('\nSummary:');
    console.log(`- Users migrated: ${Object.keys(userIdMap).length}`);
    console.log(`- Contacts migrated: ${Object.keys(contactIdMap).length}`);
    
  } catch (error) {
    console.error('\n✗ Migration failed:', error);
  } finally {
    await pool.end();
  }
}

// Run migration
migrate();
