# How to Insert Doctors into Database

## Quick Method: Use Browser

1. Wait for Railway to finish deploying (check that your service is "Online")
2. Open your browser and visit:
   ```
   https://carepoint.up.railway.app/api/migrate/insert-doctors
   ```
3. You should see a JSON response like:
   ```json
   {
     "success": true,
     "message": "Doctors insertion completed: 12 inserted, 0 skipped",
     "inserted": 12,
     "skipped": 0,
     "total": 12
   }
   ```

## Alternative: Use curl (Terminal)

```bash
curl -X POST https://carepoint.up.railway.app/api/migrate/insert-doctors
```

## Verify Doctors Were Inserted

Visit this URL to check:
```
https://carepoint.up.railway.app/api/migrate/status
```

You should see `"doctorCount": 12`

## Or Check in Railway Dashboard

1. Go to Railway → Postgres → Database → Data → doctors table
2. You should see 12 rows with doctor information

## Troubleshooting

If you get an error:
- Make sure DATABASE_URL is set in Railway Variables
- Make sure the service is "Online" (not building or crashed)
- Check Railway logs for any error messages

