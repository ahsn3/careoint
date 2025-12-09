# Fix Database Connection Issue

## Problem
The DATABASE_URL you provided uses `postgres.railway.internal` which is for internal Railway networking. For the web service to connect, you need the **PUBLIC** connection string.

## Solution: Get the Correct DATABASE_URL

### Step 1: Get Public Connection String from Railway

1. Go to Railway Dashboard → **Postgres** service
2. Click on **"Variables"** tab
3. Look for `DATABASE_URL` or `POSTGRES_URL` 
4. **OR** go to **"Database"** tab → **"Credentials"** sub-tab
5. Copy the **PUBLIC** connection string (it should look like):
   ```
   postgresql://postgres:PASSWORD@containers-us-west-XXX.railway.app:5432/railway
   ```
   (NOT the internal one with `railway.internal`)

### Step 2: Update DATABASE_URL in Web Service

1. Go to Railway Dashboard → **"web"** service → **"Variables"** tab
2. Find `DATABASE_URL` variable
3. Click **Edit** (pencil icon)
4. Replace with the **PUBLIC** connection string from Postgres service
5. Click **Save**

### Step 3: Restart Web Service

1. Go to **"Deployments"** tab
2. Click **"Restart"** on latest deployment
3. Wait for it to restart

### Step 4: Insert Doctors

After restart, visit:
```
https://carepoint.up.railway.app/api/migrate/insert-doctors
```

## Alternative: Use Railway's Shared Variables

Railway can automatically share the DATABASE_URL:

1. Go to **Postgres** service → **Variables** tab
2. Find `DATABASE_URL` or `POSTGRES_URL`
3. Click the **three dots** (⋯) next to it
4. Select **"Add to [web]"** or **"Share variable"**
5. This will automatically add it to your web service

## Verify Connection

After updating, check logs:
- Should see: "✓ Connected to PostgreSQL database"
- Should NOT see: "Connection refused" or "ECONNREFUSED"

Then insert doctors:
```
https://carepoint.up.railway.app/api/migrate/insert-doctors
```

