# Kudos Backend

A Django application for employees to give kudos to their colleagues within an organization.

## Setup Instructions

### 1. Create and activate virtual environment

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Environment Configuration

Copy the example environment file and update it with your settings:

```bash
cp .env.example .env
```

### 4. Database Setup(Sqlite3)

```bash
python3 manage.py migrate
```

### 5. Load Sample Data

```bash
python3 manage.py loaddata api/fixtures/kudos.json api/fixtures/organizations.json api/fixtures/users.json
```

### 6. Run Development Server

```bash
python3 manage.py runserver
```

The application will be available at: <http://127.0.0.1:8000/api/v1/swagger>

## API Documentation

After starting the server, access the API documentation at:

- Swagger UI: <http://127.0.0.1:8000/api/v1/swagger>
- ReDoc: <http://127.0.0.1:8000/api/v1/redoc>
