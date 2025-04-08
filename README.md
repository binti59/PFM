# Personal Finance Manager

A web application for managing personal finances, tracking expenses, and budgeting.

## Features

- Dashboard with financial overview
- Account management
- Transaction tracking
- Budget planning
- Financial reports
- User settings

## Technology Stack

- **Frontend**: React.js with TypeScript, Material-UI
- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (local or cloud instance)

### Setup

1. Clone the repository:
```
git clone https://github.com/binti59/PFM.git
cd PFM
```

2. Run the installation script:
```
chmod +x scripts/install.sh
./scripts/install.sh
```

This will install all dependencies and set up the application.

## Development

### Starting the Backend

```
cd backend
npm run dev
```

The backend server will run on http://localhost:5000.

### Starting the Frontend

```
cd frontend
npm start
```

The frontend development server will run on http://localhost:3000.

## Scripts

The application comes with three utility scripts:

- `scripts/install.sh`: Initial setup and installation
- `scripts/update.sh`: Update an existing installation
- `scripts/reinstall.sh`: Perform a clean reinstallation

## Project Structure

```
PFM/
├── frontend/           # React.js frontend
│   ├── public/         # Static files
│   └── src/            # Source code
│       ├── components/ # Reusable components
│       └── pages/      # Page components
├── backend/            # Node.js backend
│   ├── src/            # Source code
│   │   ├── controllers/# Request handlers
│   │   ├── models/     # Database models
│   │   ├── routes/     # API routes
│   │   ├── config/     # Configuration files
│   │   └── middleware/ # Custom middleware
│   └── dist/           # Compiled JavaScript
└── scripts/            # Utility scripts
```

## License

MIT
