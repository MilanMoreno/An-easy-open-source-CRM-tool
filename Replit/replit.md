# Join - Kanban Project Management Tool

## Overview
Join is a web-based Kanban project management tool that helps teams organize tasks and collaborate effectively. The application features user authentication, task management, contact management, and a visual board interface.

**Current State**: Successfully migrated from Firebase to PostgreSQL database with Express.js REST API backend.

## Project Architecture

### Technology Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Express.js REST API
- **Database**: PostgreSQL (Replit managed)
- **Authentication**: JWT-based authentication with bcrypt password hashing
- **Server**: Node.js HTTP server (static files on port 5000, API on port 3000)

### Project Structure
```
├── index.html           # Login page
├── sign_up.html        # User registration page
├── summary.html        # Dashboard/summary view
├── board.html          # Kanban board view
├── add_task.html       # Task creation page
├── contacts.html       # Contact management page
├── help.html           # Help page
├── legal_notice.html   # Legal notice
├── privacy-police.html # Privacy policy
├── css/                # Stylesheets
├── js/                 # JavaScript files
│   ├── api-client.js  # API client wrapper (replaces Firebase)
│   ├── signup.js      # User authentication
│   ├── board.js       # Kanban board functionality
│   ├── summary.js     # Dashboard metrics
│   ├── contact.js     # Contact management
│   └── ...
├── imgs/               # Image assets
├── assets/             # Additional assets
├── contact-assets/     # Contact-specific assets
├── server.js           # Static file server (port 5000)
├── api-server.js       # Express REST API (port 3000)
├── start-servers.js    # Starts both servers
├── schema.sql          # Database schema
└── migrate-from-firebase.js  # Migration script
```

### Database Schema

#### Users Table
- `id` (UUID, primary key)
- `name` (varchar)
- `initials` (varchar)
- `email` (varchar, unique)
- `password_hash` (varchar) - bcrypt hashed passwords
- `created_at`, `updated_at` (timestamps)

#### Contacts Table
- `id` (UUID, primary key)
- `owner_user_id` (UUID, foreign key to users)
- `name`, `email`, `phone` (varchar)
- `initials`, `color` (varchar)
- `created_at`, `updated_at` (timestamps)

#### Tasks Table
- `id` (UUID, primary key)
- `creator_user_id` (UUID, foreign key to users)
- `title`, `description` (varchar/text)
- `due_date` (date)
- `priority` (low/medium/high)
- `category`, `status` (varchar)
- `created_at`, `updated_at` (timestamps)

#### Subtasks Table
- `id` (UUID, primary key)
- `task_id` (UUID, foreign key to tasks)
- `title` (varchar)
- `is_completed` (boolean)

#### Task Assignments Table
- `task_id`, `contact_id` (composite primary key)
- Many-to-many relationship between tasks and contacts

### Key Features
1. **User Authentication**: 
   - JWT-based authentication
   - Secure password hashing with bcrypt
   - Login/signup with email and password
   - Guest login for quick access
   
2. **Task Management**: 
   - Create, edit, and delete tasks
   - Subtask support
   - Task assignments to contacts
   - Priority levels (low, medium, high)
   
3. **Kanban Board**: 
   - Visual task organization
   - Drag-and-drop functionality
   - Status categories: To-do, In Progress, Awaiting Feedback, Done
   
4. **Contact Management**: 
   - Store and manage contacts
   - Assign contacts to tasks
   
5. **Dashboard**: 
   - Summary view with task statistics
   - Metrics: total tasks, tasks by status, high priority tasks
   - Upcoming deadline tracking

### API Endpoints

#### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

#### Contacts
- `GET /api/contacts` - Get all contacts
- `POST /api/contacts` - Create contact
- `PUT /api/contacts/:id` - Update contact
- `DELETE /api/contacts/:id` - Delete contact

#### Tasks
- `GET /api/tasks` - Get all tasks with subtasks and assignments
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `PATCH /api/tasks/:id/status` - Update task status (for drag-drop)
- `DELETE /api/tasks/:id` - Delete task

#### Summary
- `GET /api/summary/metrics` - Get dashboard metrics

## Setup Instructions

### Running the Application
The application runs two servers automatically via the "Servers" workflow:

**Workflow**: `node start-servers.js`
- Static file server on `0.0.0.0:5000` for frontend
- API server on `localhost:3000` for backend
- Both servers start automatically

### Environment Variables
The following are automatically configured by Replit:
- `DATABASE_URL` - PostgreSQL connection string
- `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE` - Database credentials
- `JWT_SECRET` - JWT signing secret (auto-generated)

### Database Setup
The PostgreSQL database is automatically created with the following tables:
- `users` - User accounts
- `contacts` - Contact information
- `tasks` - Task data
- `subtasks` - Task subtasks
- `task_assignments` - Task-contact assignments

### Migration from Firebase (Optional)
If you have existing data in Firebase, run the migration script:

```bash
node migrate-from-firebase.js
```

This will:
1. Fetch all users, contacts, and tasks from Firebase
2. Hash all passwords (Firebase stored plain text)
3. Import data into PostgreSQL
4. Maintain relationships between tasks and contacts

## Recent Changes

### 2024-10-16: PostgreSQL Migration
- **Migrated from Firebase to PostgreSQL**
  - Created full database schema with proper relationships
  - Built Express.js REST API backend
  - Implemented JWT authentication with bcrypt password hashing
  - Created API client wrapper (`js/api-client.js`) to replace Firebase calls
  - Updated all frontend files to use new API
  - Created migration script for existing Firebase data
  - Improved security: passwords now hashed, proper authentication

### 2024-10-16: Initial Replit Setup
- Created Node.js static file server (`server.js`)
- Configured workflow to serve on port 5000
- Added `.gitignore` for Node.js environment
- Set up cache-control headers

## User Preferences
None recorded yet.

## Development Notes

### Important Considerations
1. **API Architecture**: RESTful API with Express.js on port 3000
2. **Authentication**: JWT tokens stored in localStorage, included in API requests
3. **Database**: PostgreSQL with proper foreign key relationships and cascading deletes
4. **Security**: 
   - Passwords hashed with bcrypt (salt rounds: 10)
   - JWT tokens for authentication
   - API middleware protects routes
   - SQL injection prevention via parameterized queries
5. **Frontend-Backend Communication**: 
   - Frontend uses `api-client.js` wrapper
   - Automatic token management
   - Error handling and user feedback

### Animation Behavior
The login page features a splash screen animation:
- Logo animation starts after 500ms and runs for 500ms
- Login form fades in after 700ms and completes in 500ms
- Total animation time: ~1200ms

### Known Limitations
- Guest login has limited functionality (no data persistence)
- JWT tokens expire after 24 hours
- No password reset functionality (yet)

## Deployment Configuration
The application is configured for deployment with:
- **Deployment Type**: Autoscale (stateless web application)
- **Ports**: 
  - Frontend: 5000
  - Backend API: 3000
- **Servers**: Both Node.js servers run via `start-servers.js`
- **Database**: PostgreSQL (Replit managed, automatically included in deployment)

## Testing

### Manual Testing
1. **User Registration**: Create new account via signup page
2. **Login**: Login with credentials
3. **Guest Login**: Quick access without registration
4. **Create Contacts**: Add contacts via contacts page
5. **Create Tasks**: Add tasks with subtasks and assignments
6. **Board View**: Drag tasks between status columns
7. **Dashboard**: View task metrics and statistics

### API Testing
Use the following to test API endpoints:

```bash
# Health check
curl http://localhost:3000/api/health

# Signup
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## Troubleshooting

### Common Issues

**Login not working:**
- Check browser console for API errors
- Verify API server is running on port 3000
- Check JWT token in localStorage

**Tasks not loading:**
- Verify user is authenticated (token in localStorage)
- Check API endpoint responses in network tab
- Ensure database has data

**Migration issues:**
- Verify Firebase URL is correct
- Check database connection
- Review migration script logs

## Future Enhancements
- Password reset functionality
- Email verification
- Real-time updates (WebSocket)
- File attachments for tasks
- Task comments
- User profile management
- Team collaboration features
