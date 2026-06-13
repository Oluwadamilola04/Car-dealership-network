# Car Dealership Application - Complete Setup Guide

A fullstack web application for managing car dealerships with user authentication, inventory management, and AI-powered review sentiment analysis.

## Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local development)
- Python 3.11+ (for local development)
- Git

### Start with Docker (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd xrwvm-fullstack_developer_capstone

# Build and run all services
docker-compose up -d

# Wait for services to be healthy (30-60 seconds)
docker-compose ps

# Access the application
# Frontend: http://localhost:3000
# Django Admin: http://localhost:8000/admin
# API: http://localhost:3030
# Sentiment Analyzer: http://localhost:5050
```

### Stop Services

```bash
docker-compose down

# Remove volumes (clean database)
docker-compose down -v
```

## Architecture

### Services

1. **Frontend (React)** - Port 3000
   - Modern React app with routing
   - User authentication UI
   - Dealership browsing and review interface
   - Real-time sentiment analysis display

2. **Django Backend** - Port 8000
   - User authentication & registration
   - Car models and makes management
   - REST API endpoints
   - Admin dashboard

3. **Node.js API** - Port 3030
   - Dealership data management
   - Review storage and retrieval
   - MongoDB integration

4. **Sentiment Analyzer** - Port 5050
   - Flask microservice
   - NLTK-based sentiment analysis
   - Review sentiment scoring

5. **MongoDB** - Port 27017
   - Primary data store for dealerships and reviews
   - Persistent volume storage

6. **Nginx** - Port 80/443
   - Reverse proxy
   - Load balancing
   - SSL/TLS termination (for production)

## Local Development Setup

### Setup Python Environment (Django)

```bash
cd server

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start Django server
python manage.py runserver 0.0.0.0:8000
```

### Setup Node.js Environment (API)

```bash
cd server/database

# Install dependencies
npm install

# Start the server (requires MongoDB running)
node app.js

# Access at: http://localhost:3030
```

### Setup Frontend (React)

```bash
cd server/frontend

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm start

# Access at: http://localhost:3000
```

### Setup Sentiment Analyzer (Flask)

```bash
cd server/djangoapp/microservices

# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Install dependencies
pip install -r requirements.txt

# Start Flask server
python app.py

# Access at: http://localhost:5050
```

## Docker Commands

### Build Images

```bash
# Build all images
docker-compose build

# Build specific service
docker-compose build django
docker-compose build frontend
docker-compose build api_server
docker-compose build sentiment_analyzer
```

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f django
docker-compose logs -f frontend
docker-compose logs -f api_server
```

### Database Access

```bash
# MongoDB shell
docker exec -it car_dealership_mongodb mongosh

# Django admin
# Visit: http://localhost:8000/admin
# Login with superuser credentials
```

### Troubleshooting

```bash
# Check service status
docker-compose ps

# View service logs
docker-compose logs <service-name>

# Restart a service
docker-compose restart <service-name>

# Remove containers and volumes
docker-compose down -v

# Check service health
docker-compose exec django curl http://localhost:8000/health
```

## API Endpoints

### Authentication
- `POST /djangoapp/registration` - Register new user
- `POST /djangoapp/login` - User login
- `POST /djangoapp/logout` - User logout

### Cars
- `GET /djangoapp/get_cars` - Get all car models

### Dealerships
- `GET /djangoapp/get_dealers` - Get all dealerships
- `GET /djangoapp/get_dealers/<state>` - Get dealers by state
- `GET /djangoapp/dealer/<id>` - Get dealer details

### Reviews
- `GET /djangoapp/reviews/dealer/<id>` - Get reviews for a dealer
- `POST /djangoapp/add_review` - Post a new review

### Sentiment Analysis
- `GET /analyze/<text>` - Analyze sentiment of text

## Security Features

- CSRF protection on all POST requests
- Password validation (minimum 6 characters)
- User session management
- Input validation and sanitization
- Health checks on all services
- Environment-based configuration

## Environment Variables

Create a `.env` file in the root directory:

```env
# Django
DEBUG=False
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3

# API Communication
BACKEND_URL=http://api_server:3030
SENTIMENT_ANALYZER_URL=http://sentiment_analyzer:5000/

# MongoDB
MONGO_URL=mongodb://mongodb:27017/dealershipsDB
```

## Testing

### Run Tests

```bash
# Django tests
docker-compose exec django python manage.py test

# Frontend tests
docker-compose exec frontend npm test

# API tests
docker-compose exec api_server npm test
```

### Linting

```bash
# Python linting
docker-compose exec django flake8 djangoapp/

# JavaScript linting
docker-compose exec api_server npm run lint
```

## Project Structure

```
xrwvm-fullstack_developer_capstone/
+-- server/
   +-- djangoapp/
      +-- models.py           # Django models
      +-- views.py            # Django views
      +-- urls.py             # URL routing
      +-- microservices/       # Sentiment analyzer
   +-- djangoproj/             # Django project settings
   +-- database/               # Node.js API
      +-- app.js
      +-- dealership.js
      +-- review.js
      +-- data/              # JSON data files
   +-- frontend/               # React frontend
      +-- src/
         +-- components/
         +-- App.js
         +-- index.js
      +-- package.json
      +-- Dockerfile
   +-- Dockerfile.django
   +-- requirements.txt
+-- docker-compose.yml
+-- nginx.conf
+-- .github/
   +-- workflows/
       +-- main.yml            # CI/CD pipeline
+-- README.md
```

## Deployment

### To Production

1. **Update Environment Variables** ```bash
   # Set production values in .env
   DEBUG=False
   SECRET_KEY=production-secret-key
   ALLOWED_HOSTS=yourdomain.com
   ```

2. **Enable SSL/TLS** ```bash
   # Update nginx.conf to use SSL certificates
   # Place certificates in ./ssl directory
   ```

3. **Build Images** ```bash
   docker-compose build
   ```

4. **Run Services** ```bash
   docker-compose up -d
   ```

5. **Access Application** ```
   https://yourdomain.com
   ```

## Troubleshooting

### Services Won't Start

1. Check port conflicts: `lsof -i :3000,8000,3030,5050,27017`
2. Check Docker logs: `docker-compose logs <service>`
3. Ensure Docker daemon is running
4. Rebuild images: `docker-compose build --no-cache`

### Database Connection Issues

```bash
# Check MongoDB is running
docker-compose logs mongodb

# Reset database
docker-compose down -v
docker-compose up -d mongodb
```

### Frontend Won't Load

```bash
# Clear browser cache and restart
docker-compose restart frontend
```

### API Connection Issues

```bash
# Test API connectivity
docker-compose exec django curl http://api_server:3030

# Check environment variables
docker-compose exec django env | grep BACKEND_URL
```

## License

See LICENSE file for details

## Contributors

- Development Team

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Support

For issues and questions, please create an issue in the GitHub repository.
