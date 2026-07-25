# LeadDesk Mini

A full-stack, premium lead capture and management system built for the Digital Heroes Training Task.

## Features
- **Public Landing Page**: Modern, glassmorphism UI with beautiful micro-animations and gradients. Includes client-side (Zod + React Hook Form) and server-side validation.
- **Admin Dashboard**: Secured via custom JWT authentication. Includes real-time search filtering and instant status toggling (New, Contacted, Closed).
- **Fully Responsive**: Works seamlessly on mobile and desktop devices.
- **MongoDB Database**: Scalable NoSQL document store using Mongoose ORM.

## Data Model

The application uses MongoDB (via Mongoose) with two primary collections:

1. **Leads (`leads` collection)**:
   - `name` (String, Required) - Full name of the lead.
   - `email` (String, Required) - Email address for contact.
   - `budgetRange` (String, Required) - Selected budget bracket (`< $1k`, `$1k - $5k`, `$5k+`).
   - `message` (String, Required) - Description of their project/needs.
   - `status` (String, Default: `New`) - Current lead status (`New`, `Contacted`, `Closed`).
   - `createdAt` (Date) - Timestamp of submission.

2. **Admins (`admins` collection)**:
   - `email` (String, Required, Unique) - Admin login email.
   - `passwordHash` (String, Required) - Bcrypt hashed password.

## Authentication Approach

For maximum security without external dependencies like NextAuth, I implemented a robust custom JWT-based authentication system:
1. **Password Hashing**: When the admin user is created, the password (`password123`) is hashed using `bcryptjs` with a work factor of 10.
2. **Stateless JWT**: Upon successful login, the server generates a JSON Web Token (JWT) signed with a secret (`JWT_SECRET`), containing the admin's ID and email.
3. **Secure Cookies**: The JWT is delivered back to the client via an `HttpOnly`, `Secure`, `SameSite=strict` cookie. This prevents XSS attacks from accessing the token.
4. **Route Protection**: The `/admin` page is a React Server Component that reads the cookie and verifies the JWT on the server before rendering the dashboard. API routes (like GET leads and PATCH status) also verify the token, returning 401 Unauthorized if invalid.

*Note: For ease of testing, the system automatically seeds a default admin (`admin@leaddesk.com` / `password123`) on the first login attempt if no admins exist.*


## Loom Walkthrough Guide

To complete your submission, record a Loom video demonstrating the following flow:
1. Open the live Vercel URL in an incognito/fresh browser window.
2. Show the beautiful public landing page. Scroll to the footer to show the "Built for Digital Heroes Training Task" credit line.
3. Fill out the lead capture form with test data and submit it. Show the success state.
4. Navigate to `/admin/login` and log in using `admin@leaddesk.com` and `password123`.
5. In the Admin Dashboard, locate the newly submitted lead.
6. Use the search bar to filter by the lead's name or email.
7. Toggle the lead's status from "New" to "Contacted" or "Closed".
8. (Optional) Refresh the page to prove the status change persisted in the database.
