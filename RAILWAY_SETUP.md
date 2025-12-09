# Railway Setup Instructions

## Critical: Set Environment Variables

Your deployment is crashing because **DATABASE_URL is missing**. Follow these steps:

### Step 1: Add PostgreSQL Database

1. In Railway dashboard, click **"New"** → **"Database"** → **"Add PostgreSQL"**
2. Railway will create a PostgreSQL database
3. Copy the **DATABASE_URL** (it will be shown in the database service)

### Step 2: Set Environment Variables

Go to your **"web"** service → **"Variables"** tab and add:

```
DATABASE_URL=<paste-the-postgresql-url-from-step-1>
JWT_SECRET=<generate-a-random-secret>
NODE_ENV=production
```

**To generate JWT_SECRET**, run this command locally:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Or use any random string like: `my-super-secret-jwt-key-12345`

### Step 3: Redeploy

After setting the variables:
1. Click **"Restart"** on your deployment
2. Or push a new commit to trigger auto-deploy

## Common Issues

### Issue: "DATABASE_URL is not set"
**Solution**: Add DATABASE_URL environment variable (see Step 2)

### Issue: "Connection refused"
**Solution**: 
- Make sure PostgreSQL service is running in Railway
- Check that DATABASE_URL is correct
- Verify SSL settings (should be enabled for Railway)

### Issue: "Migration failed"
**Solution**: 
- Check Railway logs for specific error
- Verify DATABASE_URL format is correct
- Ensure PostgreSQL service is active

## Verify Deployment

Once deployed successfully, you should see:
- ✅ Server running on port (Railway sets this automatically)
- ✅ Database migrations completed
- ✅ "Connected to PostgreSQL database" in logs

## Testing

1. Visit your Railway URL: `https://your-app.up.railway.app`
2. Test patient registration
3. Test doctor login: `ahmed.rashid@carepoint.com` / `doctor123`

