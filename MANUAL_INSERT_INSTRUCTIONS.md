# Manual Doctor Data Insertion Guide

## Option 1: Using Railway's Table Interface (Easiest - if SQL editor not available)

1. Go to Railway → Postgres → Database → **Data** tab
2. Click on the **`doctors`** table card
3. Look for a **"Query"**, **"SQL"**, or **"Run Query"** button/tab in the table view
4. If you see a SQL editor, paste the contents of `INSERT_DOCTORS_SQL.sql` and run it
5. If no SQL editor, proceed to Option 2 or 3 below

## Option 2: Using External SQL Client (Recommended - Most Reliable)

Railway doesn't always have a built-in SQL editor. Use an external tool:

### Quick Online Method (No Installation):
1. Go to https://www.elephantsql.com/ (or any online PostgreSQL client)
2. In Railway → Postgres → Database tab → Click **"Connect"** button
3. Copy the **Public Connection String** (looks like `postgresql://postgres:password@host:port/railway`)
4. Paste it into the online SQL client
5. Copy and paste the entire contents of `INSERT_DOCTORS_SQL.sql`
6. Click **Run** or **Execute**

### Desktop Method:
1. Install a SQL client: **DBeaver** (free), **pgAdmin**, or **TablePlus**
2. In Railway → Postgres → Database tab → Click **"Connect"** button
3. Copy the connection details (host, port, database, username, password)
4. Connect using your SQL client
5. Run the SQL from `INSERT_DOCTORS_SQL.sql`

## Option 3: Manual Row Entry (Slow but Works)

1. Go to Railway → Postgres → Database → **Data** tab
2. Click on the **`doctors`** table card
3. Click **+ Row** button
4. Manually enter each doctor's data from the table below
5. Repeat for all 12 doctors (this is tedious but works)

1. Get your database connection string from Railway:
   - Postgres service → Database tab → Connect button
   - Copy the **Public Connection String** (starts with `postgresql://`)
2. Connect using your preferred SQL client
3. Run the SQL script from `INSERT_DOCTORS_SQL.sql`

---

## Doctor Data Table

**All doctors use password: `doctor123`**

| Email | Name (EN) | Name (AR) | Department | Specialty |
|-------|-----------|-----------|------------|-----------|
| ahmed.rashid@carepoint.com | Dr. Ahmed Al-Rashid | د. أحمد الراشد | Cardiology | Interventional Cardiology |
| fatima.zahra@carepoint.com | Dr. Fatima Al-Zahra | د. فاطمة الزهراء | Cardiology | Pediatric Cardiology |
| mohammed.sayed@carepoint.com | Dr. Mohammed Al-Sayed | د. محمد السيد | Neurology | Neurological Surgery |
| aisha.mansouri@carepoint.com | Dr. Aisha Al-Mansouri | د. عائشة المنصوري | Neurology | Epilepsy Specialist |
| khalid.mahmoud@carepoint.com | Dr. Khalid Al-Mahmoud | د. خالد المحمود | Orthopedics | Joint Replacement Surgery |
| layla.ahmad@carepoint.com | Dr. Layla Al-Ahmad | د. ليلى الأحمد | Orthopedics | Sports Medicine |
| omar.hassan@carepoint.com | Dr. Omar Al-Hassan | د. عمر الحسن | Pediatrics | General Pediatrics |
| nour.aldin@carepoint.com | Dr. Nour Al-Din | د. نور الدين | Pediatrics | Neonatology |
| youssef.khatib@carepoint.com | Dr. Youssef Al-Khatib | د. يوسف الخطيب | Dermatology | Cosmetic Dermatology |
| mariam.farouq@carepoint.com | Dr. Mariam Al-Farouq | د. مريم الفاروق | Dermatology | Dermatopathology |
| hassan.mutairi@carepoint.com | Dr. Hassan Al-Mutairi | د. حسن المطيري | Gynecology | Gynecologic Oncology |
| zainab.qasimi@carepoint.com | Dr. Zainab Al-Qasimi | د. زينب القاسمي | Gynecology | Reproductive Medicine |

---

## Password Hash

All passwords are hashed using bcrypt. The hash for "doctor123" is:
```
$2a$10$vNoAUreLAny7lKttUvHjUus2I3.VBsTlcXT91z/TtShFDqmmBF8/q
```

Use this exact hash for the `password` field for all doctors.

---

## Verification

After insertion, verify the data:

```sql
-- Count total doctors
SELECT COUNT(*) FROM doctors;

-- View all doctors
SELECT email, name_en, department_en FROM doctors;

-- Test login (should return 1 row)
SELECT * FROM doctors WHERE email = 'ahmed.rashid@carepoint.com';
```

---

## Troubleshooting

- **If you get "duplicate key" error**: The doctor already exists. The SQL uses `ON CONFLICT DO NOTHING` to prevent duplicates.
- **If password doesn't work**: Make sure you copied the entire hash string correctly (it's very long).
- **If columns don't match**: Check that your table structure matches the migration file.

