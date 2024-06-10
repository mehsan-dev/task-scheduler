# Task Scheduler

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)

## Introduction

This is the front-end of the Distributed Task Scheduler application, built using React. The application allows users to register, view, edit, delete, and execute tasks. Tasks can be scheduled to run either once or at recurring intervals.

## Features

- Register new tasks with specific execution times
- View a list of all registered tasks
- Edit task details
- Delete tasks
- Execute tasks immediately
- Supports one-time and recurring tasks

## Technologies Used

- React
- Axios (for HTTP requests)
- Socket.IO (for real-time updates)
- MUI

## Getting Started

Follow these steps to get the front-end running locally:

### Prerequisites

- Node.js (version 14.x or later)
- npm (version 6.x or later)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/task-scheduler.git
   cd task-scheduler
   cd client
   ```

### Availbale Script

- npm run dev : Starts the development server.

# Backend (Node.js)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Running Migration Commands](#running-migration-commands)

## Introduction

This is the backend of the Distributed Task Scheduler application, built using Node.js and TypeScript. It provides APIs for managing tasks and executing them based on their schedules. The backend uses Prisma ORM for database operations and supports both one-time and recurring tasks.

## Features

- Register, view, edit, and delete tasks via RESTful APIs
- Execute tasks immediately or schedule them to run at specific intervals
- Support for one-time and recurring tasks
- Real-time updates using Socket.IO

## Technologies Used

- Node.js
- Express
- TypeScript
- Prisma ORM
- Socket.IO
- MySql

## Getting Started

Follow these steps to get the backend running locally:

### Prerequisites

- Node.js (version 14.x or later)
- npm (version 6.x or later)
- MySql

### Installation

1. Move to server directory:
   ```sh
   cd server
   ```

### Availbale Script

- npm start : Starts the development server.

### Database Migrations

- prisma migrate dev --name init
- npx prisma migrate deploy
