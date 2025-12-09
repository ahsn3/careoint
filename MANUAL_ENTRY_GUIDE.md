# Manual Entry Guide for Doctors Table

## Fields to Fill (in order):

When you click **"+ Row"** or see the input fields, fill these columns:

| Field Name | Required? | Example Value | Notes |
|------------|-----------|---------------|-------|
| **email** | ✅ Yes | `ahmed.rashid@carepoint.com` | Unique email for each doctor |
| **password** | ✅ Yes | `$2a$10$vNoAUreLAny7lKttUvHjUus2I3.VBsTlcXT91z/TtShFDqmmBF8/q` | Use this EXACT hash for all doctors |
| **name_en** | ✅ Yes | `Dr. Ahmed Al-Rashid` | English name |
| **name_ar** | ✅ Yes | `د. أحمد الراشد` | Arabic name |
| **name_tr** | ✅ Yes | `Dr. Ahmed Al-Rashid` | Turkish name |
| **department_en** | ✅ Yes | `Cardiology` | English department |
| **department_ar** | ✅ Yes | `أمراض القلب` | Arabic department |
| **department_tr** | ✅ Yes | `Kardiyoloji` | Turkish department |
| **specialty_en** | ✅ Yes | `Interventional Cardiology` | English specialty |
| **specialty_ar** | ✅ Yes | `أمراض القلب التداخلية` | Arabic specialty |
| **specialty_tr** | ✅ Yes | `Girişimsel Kardiyoloji` | Turkish specialty |
| **role** | ❌ Optional | `doctor` | Defaults to 'doctor' if left empty |
| **id** | ❌ Skip | (auto-generated) | Leave empty - auto-generated |
| **created_at** | ❌ Skip | (auto-generated) | Leave empty - auto-generated |

---

## All 12 Doctors - Copy & Paste Values

**Password Hash (use for ALL doctors):**
```
$2a$10$vNoAUreLAny7lKttUvHjUus2I3.VBsTlcXT91z/TtShFDqmmBF8/q
```

### Doctor 1 - Cardiology
- **email**: `ahmed.rashid@carepoint.com`
- **password**: `$2a$10$vNoAUreLAny7lKttUvHjUus2I3.VBsTlcXT91z/TtShFDqmmBF8/q`
- **name_en**: `Dr. Ahmed Al-Rashid`
- **name_ar**: `د. أحمد الراشد`
- **name_tr**: `Dr. Ahmed Al-Rashid`
- **department_en**: `Cardiology`
- **department_ar**: `أمراض القلب`
- **department_tr**: `Kardiyoloji`
- **specialty_en**: `Interventional Cardiology`
- **specialty_ar**: `أمراض القلب التداخلية`
- **specialty_tr**: `Girişimsel Kardiyoloji`

### Doctor 2 - Cardiology
- **email**: `fatima.zahra@carepoint.com`
- **password**: `$2a$10$vNoAUreLAny7lKttUvHjUus2I3.VBsTlcXT91z/TtShFDqmmBF8/q`
- **name_en**: `Dr. Fatima Al-Zahra`
- **name_ar**: `د. فاطمة الزهراء`
- **name_tr**: `Dr. Fatima Al-Zahra`
- **department_en**: `Cardiology`
- **department_ar**: `أمراض القلب`
- **department_tr**: `Kardiyoloji`
- **specialty_en**: `Pediatric Cardiology`
- **specialty_ar**: `أمراض قلب الأطفال`
- **specialty_tr**: `Pediatrik Kardiyoloji`

### Doctor 3 - Neurology
- **email**: `mohammed.sayed@carepoint.com`
- **password**: `$2a$10$vNoAUreLAny7lKttUvHjUus2I3.VBsTlcXT91z/TtShFDqmmBF8/q`
- **name_en**: `Dr. Mohammed Al-Sayed`
- **name_ar**: `د. محمد السيد`
- **name_tr**: `Dr. Mohammed Al-Sayed`
- **department_en**: `Neurology`
- **department_ar**: `الأعصاب`
- **department_tr**: `Nöroloji`
- **specialty_en**: `Neurological Surgery`
- **specialty_ar**: `جراحة الأعصاب`
- **specialty_tr**: `Nörolojik Cerrahi`

### Doctor 4 - Neurology
- **email**: `aisha.mansouri@carepoint.com`
- **password**: `$2a$10$vNoAUreLAny7lKttUvHjUus2I3.VBsTlcXT91z/TtShFDqmmBF8/q`
- **name_en**: `Dr. Aisha Al-Mansouri`
- **name_ar**: `د. عائشة المنصوري`
- **name_tr**: `Dr. Aisha Al-Mansouri`
- **department_en**: `Neurology`
- **department_ar**: `الأعصاب`
- **department_tr**: `Nöroloji`
- **specialty_en**: `Epilepsy Specialist`
- **specialty_ar**: `أخصائية الصرع`
- **specialty_tr**: `Epilepsi Uzmanı`

### Doctor 5 - Orthopedics
- **email**: `khalid.mahmoud@carepoint.com`
- **password**: `$2a$10$vNoAUreLAny7lKttUvHjUus2I3.VBsTlcXT91z/TtShFDqmmBF8/q`
- **name_en**: `Dr. Khalid Al-Mahmoud`
- **name_ar**: `د. خالد المحمود`
- **name_tr**: `Dr. Khalid Al-Mahmoud`
- **department_en**: `Orthopedics`
- **department_ar**: `العظام`
- **department_tr**: `Ortopedi`
- **specialty_en**: `Joint Replacement Surgery`
- **specialty_ar**: `جراحة استبدال المفاصل`
- **specialty_tr**: `Eklem Protez Cerrahisi`

### Doctor 6 - Orthopedics
- **email**: `layla.ahmad@carepoint.com`
- **password**: `$2a$10$vNoAUreLAny7lKttUvHjUus2I3.VBsTlcXT91z/TtShFDqmmBF8/q`
- **name_en**: `Dr. Layla Al-Ahmad`
- **name_ar**: `د. ليلى الأحمد`
- **name_tr**: `Dr. Layla Al-Ahmad`
- **department_en**: `Orthopedics`
- **department_ar**: `العظام`
- **department_tr**: `Ortopedi`
- **specialty_en**: `Sports Medicine`
- **specialty_ar**: `الطب الرياضي`
- **specialty_tr**: `Spor Hekimliği`

### Doctor 7 - Pediatrics
- **email**: `omar.hassan@carepoint.com`
- **password**: `$2a$10$vNoAUreLAny7lKttUvHjUus2I3.VBsTlcXT91z/TtShFDqmmBF8/q`
- **name_en**: `Dr. Omar Al-Hassan`
- **name_ar**: `د. عمر الحسن`
- **name_tr**: `Dr. Omar Al-Hassan`
- **department_en**: `Pediatrics`
- **department_ar**: `طب الأطفال`
- **department_tr**: `Pediatri`
- **specialty_en**: `General Pediatrics`
- **specialty_ar**: `طب الأطفال العام`
- **specialty_tr**: `Genel Pediatri`

### Doctor 8 - Pediatrics
- **email**: `nour.aldin@carepoint.com`
- **password**: `$2a$10$vNoAUreLAny7lKttUvHjUus2I3.VBsTlcXT91z/TtShFDqmmBF8/q`
- **name_en**: `Dr. Nour Al-Din`
- **name_ar**: `د. نور الدين`
- **name_tr**: `Dr. Nour Al-Din`
- **department_en**: `Pediatrics`
- **department_ar**: `طب الأطفال`
- **department_tr**: `Pediatri`
- **specialty_en**: `Neonatology`
- **specialty_ar**: `طب حديثي الولادة`
- **specialty_tr**: `Yenidoğan Bilimi`

### Doctor 9 - Dermatology
- **email**: `youssef.khatib@carepoint.com`
- **password**: `$2a$10$vNoAUreLAny7lKttUvHjUus2I3.VBsTlcXT91z/TtShFDqmmBF8/q`
- **name_en**: `Dr. Youssef Al-Khatib`
- **name_ar**: `د. يوسف الخطيب`
- **name_tr**: `Dr. Youssef Al-Khatib`
- **department_en**: `Dermatology`
- **department_ar**: `الأمراض الجلدية`
- **department_tr**: `Dermatoloji`
- **specialty_en**: `Cosmetic Dermatology`
- **specialty_ar**: `التجميل الجلدي`
- **specialty_tr**: `Kozmetik Dermatoloji`

### Doctor 10 - Dermatology
- **email**: `mariam.farouq@carepoint.com`
- **password**: `$2a$10$vNoAUreLAny7lKttUvHjUus2I3.VBsTlcXT91z/TtShFDqmmBF8/q`
- **name_en**: `Dr. Mariam Al-Farouq`
- **name_ar**: `د. مريم الفاروق`
- **name_tr**: `Dr. Mariam Al-Farouq`
- **department_en**: `Dermatology`
- **department_ar**: `الأمراض الجلدية`
- **department_tr**: `Dermatoloji`
- **specialty_en**: `Dermatopathology`
- **specialty_ar**: `أمراض الجلد المرضية`
- **specialty_tr**: `Dermatopatoloji`

### Doctor 11 - Gynecology
- **email**: `hassan.mutairi@carepoint.com`
- **password**: `$2a$10$vNoAUreLAny7lKttUvHjUus2I3.VBsTlcXT91z/TtShFDqmmBF8/q`
- **name_en**: `Dr. Hassan Al-Mutairi`
- **name_ar**: `د. حسن المطيري`
- **name_tr**: `Dr. Hassan Al-Mutairi`
- **department_en**: `Gynecology`
- **department_ar**: `أمراض النساء`
- **department_tr**: `Jinekoloji`
- **specialty_en**: `Gynecologic Oncology`
- **specialty_ar**: `أورام النساء`
- **specialty_tr**: `Jinekolojik Onkoloji`

### Doctor 12 - Gynecology
- **email**: `zainab.qasimi@carepoint.com`
- **password**: `$2a$10$vNoAUreLAny7lKttUvHjUus2I3.VBsTlcXT91z/TtShFDqmmBF8/q`
- **name_en**: `Dr. Zainab Al-Qasimi`
- **name_ar**: `د. زينب القاسمي`
- **name_tr**: `Dr. Zainab Al-Qasimi`
- **department_en**: `Gynecology`
- **department_ar**: `أمراض النساء`
- **department_tr**: `Jinekoloji`
- **specialty_en**: `Reproductive Medicine`
- **specialty_ar**: `الطب الإنجابي`
- **specialty_tr**: `Üreme Tıbbı`

---

## Quick Tips:

1. **Password**: Copy the hash once and paste it for ALL doctors
2. **Skip**: Don't fill `id` or `created_at` - they're auto-generated
3. **Role**: Leave empty (defaults to 'doctor')
4. **Order**: Fill fields in the order shown above
5. **After each doctor**: Click "Insert" button, then click "+ Row" again for the next doctor

---

## After Inserting All 12 Doctors:

Verify by refreshing the table - you should see 12 rows of doctor data!

