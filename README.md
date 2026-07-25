# LeadDesk Mini

A full-stack, premium lead capture and management system built with Next.js App Router, MongoDB, and Framer Motion. 

LeadDesk Mini provides a modern, highly-animated public landing page for capturing leads, alongside a secure, authenticated admin dashboard for managing those leads.

## 🚀 Features

- **Public Landing Page**: Modern glassmorphism UI with beautiful micro-animations, spring-physics interactions, and dynamic background gradients using Framer Motion.
- **Form Validation**: Client-side (Zod + React Hook Form) and server-side validation to ensure clean data.
- **Admin Dashboard**: Secured via a custom stateless JWT authentication system. 
- **Lead Management**: Real-time search filtering and instant status toggling (New, Contacted, Closed).
- **Responsive Design**: Flawless experience across mobile, tablet, and desktop devices.
- **NoSQL Database**: Scalable NoSQL document store using MongoDB and Mongoose ORM.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/)
- **Styling**: Vanilla CSS (CSS Variables, Flexbox/Grid, Glassmorphism)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Authentication**: Custom JWT (JSON Web Tokens) with `bcryptjs` and secure `HttpOnly` cookies.

## 📦 Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/maddy356/leaddesk-mini.git
   cd leaddesk-mini
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add your credentials:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0...
   JWT_SECRET=your_super_secret_jwt_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Admin Authentication

The application uses a custom JWT-based authentication system:
- When the first admin user registers, their password is hashed using `bcryptjs`.
- Upon login, a JWT is generated and stored in a secure `HttpOnly` cookie.
- The `/admin` dashboard is a React Server Component that verifies the JWT on the server before rendering. API routes also verify this token to prevent unauthorized access.

To access the dashboard locally, use the "Admin Login" link on the top right of the landing page or navigate to `/admin/login`.

## 🌐 Deployment

This application is fully optimized for Vercel's Edge/Serverless platform.
Deploying requires setting the `MONGODB_URI` and `JWT_SECRET` environment variables in your hosting provider's dashboard.
