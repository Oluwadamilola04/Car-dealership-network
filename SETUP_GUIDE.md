# Complete Setup & Installation Guide

## Summary of Improvements

Your Car Dealership application has been completely revamped with professional-grade improvements across all layers:

### What's Been Fixed & Improved

#### Critical Bugs Fixed
- **Signup broken** - Fixed URL mismatch between frontend (`/register`) and backend (`/registration`)
- **Can't view dealerships** - Fixed MongoDB state field query (`st` -> `state`)
- **API connectivity issues** - Added proper error handling and JSON parsing
- **Poor error messages** - Added user-friendly validation and feedback

#### Frontend UI/UX Complete Overhaul
- **Register Component** - Real-time form validation
  - Beautiful error/success messages
  - Loading states and disabled inputs
  - Minimum password length enforcement (6 chars)

- **Dealerships Page** (Major redesign)
  - Modern card-based grid layout (replaces boring tables)
  - Professional color scheme (Material Design)
  - Smooth hover animations
  - Loading and empty states
  - Better state filtering
  - Responsive design for all devices

#### Professional Docker Setup
- **Complete containerization** of all services:
  - Django backend (port 8000)
  - Node.js API (port 3030)
  - Flask sentiment analyzer (port 5050)
  - React frontend (port 3000)
  - MongoDB database (port 27017)
  - Nginx reverse proxy (port 80/443)

- **Docker Compose orchestration** - Service dependencies and auto-startup
  - Health checks on all services
  - Persistent database volumes
  - Shared networking between services
  - Production-ready configuration

- **Optimized Dockerfiles** - Alpine-based for smaller images
  - Multi-stage builds for React
  - Health checks and proper logging
  - NLTK data pre-download for sentiment analyzer

#### Enhanced CI/CD Pipeline
- **Comprehensive GitHub Actions workflow** - with:
  - Python linting (flake8, black, bandit for security)
  - JavaScript linting (eslint, jshint)
  - Docker image building with caching
  - Security scanning with Trivy
  - Docker Compose validation
  - Build status notifications

#### Complete Documentation
- **DEPLOYMENT.md** - Complete setup guide
- **Makefile** - 25+ convenient commands for developers
- **.env.example** - Environment template
- **nginx.conf** - Production reverse proxy
- **.dockerignore** - Optimized Docker builds

---

## Quick Start (3 Steps)

### Step 1: Prerequisites
Ensure you have Docker installed:
```bash
docker --version
docker-compose --version
```

If not installed, download from: https://www.docker.com/products/docker-desktop

### Step 2: Start the Application
```bash
cd xrwvm-fullstack_developer_capstone

# Copy environment template
cp .env.example .env

# Build and start all services
docker-compose up -d

# Wait 30-60 seconds for services to be healthy
docker-compose ps
```

### Step 3: Access the Application
- **Frontend**: http://localhost:3000
- **Django Admin**: http://localhost:8000/admin
- **API**: http://localhost:3030
- **Sentiment Analyzer**: http://localhost:5050

---

## Using Make Commands (Recommended)

For convenience, use the Makefile with these commands:

```bash
# Initialize development environment (one-time)
make init-dev

# Start services
make up

# View logs
make logs

# Stop services
make down

# Check service health
make health-check

# Run tests
make test

# Run linters
make lint

# View all available commands
make help
```

---

## Manual Setup (For Local Development)

If you prefer to run services locally without Docker:

### 1. Django Backend
```bash
cd server

# Create Python virtual environment
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser (admin account)
python manage.py createsuperuser

# Start server
python manage.py runserver 0.0.0.0:8000
```

### 2. Node.js API (requires MongoDB running)
```bash
cd server/database

# Install dependencies
npm install

# Ensure MongoDB is running on localhost:27017

# Start server
node app.js
```

### 3. React Frontend
```bash
cd server/frontend

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm start
```

### 4. Sentiment Analyzer (Flask)
```bash
cd server/djangoapp/microservices

# Create Python virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start Flask server
python app.py
```

---

## Architecture Overview

```
+---------------------------------------------------------+
                   CLIENT BROWSER
              http://localhost:3000
+---------------------------------------------------------+

                    +---------+
                       Nginx     (Reverse Proxy)
                     Port 80
                    +-----------+
        +----------------+----------------+

    +-------+ +------+ +--+ +----+ +----------+
    React   Django API Flask MongoDB
    :3000   :8000  :3030 :5050 :27017
    +-------+ +------+ +--+ +----+ +----------+
```

---

## Testing the Application

### 1. Create a User Account
- Go to http://localhost:3000
- Click "Sign Up"
- Fill in the form and submit
- You should see success confirmation

### 2. View Dealerships
- Click "Dealers" or "View Dealers"
- You'll see all dealerships in a modern card-based layout
- Try filtering by state

### 3. Post a Review
- Click on a dealership card
- Click "Post Review" (requires login)
- Write a review
- The sentiment will be automatically analyzed

---

## Default Admin Access

### Django Admin
1. Start the application with `make up` or `docker-compose up -d`
2. Create superuser:
   ```bash
   docker-compose exec django python manage.py createsuperuser
   ```
3. Visit http://localhost:8000/admin
4. Login with your credentials

---

## File Structure After Improvements

```
xrwvm-fullstack_developer_capstone/
+-- docker-compose.yml           NEW - Orchestrates all services
+-- nginx.conf                   NEW - Reverse proxy config
+-- Makefile                     NEW - Developer commands
+-- DEPLOYMENT.md                NEW - Complete setup guide
+-- .env.example                 NEW - Environment template
+-- .dockerignore                 NEW - Docker optimization

+-- server/
   +-- Dockerfile.django        NEW - Django container
   +-- requirements.txt          UPDATED - All deps
   +-- manage.py

   +-- djangoapp/
      +-- microservices/
         +-- Dockerfile       IMPROVED - Better config
         +-- app.py
         +-- requirements.txt
      +-- views.py              UPDATED - Better endpoints
      +-- urls.py               FIXED - Added /register alias
      +-- models.py

   +-- database/
      +-- Dockerfile            IMPROVED - Alpine-based
      +-- app.js                FIXED - State query fix
      +-- package.json
      +-- data/
          +-- dealerships.json
          +-- reviews.json
          +-- car_records.json

   +-- frontend/
       +-- Dockerfile            NEW - React container
       +-- package.json
       +-- src/
          +-- components/
             +-- Dealers/
                +-- Dealers.jsx     COMPLETELY REDESIGNED
             +-- Register/
                +-- Register.jsx    ENHANCED validation
             +-- ...
          +-- App.js
       +-- public/

+-- .github/
    +-- workflows/
        +-- main.yml              IMPROVED - Enhanced CI/CD
```

---

## Troubleshooting

### Services won't start
```bash
# Check what's using your ports
lsof -i :3000,8000,3030,5050,27017

# Check Docker logs
docker-compose logs

# Force rebuild without cache
docker-compose build --no-cache
docker-compose up -d
```

### Signup still not working
```bash
# Verify API connectivity
docker-compose exec django curl http://api_server:3030

# Check Django logs
make logs-django

# Verify MongoDB
make mongodb-shell
```

### Dealerships page shows no data
```bash
# Check API server logs
make logs-api

# Verify MongoDB has data
docker-compose exec mongodb mongosh
# > use dealershipsDB
# > db.dealerships.find()
```

### High memory usage
```bash
# Reduce running containers
docker-compose down

# Remove unused images
docker image prune

# Clean up volumes
docker volume prune
```

---

## Next Steps for Production

1. **Update Environment Variables** ```bash
   cp .env.example .env
   # Edit .env with production values
   ```

2. **Enable SSL/TLS** - Obtain SSL certificates
   - Place in `./ssl/` directory
   - Uncomment SSL config in `nginx.conf`

3. **Database Backup** ```bash
   docker-compose exec mongodb mongodump --out /backup
   ```

4. **Scale Services** ```bash
   docker-compose up -d --scale django=2
   ```

5. **Monitor Services** ```bash
   make health-check
   docker stats
   ```

---

## Getting Help

### Check Logs
```bash
make logs              # All services
make logs-django       # Django only
make logs-api          # API only
make logs-frontend     # Frontend only
```

### Validate Configuration
```bash
docker-compose config
```

### Test Specific Service
```bash
docker-compose exec django python manage.py test
docker-compose exec api_server npm test
```

---

## Verification Checklist

- [ ] Docker & Docker Compose installed
- [ ] Port 3000, 8000, 3030, 5050, 27017 are free
- [ ] `.env` file created from `.env.example`
- [ ] Services started with `docker-compose up -d`
- [ ] All services showing as "healthy" in `docker-compose ps`
- [ ] Frontend loads at http://localhost:3000
- [ ] Can create user account
- [ ] Can view dealerships
- [ ] Can post review

---

**Congratulations!** Your application is now production-ready with professional DevOps practices.
