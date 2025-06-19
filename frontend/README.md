# Kudos Frontend

A React application for employees to give kudos to their colleagues within an organization.

## Setup Instructions

### 1. Install pnpm

Ensure you have Node.js installed, then install pnpm:

```bash
npm install -g pnpm
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Environment Configuration

Copy the example environment file and update it with your settings:

```bash
cp .env.example .env
```

### 4. Run Development Server

```bash
pnpm run dev
```

The application will be available at: [http://localhost:5173/](http://localhost:5173/)

## Connecting to Backend

Ensure your backend server is running and update the `VITE_API_URL` in your `.env` file to point to your backend API (default: `http://127.0.0.1:8000/api/v1`).
