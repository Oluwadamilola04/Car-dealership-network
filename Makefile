.PHONY: help build up down logs clean test lint install

help:
	@echo "Car Dealership Application - Make Commands"
	@echo "==========================================="
	@echo ""
	@echo "  make build           Build all Docker images"
	@echo "  make up              Start all services"
	@echo "  make down            Stop all services"
	@echo "  make logs            View service logs"
	@echo "  make clean           Clean up containers and volumes"
	@echo "  make test            Run all tests"
	@echo "  make lint            Run code linters"
	@echo "  make install         Install dependencies"
	@echo "  make migrate         Run Django migrations"
	@echo "  make superuser       Create Django superuser"
	@echo "  make shell           Access Django shell"
	@echo "  make db-reset        Reset database"
	@echo "  make ps              Show container status"
	@echo ""

build:
	@echo "Building Docker images..."
	docker-compose build

up:
	@echo "Starting services..."
	docker-compose up -d
	@echo "Waiting for services to become healthy..."
	sleep 10
	docker-compose ps

down:
	@echo "Stopping services..."
	docker-compose down

logs:
	docker-compose logs -f

logs-django:
	docker-compose logs -f django

logs-api:
	docker-compose logs -f api_server

logs-frontend:
	docker-compose logs -f frontend

logs-mongodb:
	docker-compose logs -f mongodb

clean:
	@echo "Cleaning up..."
	docker-compose down -v
	find . -type d -name __pycache__ -exec rm -rf {} + 2>/dev/null || true
	find . -type f -name "*.pyc" -delete
	find . -type d -name "node_modules" -exec rm -rf {} + 2>/dev/null || true
	@echo "Cleanup complete"

install:
	@echo "Installing dependencies..."
	cd server && pip install -r requirements.txt
	cd server/database && npm install
	cd server/djangoapp/microservices && pip install -r requirements.txt
	cd server/frontend && npm install --legacy-peer-deps
	@echo "Dependencies installed"

test:
	@echo "Running tests..."
	docker-compose exec -T django python manage.py test
	docker-compose exec -T api_server npm test || true
	@echo "Tests completed"

lint:
	@echo "Running linters..."
	docker-compose exec -T django flake8 djangoapp/ --max-line-length=100
	docker-compose exec -T api_server npm run lint || true
	@echo "Linting completed"

migrate:
	@echo "Running Django migrations..."
	docker-compose exec django python manage.py migrate

migrations:
	@echo "Creating new migrations..."
	docker-compose exec django python manage.py makemigrations

superuser:
	@echo "Creating Django superuser..."
	docker-compose exec django python manage.py createsuperuser

shell:
	@echo "Opening Django shell..."
	docker-compose exec django python manage.py shell

mongodb-shell:
	@echo "Opening MongoDB shell..."
	docker-compose exec mongodb mongosh

db-reset:
	@echo "Resetting database..."
	docker-compose down -v
	docker-compose up -d mongodb
	@echo "Database reset complete"

ps:
	docker-compose ps

status:
	@echo "Service Status:"
	docker-compose ps
	@echo ""
	@echo "Service URLs:"
	@echo "  Frontend:  http://localhost:3000"
	@echo "  Django:    http://localhost:8000"
	@echo "  API:       http://localhost:3030"
	@echo "  Sentiment: http://localhost:5050"
	@echo "  MongoDB:   mongodb://localhost:27017"

restart:
	@echo "Restarting services..."
	docker-compose restart

stop:
	@echo "Stopping services..."
	docker-compose stop

start:
	@echo "Starting services..."
	docker-compose start

health-check:
	@echo "Checking service health..."
	@docker-compose exec -T django curl -s http://localhost:8000/health || echo "Django: Not responding"
	@docker-compose exec -T api_server curl -s http://localhost:3030/ || echo "API: Not responding"
	@docker-compose exec -T frontend curl -s http://localhost:3000/ || echo "Frontend: Not responding"
	@docker-compose exec -T sentiment_analyzer curl -s http://localhost:5000/ || echo "Sentiment: Not responding"
	@echo "Health check complete"

prod-build:
	@echo "Building production images..."
	docker-compose -f docker-compose.yml build --no-cache

prod-up:
	@echo "Starting production services..."
	docker-compose -f docker-compose.yml up -d --remove-orphans

version:
	@docker --version
	@docker-compose --version
	@node --version
	@python --version

init-dev:
	@echo "Initializing development environment..."
	cp .env.example .env
	make build
	make up
	make migrate
	@echo "Development environment ready!"
	@echo "Visit http://localhost:3000 to access the application"
