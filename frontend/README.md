# Task Manager Application

This is a comprehensive Task Manager application built with Angular for the frontend and Node.js for the backend. It supports real-time task management features including task creation, editing, prioritization, sharing, and assignment with user and admin dashboards.

---

## Project Overview

The Task Manager app allows users to manage their tasks efficiently with features like:

- **User Dashboard:** View your assigned tasks, progress charts, and recent activities.
- **Admin Dashboard:** Manage all users, tasks, teams, and monitor overall progress.
- **Task Management:** Create, edit, delete, prioritize, and assign tasks.
- **Real-time Updates:** Tasks and status changes reflect instantly.
- **Sharing & Collaboration:** Share tasks with team members.
- **Reporting & Analytics:** Visualize data using custom bar charts, pie charts, and progress indicators.
- **User Management:** Manage team members with role-based access.
- **Form Validations & Exception Handling:** Robust validations and error feedback.

---

## Key Features

### User Roles
- **Admin:** Full access to manage users, tasks, and teams.
- **User:** Can view and manage their own tasks, collaborate with team members.

### Dashboards
- Interactive dashboards with charts and stats.
- Task lists with filtering, sorting, and search.

### Task Details
- Task status tracking.
- Checklists within tasks to manage subtasks.
- Modal dialogs for task details, sharing, and status updates.

### Development
- Built using Angular standalone components.
- Node.js backend with RESTful APIs.
- JSON Server or a real backend for data persistence.

---

## Getting Started

### Prerequisites

- Node.js and npm installed
- Angular CLI installed globally (`npm install -g @angular/cli`)

### Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/Srihari-Bandugula/Task-Manager-Application
   cd task-manager
   ```


2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   ng serve
   ```

4. Open your browser at `http://localhost:4200/`.

---

## Project Structure

- **Frontend (Angular):** Uses standalone components, modular design, and Angular CLI.
- **Backend (Node.js):** RESTful API server handling tasks, users, and authentication.
- **Micro Frontend:** Supports multiple independent Angular apps (user/admin dashboards, task modules).
- **JSON Server:** Optional mock backend for prototyping.

---

## Features in Detail

### Task Management

- Create, update, delete tasks with validations.
- Assign tasks to users.
- Track task status and progress.
- Manage subtasks via checklists with completion toggles.
- Share tasks with team members using modals.

### Dashboards & Reports

- Admin dashboard shows user and task metrics.
- User dashboard shows personal tasks and progress charts.
- Custom bar charts, pie charts, and progress bars visualize data.

### User Management

- Role-based access control.
- Admin can add/remove users, assign roles.
- Team management and collaboration features.

### Error Handling & Validation

- Frontend form validations with user-friendly feedback.
- Backend error handling with appropriate HTTP status codes.
- Exception handling for robustness.

---

## Testing

- Run unit tests with:

  ```bash
  ng test
  ```

- Run end-to-end tests with:

  ```bash
  ng e2e
  ```

---

## Contributing

Contributions are welcome! Please open issues or pull requests for bug fixes and new features.

---

## License

MIT License

---

## Contact

For questions or feedback, contact [410srihari@gmail.com].
