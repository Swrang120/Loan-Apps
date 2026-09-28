# Loan-Apps — Safe Loan Application Prototype

This repository currently contains a **UI/workflow prototype**, not a live lending service.

## Included in this first version

1. Mobile-number login screen.
2. Demo OTP verification (generated locally; no SMS is sent).
3. KYC screen with clearly marked placeholders.
4. Bank-information screen using demo values only.
5. Basic information in English: marital status, education/class, employment, monthly income and two contacts.
6. Loan request screen with ₹20,000–₹10,00,000 range.
7. Application status timeline.
8. Demo administrator approval flow.

## Important safety/compliance boundary

Real PAN/Aadhaar/face-KYC collection, real bank-account verification, real payment collection and real loan disbursement are intentionally **not enabled** in this prototype.

For an actual Indian digital lending product, the lender/regulatory setup, KYC process, privacy/data handling, disclosures, grievance process and fee structure must be reviewed and implemented with the applicable RBI requirements. RBI guidance for digital lending includes disclosure of the all-inclusive cost/APR and states that fees/charges payable to Lending Service Providers in the credit-intermediation process are paid by the regulated entity rather than the borrower. See RBI's published material: https://website.rbi.org.in/documents/d/rbi/handbookg27022025d0f3f53f5d3c4310a6bb2f8ac2175d3a

Therefore this demo does **not** implement a flow that asks a borrower to pay ₹200/₹800 to unlock or withdraw a loan.

## Next safe development stage

A production design can be prepared after the legal/lender model is established, including:
- real lender/RE identity and authorization details;
- secure authentication;
- compliant KYC integration through an authorized provider;
- consent-based data collection;
- KFS/APR and fee disclosures;
- repayment schedule;
- secure admin review;
- audit logs;
- privacy and grievance screens.

Never use real identity documents or bank credentials in this demo repository.
