const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Middleware
app.use(cors());
app.use(express.json());

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'Access denied' });
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// ========== AUTH ENDPOINTS ==========

// Sign Up
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Generate initials
    const initials = name.split(' ')
      .filter(Boolean)
      .map(word => word[0].toUpperCase())
      .join('');
    
    // Hash password
    const password_hash = await bcrypt.hash(password, 10);
    
    const result = await pool.query(
      'INSERT INTO users (name, initials, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING id, name, initials, email',
      [name, initials, email, password_hash]
    );
    
    const user = result.rows[0];
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
    
    res.status(201).json({ user, token });
  } catch (error) {
    if (error.code === '23505') { // Unique violation
      res.status(400).json({ error: 'Email already exists' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
    
    res.json({
      user: {
        id: user.id,
        name: user.name,
        initials: user.initials,
        email: user.email,
        mail: user.email // For compatibility
      },
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== CONTACTS ENDPOINTS ==========

// Get all contacts
app.get('/api/contacts', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM contacts WHERE owner_user_id = $1 ORDER BY name',
      [req.user.id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create contact
app.post('/api/contacts', authenticateToken, async (req, res) => {
  try {
    const { name, email, phone, initials, color } = req.body;
    
    const result = await pool.query(
      'INSERT INTO contacts (owner_user_id, name, email, phone, initials, color) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [req.user.id, name, email, phone, initials, color]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update contact
app.put('/api/contacts/:id', authenticateToken, async (req, res) => {
  try {
    const { name, email, phone, initials, color } = req.body;
    
    const result = await pool.query(
      'UPDATE contacts SET name = $1, email = $2, phone = $3, initials = $4, color = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 AND owner_user_id = $7 RETURNING *',
      [name, email, phone, initials, color, req.params.id, req.user.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete contact
app.delete('/api/contacts/:id', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM contacts WHERE id = $1 AND owner_user_id = $2 RETURNING id',
      [req.params.id, req.user.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== TASKS ENDPOINTS ==========

// Get all tasks
app.get('/api/tasks', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT t.*, 
        json_agg(DISTINCT jsonb_build_object('id', s.id, 'title', s.title, 'is_completed', s.is_completed)) FILTER (WHERE s.id IS NOT NULL) as subtasks,
        json_agg(DISTINCT jsonb_build_object('id', c.id, 'name', c.name, 'initials', c.initials, 'color', c.color)) FILTER (WHERE c.id IS NOT NULL) as assigned_contacts
      FROM tasks t
      LEFT JOIN subtasks s ON t.id = s.task_id
      LEFT JOIN task_assignments ta ON t.id = ta.task_id
      LEFT JOIN contacts c ON ta.contact_id = c.id
      WHERE t.creator_user_id = $1
      GROUP BY t.id
      ORDER BY t.created_at DESC`,
      [req.user.id]
    );
    
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single task
app.get('/api/tasks/:id', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT t.*, 
        json_agg(DISTINCT jsonb_build_object('id', s.id, 'title', s.title, 'is_completed', s.is_completed)) FILTER (WHERE s.id IS NOT NULL) as subtasks,
        json_agg(DISTINCT jsonb_build_object('id', c.id, 'name', c.name, 'initials', c.initials, 'color', c.color)) FILTER (WHERE c.id IS NOT NULL) as assigned_contacts
      FROM tasks t
      LEFT JOIN subtasks s ON t.id = s.task_id
      LEFT JOIN task_assignments ta ON t.id = ta.task_id
      LEFT JOIN contacts c ON ta.contact_id = c.id
      WHERE t.id = $1 AND t.creator_user_id = $2
      GROUP BY t.id`,
      [req.params.id, req.user.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create task
app.post('/api/tasks', authenticateToken, async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    const { title, description, due_date, priority, category, status, subtasks, assigned_contacts } = req.body;
    
    // Create task
    const taskResult = await client.query(
      'INSERT INTO tasks (creator_user_id, title, description, due_date, priority, category, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [req.user.id, title, description, due_date, priority || 'medium', category, status || 'todo']
    );
    
    const task = taskResult.rows[0];
    
    // Create subtasks if provided
    if (subtasks && subtasks.length > 0) {
      for (const subtask of subtasks) {
        await client.query(
          'INSERT INTO subtasks (task_id, title, is_completed) VALUES ($1, $2, $3)',
          [task.id, subtask.title, subtask.is_completed || false]
        );
      }
    }
    
    // Create task assignments if provided
    if (assigned_contacts && assigned_contacts.length > 0) {
      for (const contactId of assigned_contacts) {
        await client.query(
          'INSERT INTO task_assignments (task_id, contact_id) VALUES ($1, $2)',
          [task.id, contactId]
        );
      }
    }
    
    await client.query('COMMIT');
    
    // Fetch the complete task with relations
    const completeTask = await pool.query(
      `SELECT t.*, 
        json_agg(DISTINCT jsonb_build_object('id', s.id, 'title', s.title, 'is_completed', s.is_completed)) FILTER (WHERE s.id IS NOT NULL) as subtasks,
        json_agg(DISTINCT jsonb_build_object('id', c.id, 'name', c.name, 'initials', c.initials, 'color', c.color)) FILTER (WHERE c.id IS NOT NULL) as assigned_contacts
      FROM tasks t
      LEFT JOIN subtasks s ON t.id = s.task_id
      LEFT JOIN task_assignments ta ON t.id = ta.task_id
      LEFT JOIN contacts c ON ta.contact_id = c.id
      WHERE t.id = $1
      GROUP BY t.id`,
      [task.id]
    );
    
    res.status(201).json(completeTask.rows[0]);
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

// Update task
app.put('/api/tasks/:id', authenticateToken, async (req, res) => {
  try {
    const { title, description, due_date, priority, category, status } = req.body;
    
    const result = await pool.query(
      'UPDATE tasks SET title = $1, description = $2, due_date = $3, priority = $4, category = $5, status = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7 AND creator_user_id = $8 RETURNING *',
      [title, description, due_date, priority, category, status, req.params.id, req.user.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update task status (for drag and drop)
app.patch('/api/tasks/:id/status', authenticateToken, async (req, res) => {
  try {
    const { status } = req.body;
    
    const result = await pool.query(
      'UPDATE tasks SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 AND creator_user_id = $3 RETURNING *',
      [status, req.params.id, req.user.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete task
app.delete('/api/tasks/:id', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 AND creator_user_id = $2 RETURNING id',
      [req.params.id, req.user.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== SUMMARY ENDPOINTS ==========

// Get summary metrics
app.get('/api/summary/metrics', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        COUNT(*) FILTER (WHERE status = 'todo') as todo_count,
        COUNT(*) FILTER (WHERE status = 'done') as done_count,
        COUNT(*) FILTER (WHERE status = 'in_progress') as in_progress_count,
        COUNT(*) FILTER (WHERE status = 'awaiting_feedback') as awaiting_feedback_count,
        COUNT(*) FILTER (WHERE priority = 'high') as high_priority_count,
        COUNT(*) as total_tasks,
        MIN(due_date) FILTER (WHERE priority = 'high' AND status != 'done') as urgent_deadline
      FROM tasks
      WHERE creator_user_id = $1`,
      [req.user.id]
    );
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, 'localhost', () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
