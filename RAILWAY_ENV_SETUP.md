# Railway Environment Variables Setup

## Step 1: Add DATABASE_URL

1. Go to Railway Dashboard → Your "web" service → **Variables** tab
2. Click **"+ New Variable"**
3. Add:
   - **Name**: `DATABASE_URL`
   - **Value**: `postgresql://postgres:axCbUEbaCEGMnzUDoSWMWsfuJLqIWbwK@postgres.railway.internal:5432/railway`
4. Click **"Add"**

## Step 2: Add JWT_SECRET

1. Still in **Variables** tab
2. Click **"+ New Variable"**
3. Add:
   - **Name**: `JWT_SECRET`
   - **Value**: `carepoint-secret-key-2024` (or generate a random string)
4. Click **"Add"**

## Step 3: Add NODE_ENV

1. Still in **Variables** tab
2. Click **"+ New Variable"**
3. Add:
   - **Name**: `NODE_ENV`
   - **Value**: `production`
4. Click **"Add"**

## Step 4: Restart Service

After adding all variables:
1. Go to **Deployments** tab
2. Click **"Restart"** on the latest deployment
3. Or wait for Railway to auto-restart

## What Happens Next

Once you restart:
- ✅ Database migrations will run automatically
- ✅ All 12 doctor accounts will be created
- ✅ Patient registration will work
- ✅ Doctor login will work

## Default Doctor Accounts

After migration, you can login with any of these:

**Cardiology:**
- `ahmed.rashid@carepoint.com` / `doctor123`
- `fatima.zahra@carepoint.com` / `doctor123`

**Neurology:**
- `mohammed.sayed@carepoint.com` / `doctor123`
- `aisha.mansouri@carepoint.com` / `doctor123`

**Orthopedics:**
- `khalid.mahmoud@carepoint.com` / `doctor123`
- `layla.ahmad@carepoint.com` / `doctor123`

**Pediatrics:**
- `omar.hassan@carepoint.com` / `doctor123`
- `nour.aldin@carepoint.com` / `doctor123`

**Dermatology:**
- `youssef.khatib@carepoint.com` / `doctor123`
- `mariam.farouq@carepoint.com` / `doctor123`

**Gynecology:**
- `hassan.mutairi@carepoint.com` / `doctor123`
- `zainab.qasimi@carepoint.com` / `doctor123`

## Verify Setup

1. Check Railway logs for: "✓ Migration completed successfully"
2. Check Railway logs for: "✓ Default doctors inserted"
3. Try logging in as a doctor
4. Try registering a new patient

