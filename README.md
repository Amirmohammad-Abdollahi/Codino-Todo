# Todo App

> A responsive productivity dashboard designed to help you plan your day, manage tasks, stay focused, and track your progress over time.

**Live Demo:** [todoapp-codinp.infinityfree.io](http://todoapp-codinp.infinityfree.io)

---

## Overview

**Todo App** is a responsive web-based productivity application built to make everyday planning simpler and more visual.

The app combines task management, focus sessions, personal goals, productivity analytics, and quick notes in one dashboard. Instead of using a simple list of tasks, users can organize what they need to do, assign categories and priorities, estimate task duration, track completion, work toward a larger goal, and review their activity over time.

The interface is built around a dark visual system with blue and purple accents, subtle gradients, and a dashboard-style layout. The goal is to keep the interface attractive without sacrificing usability, responsiveness, or clarity.

The project was created as a personal development and GitHub portfolio project and is currently considered a completed first version that can continue to be improved as new bugs or ideas are discovered.

---

## Features

### Task Management

- Create and manage daily tasks.
- Set a task title, category, estimated duration, and priority.
- Mark tasks as **Complete** or **Incomplete**.
- Store the completion timestamp when a task is completed.
- Edit existing task information.
- Delete tasks.
- Filter tasks by:
  - Status
  - Category
  - Priority
- Sort tasks by:
  - Newest
  - Oldest
  - Priority
  - Duration
  - Category
- Show only incomplete tasks when selecting a task for a focus session.
- Display task counts directly in the dashboard.

### Categories

The current task system supports:

- Development
- Learning
- Health
- Hobby

### Priorities

Each task can have one of three priority levels:

- High
- Medium
- Low

---

## Focus Session

The **Focus Session** feature lets users select an incomplete task and work on it using a built-in timer.

The focus system stores:

- Selected task
- Total planned focus time
- Current/real focus time
- Focus state

The interface provides controls for:

- Start
- Pause
- Stop

Focus-session data is stored in the database and can be updated while the session is running.

---

## Goals

Users can define a larger goal and keep it visible in the dashboard.

A goal can contain:

- Title
- Description
- Deadline
- Priority
- Status

Available goal statuses:

- Pending
- Progress
- Completed

The goal section is designed to make the user's main objective visible alongside today's tasks so that daily work stays connected to a larger target.

---

## Productivity Overview

The dashboard includes an activity chart that compares:

- Tasks created
- Tasks completed

Users can review their activity in three time ranges:

- Weekly
- Monthly
- Yearly

### Weekly view

The start day of the week can be selected as:

- Saturday
- Sunday
- Monday

The weekly chart is generated according to the user's selected week-start preference.

### Monthly view

The current month is represented day by day, including days with zero activity.

### Yearly view

The yearly chart aggregates activity by month.

Task creation and completion are tracked separately, which makes it possible to compare planned activity with completed work.

---

## Quick Notes

The **Quick Notes** section provides a lightweight place for writing down thoughts, reminders, ideas, or anything that should remain visible while working.

Users can:

- Create notes
- Give notes a title
- Add a message
- Pin important notes
- Delete notes

Pinned notes are prioritized in the note list.

---

## User Profile

On the first setup, the user can complete a personal profile by choosing:

- Display name
- Avatar
- Daily goal
- Main focus area
- Preferred week start day

Available focus areas include:

- Development
- Study
- Fitness
- Work
- Personal
- Other

The selected focus and week-start preference are used by the application to personalize parts of the dashboard and its productivity calculations.

### Identity model

This project does **not** currently use a traditional email/password authentication system.

Instead, a unique user ID is generated and stored in an **HTTP-only, SameSite cookie**. The user profile and application data are then associated with that identifier.

This keeps the project simple for a portfolio/demo application, but it should not be treated as a complete production-grade authentication system.

---

## UI & UX

The interface is designed as a dashboard rather than a traditional sidebar-heavy productivity application.

Current visual characteristics include:

- Dark dashboard interface
- Blue and purple primary accents
- Gradient buttons and progress elements
- Clear card-based sections
- Responsive layout
- Task-focused visual hierarchy
- Compact controls for filtering and sorting
- Visual progress indicators
- Focus timer with circular progress presentation
- Light/Dark appearance switching

The main dashboard contains:

1. Daily overview/header
2. Today's Tasks
3. Today's Goal
4. Focus Session
5. Quick Notes
6. Productivity Overview

---

## Responsive Design

The project is built to adapt to different screen sizes and is intended to remain usable on desktop and mobile screens.

The layout, cards, controls, task rows, charts, and dashboard sections are adjusted using responsive CSS so the application can be used beyond a single desktop resolution.

The current demo has mainly been tested manually in **Google Chrome**.

---

## SEO & Performance

The project has received dedicated optimization work rather than treating performance as an afterthought.

Performance-related improvements have focused on areas such as:

- Page loading behavior
- Critical rendering
- CSS and JavaScript execution
- DOM-related work
- Image size and loading
- Network/API requests
- Layout stability
- General Lighthouse performance factors

SEO-related work includes:

- Descriptive page metadata
- A dedicated meta description
- Structured page content
- Responsive/mobile-friendly behavior

### Performance note

The deployed project has changed after previous Lighthouse measurements, so old benchmark numbers are intentionally not presented as current scores.

A fresh Lighthouse run should be used for an up-to-date public benchmark of the current build.

---

## Tech Stack

### Frontend

- HTML5
- CSS3
- Vanilla JavaScript
- Chart.js
- SVG icons and UI graphics

### Backend

- PHP
- PDO
- JSON-based API responses
- Cookie-based user identification

### Database

- MySQL / MariaDB
- phpMyAdmin

### Local Development

- XAMPP
- Apache
- MySQL / MariaDB

---

## Architecture

The application follows a lightweight client/server architecture:

```text
Browser
   │
   ├── HTML / CSS
   ├── Vanilla JavaScript
   └── Fetch API
          │
          ▼
      PHP API
          │
          ▼
      PDO / SQL
          │
          ▼
     MySQL / MariaDB
```

The frontend is responsible for the interface and client-side interaction, while PHP API endpoints handle database operations and return JSON data where required.

This structure keeps the project relatively simple and avoids a heavy frontend framework.

---

## API

The `api/` directory contains the PHP endpoints used by the frontend.

The current API package contains **23 PHP files** covering user data, tasks, goals, focus sessions, notes, charts, and database configuration.

### User & Profile

| Endpoint | Purpose |
|---|---|
| `get_user.php` | Load the current user's profile information |
| `profile.php` | Create/update the profile and optionally upload an avatar |
| `cookie.php` | Generate/read the user identifier cookie |

### Tasks

| Endpoint | Purpose |
|---|---|
| `get_tasks.php` | Load tasks with filtering and sorting |
| `add_task_db.php` | Create a new task |
| `post_edit_task.php` | Update task information |
| `get_edit_task.php` | Load data for editing a task |
| `delete_task.php` | Delete a task |
| `update_task_state.php` | Change task state and completion time |
| `get-task-dropdown.php` | Return incomplete tasks for focus selection |

### Goals

| Endpoint | Purpose |
|---|---|
| `get_goal.php` | Load the current user's goal and profile state |
| `edit_modal_process.php` | Create or update the user's goal |

### Focus

| Endpoint | Purpose |
|---|---|
| `create-focus.php` | Save a new focus session |
| `set_real_time_db.php` | Update the active focus time |
| `delete-focus-db.php` | Remove focus-session data |

### Notes

| Endpoint | Purpose |
|---|---|
| `get_note.php` | Load the user's notes |
| `post-note-info.php` | Create a new note |
| `edit-pin.php` | Pin or unpin a note |
| `delete_note.php` | Delete a note |

### Analytics

| Endpoint | Purpose |
|---|---|
| `set-chart-info.php` | Generate weekly, monthly, or yearly task statistics |
| `get_progress.php` | Return total and completed task counts |
| `get_streak.php` | Return user creation data used by the dashboard streak logic |

### Configuration

| Endpoint | Purpose |
|---|---|
| `config.php` | Create the PDO database connection |

---

## Database

The current SQL schema is named:

```text
todo_app
```

It contains five main tables:

```text
users
tasks
focus
goal_edit
quick-notes
```

### `users`

Stores the user's profile and application preferences.

Important fields:

```text
id
user_id
display_name
avatar
daily_goal
focus
week_start
created_at
is_profile_completed
```

### `tasks`

Stores the user's tasks.

Important fields:

```text
id_task
user_id
task
category
time
priority
state
created_at
completed_at
```

The `time` field stores task duration in minutes.

### `focus`

Stores focus-session information.

Important fields:

```text
focus_id
user_focus
real_time
full_time
create_at
state
task
```

### `goal_edit`

Stores the user's main goal.

Important fields:

```text
user_id
title
description
deadLine
priority
status
created_it
updated_at
```

### `quick-notes`

Stores user notes.

Important fields:

```text
id_note
user_id
title
message
pin_message
created_at
```

---

## Data Flow Examples

### Adding a task

```text
User enters task information
        ↓
JavaScript sends request
        ↓
add_task_db.php
        ↓
Server validates the input
        ↓
PDO prepared statement
        ↓
tasks table
        ↓
JSON response
        ↓
Dashboard updates
```

### Completing a task

```text
User checks a task
        ↓
JavaScript sends task ID + state
        ↓
update_task_state.php
        ↓
state = Complete
completed_at = current time
        ↓
tasks table
        ↓
Progress / chart data can reflect the change
```

### Loading analytics

```text
Dashboard requests:
week / month / year
        ↓
set-chart-info.php
        ↓
SQL aggregation
        ↓
Created-task data
+
Completed-task data
        ↓
JSON response
        ↓
Chart.js visualization
```

---

## Local Installation

The simplest supported setup for this project is **XAMPP**.

### 1. Install XAMPP

Install XAMPP with:

- Apache
- MySQL / MariaDB
- phpMyAdmin

### 2. Start the local services

Open the XAMPP Control Panel and start:

```text
Apache
MySQL
```

### 3. Put the project in `htdocs`

Copy the project into your XAMPP web root.

For example:

```text
C:\xampp\htdocs\todo-app\
```

Your final structure may look similar to:

```text
htdocs/
└── todo-app/
    ├── api/
    ├── css/
    ├── js/
    ├── Images/
    ├── Uploads/
    ├── index.php
    └── ...
```

### 4. Create the database

Open:

```text
http://localhost/phpmyadmin
```

Create a database named:

```text
todo_app
```

Then import the project's SQL dump into that database.

### 5. Configure the database connection

The local configuration currently uses:

```php
$host = "localhost";
$username = "root";
$password = "";
$dbname = "todo_app";
```

This matches a typical local XAMPP installation where the MySQL root account has no password.

For a real deployment, database credentials should be stored outside the public source tree and should never be committed with production secrets.

### 6. Open the project

Visit the local project URL, for example:

```text
http://localhost/todo-app/
```

The exact path depends on the folder name you used inside `htdocs`.

---

## Production / Deployment Notes

The current project is primarily structured as a **GitHub portfolio and demo project**, not as a production SaaS application.

For a production deployment, several areas would need additional hardening, including:

- Real user authentication and session management
- Stronger authorization checks for every record-level update/delete endpoint
- CSRF protection for state-changing requests
- Environment-based secret management
- Production database credentials
- More complete request-method validation
- More complete error handling and logging
- Additional database indexes and relational constraints where appropriate
- HTTPS-only deployment
- More comprehensive automated testing

The current code already uses useful building blocks such as **PDO prepared statements**, server-side validation in several endpoints, an HTTP-only/SameSite user cookie, and avatar MIME/size validation. The items above are the natural next layer for a production-grade system.

---

## Security Notes

Some security-conscious implementation choices are already present:

- PDO prepared statements are used for SQL queries.
- User IDs are generated with cryptographically secure random bytes.
- The user identifier cookie is configured as `HttpOnly`.
- The cookie uses `SameSite=Lax`.
- Uploaded avatars are size-limited.
- Uploaded avatar MIME types are checked before saving.
- JSON API responses are used throughout the application.

At the same time, this project should be considered a **portfolio/demo application** rather than a fully hardened authentication platform.

In particular, the current identity model is cookie-based and does not provide traditional account authentication.

---

## Project Structure

A simplified project structure is:

```text
todo-app/
│
├── api/
│   ├── add_task_db.php
│   ├── config.php
│   ├── cookie.php
│   ├── create-focus.php
│   ├── delete-focus-db.php
│   ├── delete_note.php
│   ├── delete_task.php
│   ├── edit-pin.php
│   ├── edit_modal_process.php
│   ├── get-task-dropdown.php
│   ├── get_edit_task.php
│   ├── get_goal.php
│   ├── get_note.php
│   ├── get_progress.php
│   ├── get_streak.php
│   ├── get_tasks.php
│   ├── get_user.php
│   ├── post-note-info.php
│   ├── post_edit_task.php
│   ├── profile.php
│   ├── set-chart-info.php
│   ├── set_real_time_db.php
│   └── update_task_state.php
│
├── css/
├── js/
├── Images/
├── Uploads/
├── index.php
└── ...
```

The exact frontend file structure may evolve as the project continues to be improved.

---

## Screenshots

### Dashboard

![Todo App Dashboard](assets/dashboard.png)

The dashboard brings the main productivity features together in a single workspace: daily tasks, the current goal, focus sessions, quick notes, and activity analytics.

---

## Demo

The current online demo is hosted on InfinityFree:

**[Open the Live Demo](http://todoapp-codinp.infinityfree.io)**

For local development, XAMPP is the recommended setup.

---

## Current Status

**Status: Completed / Maintenance**

The first complete version of the project is finished.

Future changes are mainly expected to be:

- Bug fixes
- Performance improvements
- UI/UX refinements
- Small feature improvements
- Code quality and security hardening

There is currently no fixed public roadmap.

---

## Known Limitations

The project is intentionally lightweight, but it currently has some limitations:

- No traditional email/password account system
- Cookie-based identity instead of full authentication
- No automated test suite
- No CI/CD pipeline
- The current setup assumes a PHP + MySQL environment
- The live demo depends on the hosting environment
- Production-grade security hardening is still possible
- Performance numbers should be re-measured whenever a major build changes

---

## Browser Support

The project has mainly been manually tested in:

- Google Chrome
- Desktop
- Responsive/mobile layouts

Broader browser compatibility testing can be added in future iterations.

---

## Why This Project?

This project was built as a practical full-stack web development project to combine several skills in one real application:

- Frontend development
- Responsive UI design
- Vanilla JavaScript
- PHP backend development
- MySQL database design
- REST-like JSON endpoints
- Client/server communication with `fetch()`
- Data visualization
- File uploads
- Performance optimization
- SEO fundamentals
- UX-focused dashboard design

Instead of creating a basic CRUD todo list, the project was expanded into a small productivity workspace where planning, execution, focus, notes, and progress tracking live together.

---

## Future Improvements

There is no fixed roadmap yet, but possible future improvements include:

- Stronger authentication
- More granular authorization
- Improved task recurrence
- More advanced productivity statistics
- Additional focus-session analytics
- Better automated testing
- Further performance optimization
- More accessibility improvements
- Progressive Web App (PWA) capabilities
- Additional personalization options

---

## License

This repository does **not currently include a license**.

Unless a license is added later, the source code should not be assumed to be freely reusable, modified, or redistributed.

---

## Author

**CODINO**

Personal web-development project focused on building practical full-stack applications with a strong emphasis on UI/UX, responsiveness, and performance.

---

## Acknowledgements

This project uses open web technologies and libraries including:

- PHP
- MySQL / MariaDB
- JavaScript
- Chart.js
- XAMPP
- phpMyAdmin

---

## Final Note

Todo App is a completed first version, not a frozen project.

The current goal is to keep the codebase maintainable, fix real bugs when they appear, and continue improving the product based on actual use rather than adding features just to make the feature list longer.
