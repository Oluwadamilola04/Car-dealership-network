# Quick Reference - Essential Commands

## Get Started (Pick One)

### Fastest Way - Using Make
```bash
make init-dev    # Initialize everything (one-time)
make up          # Start all services
make down        # Stop all services
```

### Using Docker Compose Directly
```bash
docker-compose up -d              # Start
docker-compose down               # Stop
docker-compose ps                 # Check status
```

### View Application
```
http://localhost:3000             # Frontend
http://localhost:8000/admin       # Django Admin
http://localhost:3030             # API
http://localhost:5050             # Sentiment Analyzer
```

---

## Common Tasks

### View Logs
```bash
make logs                  # All services
make logs-django          # Django only
make logs-api             # API only
make logs-frontend        # Frontend only
docker-compose logs -f    # Follow all logs
```

### Database Operations
```bash
make mongodb-shell        # Access MongoDB
make migrate              # Run Django migrations
make db-reset             # Reset database
docker-compose exec mongodb mongosh  # Direct shell
```

### User Management
```bash
make superuser            # Create admin account
docker-compose exec django python manage.py createsuperuser
```

### Health & Status
```bash
make ps                   # Container status
make health-check         # Test all services
make status               # Detailed info
```

---

## Cleanup & Rebuild

### Clean Start
```bash
docker-compose down -v    # Stop & remove volumes
docker-compose build      # Rebuild images
docker-compose up -d      # Start fresh
```

### Remove Everything
```bash
make clean                # Remove all containers & volumes
docker system prune        # Deep clean
```

---

## Development & Testing

### Run Tests
```bash
make test                 # All tests
docker-compose exec django python manage.py test
```

### Code Quality
```bash
make lint                 # All linters
docker-compose exec django flake8 djangoapp/
docker-compose exec api_server npm run lint
```

### Format Code
```bash
docker-compose exec django black djangoapp/
docker-compose exec frontend npm run format
```

---

## Troubleshooting

### Services Won't Start
```bash
# Check what's using ports
lsof -i :3000,8000,3030,5050,27017

# Force rebuild
docker-compose build --no-cache
docker-compose up -d

# Check logs
make logs
```

### Check Service Connectivity
```bash
docker-compose exec django curl http://api_server:3030
docker-compose exec django curl http://sentiment_analyzer:5000
```

### Reset Everything
```bash
docker-compose down -v
docker system prune -a
docker-compose up -d
```

---

## Build & Deploy

### Local Build
```bash
docker-compose build
```

### Production Build
```bash
docker-compose -f docker-compose.yml build --no-cache
```

### Check Compose Config
```bash
docker-compose config
docker-compose config --quiet  # Validate only
```

---

## Network & Connection

### Test API
```bash
curl http://localhost:3030/                    # API health
curl http://localhost:8000/                    # Django health
curl http://localhost:5050/                    # Sentiment health
curl http://localhost:3000/                    # Frontend
```

### Access Database
```bash
docker-compose exec mongodb mongosh
# Once inside MongoDB:
# > use dealershipsDB
# > db.dealerships.find()
# > exit
```

---

## Backup & Restore

### Backup Database
```bash
docker-compose exec mongodb mongodump --out /backup/
docker cp car_dealership_mongodb:/backup ~/backup
```

### Restore Database
```bash
docker cp ~/backup car_dealership_mongodb:/
docker-compose exec mongodb mongorestore /backup/
```

---

## Monitoring

### View Container Stats
```bash
docker stats
docker stats car_dealership_django car_dealership_frontend
```

### View Service Logs with Timestamps
```bash
docker-compose logs --timestamps
```

### Real-time Monitoring
```bash
watch docker-compose ps
```

---

## Environment Variables

### Edit Environment
```bash
cp .env.example .env
# Edit .env with your values
docker-compose up -d  # Apply changes
```

### Verify Environment
```bash
docker-compose exec django env | grep BACKEND_URL
docker-compose exec django echo $SECRET_KEY
```

---

## One-Liners for Common Tasks

```bash
# Fresh start
docker-compose down -v && docker-compose up -d && sleep 30 && docker-compose ps

# Quick test all endpoints
for port in 3000 3030 5000 8000; do echo "Port $port:"; curl -s http://localhost:$port | head -20; echo "\n"; done

# View all logs from last hour
docker-compose logs --since 1h

# Check if services are healthy
docker-compose exec -T django curl -f http://localhost:8000/health
docker-compose exec -T api_server curl -f http://localhost:3030/
docker-compose exec -T sentiment_analyzer curl -f http://localhost:5000/

# Rebuild and restart one service
docker-compose build django && docker-compose up -d django

# Interactive shell for debugging
docker-compose exec django bash
docker-compose exec api_server sh
```

---

## Keyboard Shortcuts (in Docker)

| Action | Command |
|--------|---------|
| Stop all services | `Ctrl + C` (from docker-compose logs) |
| Detach from logs | `Ctrl + P, Ctrl + Q` |
| Execute command | `docker-compose exec <service> <command>` |

---

## Emergency Commands

```bash
# Kill all Docker containers
docker kill $(docker ps -q)

# Remove all stopped containers
docker container prune -f

# Remove unused images
docker image prune -f

# Remove unused volumes
docker volume prune -f

# Check disk usage
docker system df

# Deep clean (removes everything!)
docker system prune -a --volumes
```

---

## Get More Help

```bash
make help                      # All available make commands
docker-compose --help          # Docker Compose help
cat SETUP_GUIDE.md             # Complete setup guide
cat DEPLOYMENT.md              # Detailed deployment guide
cat IMPROVEMENTS_SUMMARY.md    # What was improved
```

--- **Pro Tip**: Save this file as a bookmark or alias for quick reference!
