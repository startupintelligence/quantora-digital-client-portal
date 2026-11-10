# Quantora Digital Client Portal

Standalone React + TypeScript + Vite application using npm, Firebase Authentication and Cloud Firestore.

## Included
- Invite-only email/password sign-in
- Role-aware Client and Admin workspaces
- Dashboard, projects, tasks, messages, approvals, client directory and account page
- Firestore-backed data and organisation-scoped security rules
- Responsive interface and reduced-motion support

## Install and run
```bash
npm install
cp .env.example .env
npm run dev
```
Add the Firebase Web App config values to `.env`. Never add service-account JSON or private keys.

## Firebase setup
1. Enable Email/Password in Authentication → Sign-in method.
2. Create a Firestore database.
3. Publish `firestore.rules` in Firestore → Rules.
4. Create invited users in Firebase Authentication. The app has no public registration form.
5. For each user, create `users/{uid}` in Firestore using the exact Authentication UID.

### Bootstrap founder/admin
Create the founder in Authentication, copy the UID, then create `users/{uid}` with fields: `displayName` (string), `email` (string), `role` (string `founder`), `organizationId` (empty string). Do this from Firebase Console. Users cannot set their own role.

### Add a client
Create an Authentication user. Create `organizations/{orgId}` with a `name`. Create `organizations/{orgId}/members/{uid}`. Create `users/{uid}` with `displayName`, `email`, `role: client`, and the matching `organizationId`.

## Deploy
```bash
npm run build
firebase use quantora-digital-client-portal
firebase deploy --only firestore:rules
firebase deploy --only hosting
```

## Billing
This MVP does not use Cloud Storage or Cloud Functions. Firebase Storage for new buckets and Cloud Functions require Blaze billing. Keep the project on Spark; no billing is required for the included modules within Firebase free quotas.

## Security and MVP boundaries
- Firestore rules enforce organisation access; UI route guards are not a security boundary.
- Client users cannot change their own role or organisation.
- Admin profiles must be provisioned manually by a trusted operator.
- File uploads, invoices, push notifications, automated invitations and audit-log writes are not implemented.
- Admin message view can read all organisations; posting requires an organisation membership.
- Test rules with Firebase Emulator Suite before production use.
- Fonts currently load from Google Fonts; self-host them before production if third-party font requests are not desired.
