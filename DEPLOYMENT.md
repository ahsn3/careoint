# Deployment Guide for Railway

## Prerequisites

1. GitHub account
2. Railway account (sign up at railway.app)
3. PostgreSQL database (Railway provides this)

## Step-by-Step Deployment

### 1. Prepare GitHub Repository

1. Initialize git repository (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Ready for Railway deployment"
   ```

2. Create a new repository on GitHub

3. Push your code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

### 2. Deploy on Railway

1. Go to [railway.app](https://railway.app) and sign in

2. Click "New Project"

3. Select "Deploy from GitHub repo"

4. Choose your repository

5. Railway will automatically detect the project and start building

### 3. Set Up PostgreSQL Database

1. In your Railway project, click "New" → "Database" → "Add PostgreSQL"

2. Railway will create a PostgreSQL database and provide a `DATABASE_URL`

3. Copy the `DATABASE_URL` (you'll need it in the next step)

### 4. Configure Environment Variables

In your Railway project dashboard:

1. Go to "Variables" tab

2. Add the following environment variables:

   ```
   DATABASE_URL=<your-postgresql-url-from-railway>
   JWT_SECRET=<generate-a-random-secret-key>
   NODE_ENV=production
   PORT=3000
   ```

   To generate a JWT_SECRET:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

### 5. Run Database Migrations

Railway will automatically run migrations on deploy (configured in `Procfile`).

If you need to run migrations manually:

1. Go to your service in Railway
2. Click on "Deployments"
3. Click on the latest deployment
4. Open the logs to verify migrations ran successfully

### 6. Verify Deployment

1. Once deployed, Railway will provide a URL (e.g., `your-app.railway.app`)

2. Visit the URL to verify the application is running

3. Test the following:
   - Homepage loads
   - Patient registration works
   - Doctor login works (use: `ahmed.rashid@carepoint.com` / `doctor123`)
   - Doctor dashboard loads

## Troubleshooting

### Database Connection Issues

- Verify `DATABASE_URL` is correctly set in Railway variables
- Check that PostgreSQL service is running in Railway
- Review deployment logs for connection errors

### Migration Errors

- Check that migrations ran successfully in deployment logs
- Verify database tables were created:
  ```sql
  SELECT table_name FROM information_schema.tables 
  WHERE table_schema = 'public';
  ```

### API Not Working

- Verify `api-client.js` is loading before `auth-api.js`
- Check browser console for API errors
- Verify CORS is enabled (already configured in `server.js`)

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `NODE_ENV` | Environment (production/development) | Yes |
| `PORT` | Server port (Railway sets automatically) | No |

## Default Doctor Accounts

After migration, these accounts will be available:

- Email: `ahmed.rashid@carepoint.com`
- Password: `doctor123`

(And 5 more default doctors - see `migrations/migrate.js`)

## Updating the Application

1. Make changes to your code
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your update message"
   git push
   ```
3. Railway will automatically detect changes and redeploy

## Monitoring

- View logs in Railway dashboard
- Check deployment status
- Monitor database usage
- Set up alerts for errors

## Support

For Railway-specific issues, check:
- [Railway Documentation](https://docs.railway.app)
- [Railway Discord](https://discord.gg/railway)

