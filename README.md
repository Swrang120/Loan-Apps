# Loan-Apps — Safe Loan Application Prototype

This repository is a UI/workflow prototype, not a live lending service.

## Current flow
1. Mobile-number test login.
2. Locally generated demo OTP.
3. Fictional/test KYC form for PAN/Aadhaar format, name and DOB matching.
4. Fictional/test bank information.
5. Basic profile information.
6. Loan request between ₹20,000 and ₹10,00,000.
7. Direct prototype administrator review.
8. Prototype approval status.

## Fix report

### Issue 1 — Prototype OTP handling
The OTP remains local to the browser session. No SMS provider or real verification credential is used.
Code trace: app.js — Issue 1.

### Issue 2 — KYC validation and persistence
The KYC step validates PAN format, Aadhaar length, name matching and DOB matching. Fictional test data is saved in browser storage so the prototype survives refresh.
Code trace: app.js — Issue 2 and saveApplication()/loadApplication().

### Issue 3 — Removed borrower-payment unlock/withdrawal flow
The previous UI contained ₹200 and ₹800 prototype screens after submission. They have been removed. A borrower is not asked to pay a fee to unlock, approve or withdraw a loan.
Code trace: index.html — fee screens removed; app.js — Issue 3.

### Issue 4 — Better validation feedback
Validation errors now use an in-app toast instead of browser alert dialogs, and screen changes scroll to the top.
Code trace: app.js — toast()/show(); index.html — toast container; styles.css — toast styles.

### Issue 5 — Application state survives refresh
Prototype application data is stored under a dedicated local-storage key and cleared when starting a new application.
This is browser-only persistence, not production database storage.

## Supabase / real document storage
The current repository does not contain a Supabase client configuration or Supabase Storage integration. It would therefore be incorrect to claim that real KYC documents are currently stored in Supabase.

For a production version, documents should use private storage with access policies and database metadata linked to the application/user record after the proper lender, consent, privacy and KYC architecture is established. Never put a Supabase service-role key in this frontend.

## Safety and compliance boundary
Real PAN/Aadhaar/face-KYC collection, real bank-account verification, real payment collection and real loan disbursement remain disabled in this prototype.

Never use real identity documents, bank credentials or payment credentials in this demo repository.
