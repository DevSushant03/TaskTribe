# TaskTribe

## Overview

TaskTribe is a collaborative skill-sharing platform that connects people who need help with tasks to those who have the skills to solve them. Users can post tasks they need help with, browse available tasks, apply to help others, and communicate through an integrated messaging system. The platform features user authentication, task management, application workflows, real-time messaging, and a rating system to build trust within the community.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:** React 19 with functional components and hooks, styled using Tailwind CSS 4, with Vite as the build tool.

**Routing:** React Router DOM v7 handles client-side navigation between different views (home, task browsing, task creation, user profiles, etc.).

**State Management:** Component-level state using React hooks (useState, useEffect). Authentication state is persisted in localStorage and accessed through utility functions.

**API Communication:** Axios is used for all HTTP requests with a centralized API client that automatically attaches JWT tokens from localStorage to all requests via interceptors.

**Design Pattern:** The frontend follows a utility-based pattern with separate modules for API calls (`api.js`) and authentication helpers (`auth.js`), promoting code reusability and separation of concerns.

### Backend Architecture

**Technology Stack:** Node.js with Express 5 serving as the REST API server.

**Database:** Better-sqlite3 (SQLite) provides local file-based data persistence. The application uses synchronous SQL operations for simplicity.

**Authentication:** JWT-based stateless authentication with bcryptjs for password hashing. Tokens are generated on registration/login and verified via middleware on protected routes.

**API Design:** RESTful endpoints organized by resource type (users, tasks, applications, messages, notifications). An `authenticateToken` middleware protects routes requiring authentication.

**Database Schema:**
- **users:** Stores user credentials, profile information (bio, skills), and reputation metrics (rating, completedTasks)
- **tasks:** Contains task details, status tracking, and foreign keys to poster and solver
- **applications:** Manages the application workflow when users volunteer for tasks
- **messages:** Enables communication between task posters and solvers

**Security Considerations:** 
- Passwords are hashed before storage
- JWT secret is either from environment variables or randomly generated
- CORS is enabled for cross-origin requests
- Authentication middleware validates tokens on protected routes

**Design Rationale:** SQLite was chosen for simplicity and portability, making the application easy to deploy without requiring a separate database server. The synchronous nature of better-sqlite3 simplifies the codebase compared to async database drivers, which is acceptable for a skill-sharing platform with moderate concurrency requirements.

### Data Flow

1. Users authenticate and receive a JWT token
2. Token is stored in localStorage and attached to subsequent API requests
3. Backend validates tokens and processes requests
4. SQLite database performs CRUD operations
5. Response data flows back through the API to update the React UI

### Application Workflow

**Task Lifecycle:**
1. User posts a task (status: 'open')
2. Other users browse and apply to tasks
3. Task poster reviews applications and approves one
4. Approved solver completes the task
5. Task poster marks task as complete and rates the solver

**Application Status Flow:** pending → approved/rejected

## External Dependencies

### Third-Party Libraries

**Frontend:**
- `react` & `react-dom` (v19): Core UI framework
- `react-router-dom` (v7): Client-side routing
- `axios` (v1.11): HTTP client with interceptor support
- `tailwindcss` (v4): Utility-first CSS framework
- `lucide-react` (v0.553): Icon library
- `react-toastify` (v11): Toast notification system
- `@vitejs/plugin-react`: Vite integration for React

**Backend:**
- `express` (v5): Web application framework
- `better-sqlite3` (v12): SQLite database driver
- `bcryptjs` (v3): Password hashing
- `jsonwebtoken` (v9): JWT creation and validation
- `cors` (v2): Cross-origin resource sharing middleware
- `multer` (v2): File upload handling (though not actively used in current implementation)
- `dotenv` (v17): Environment variable management

**Development:**
- `vite` (v7): Frontend build tool and dev server
- `nodemon` (v3): Auto-restart server on file changes
- `eslint`: Code linting with React-specific plugins

### External Services

**None currently:** The application is self-contained with no external API integrations, payment processors, or cloud services. All data is stored locally in SQLite.

### Environment Configuration

- `PORT`: Server port (default: 3000)
- `JWT_SECRET`: Secret key for JWT signing (auto-generated if not provided)
- Vite dev server configured to run on port 5000 with host '0.0.0.0' for network access

### Future Extensibility

The architecture supports adding:
- MongoDB integration (bcryptjs, jsonwebtoken, and multer are already included)
- File upload features via multer
- Real-time updates using WebSockets
- Email notifications
- External authentication providers (OAuth)