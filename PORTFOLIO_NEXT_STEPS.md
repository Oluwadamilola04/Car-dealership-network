# Portfolio Next Steps

Use this checklist to turn the project from "working capstone" into "strong portfolio project".

## 1. Add Screenshots

1. Open `http://localhost:3000`.
2. Capture these screens:
   - Home page
   - Login page
   - Register page
   - Dealership directory
   - Dealer profile with reviews
   - Post review form
   - Django admin
3. Create a folder named `docs/screenshots`.
4. Save the images with clear names, for example:
   - `home.png`
   - `dealerships.png`
   - `dealer-profile.png`
   - `post-review.png`
   - `admin.png`
5. Add them to the README under a new `Screenshots` section.

## 2. Add Tests

Start small. Do not try to test everything at once.

1. Django tests:
   - registration endpoint
   - login endpoint
   - `get_cars`
   - `get_dealers`
2. Node API tests:
   - fetch dealers
   - fetch dealer by ID
   - insert review
3. React tests:
   - home page renders
   - protected route redirects when logged out
   - dealerships page renders after mock API data

Suggested order:

```text
Django endpoint tests -> Node API tests -> React render tests
```

## 3. Clean Production Settings

1. Set `DEBUG=False`.
2. Use a strong `SECRET_KEY` from `.env`.
3. Keep `.env` out of Git.
4. Restrict `ALLOWED_HOSTS`.
5. Restrict `CSRF_TRUSTED_ORIGINS`.
6. Replace hardcoded local URLs with environment variables.

## 4. Improve Persistence

MongoDB already persists through a Docker volume. Django currently uses SQLite.

Best upgrade path:

1. Add Postgres to `docker-compose.yml`.
2. Point Django `DATABASES` to Postgres.
3. Run migrations into Postgres.
4. Confirm users/admin data survives container recreation.

## 5. Add Search and Sorting

Good portfolio-friendly features:

1. Search dealerships by name or city.
2. Sort dealerships by state or city.
3. Filter reviews by sentiment.
4. Show review counts on dealership cards.

## 6. Deploy Publicly

Possible deployment options:

1. Render
2. Railway
3. Fly.io
4. DigitalOcean
5. AWS Lightsail

Deployment checklist:

1. Push clean code to GitHub.
2. Add production `.env` values in the hosting dashboard.
3. Deploy MongoDB or use MongoDB Atlas.
4. Deploy all backend services.
5. Deploy frontend.
6. Test signup, login, dealer browsing, review posting, and admin.

## 7. Add a Demo Video

Record a 60-90 second walkthrough:

1. Show the architecture briefly.
2. Create/login as a user.
3. Browse dealerships.
4. Open a dealer.
5. Post a review.
6. Show the review sentiment.
7. Open Django admin.

Keep it short and confident.
