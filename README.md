# Learn Here Free - Medical Education Platform

A comprehensive educational video learning platform built with React, Express, and PostgreSQL, designed specifically for medical education with advanced monetization features.

## Features

- 🎓 **Medical Education Focus**: Complete curriculum with batches, subjects, and video content
- 🔐 **Secure Authentication**: Google OAuth + email/password authentication
- 🎥 **Video Learning**: YouTube integration with progress tracking
- 📱 **Responsive Design**: Mobile-first approach with modern UI
- 💰 **Monetization Ready**: Multi-platform ad integration system
- 📧 **Email System**: Password reset with OTP via email
- 👨‍💼 **Admin Dashboard**: Complete content management system
- 🛡️ **Video Protection**: Advanced video protection against unauthorized access

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for fast development
- Tailwind CSS + Shadcn/UI
- TanStack Query for state management
- Wouter for routing

### Backend
- Node.js with Express
- PostgreSQL with Drizzle ORM
- Passport.js for authentication
- SendGrid/Nodemailer for emails
- Session-based authentication

## Quick Start

1. **Clone and Install**
   ```bash
   git clone <your-repo>
   cd learn-here-free
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

3. **Database Setup**
   ```bash
   # Create PostgreSQL database
   createdb learnherefree
   
   # Push schema to database
   npm run db:push
   ```

4. **Start Development**
   ```bash
   npm run dev
   ```

## Environment Variables

### Required
- `DATABASE_URL` - PostgreSQL connection string
- `SESSION_SECRET` - Secure session secret
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret

### Optional
- `SENDGRID_API_KEY` - For email OTP (recommended)
- `EMAIL_USER` / `EMAIL_PASS` - Gmail SMTP alternative

## Initial Setup

### 1. Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:5000/auth/google/callback` (development)
   - `https://yourdomain.com/auth/google/callback` (production)

### 2. Database Setup
The application will create all necessary tables automatically when you run:
```bash
npm run db:push
```

### 3. Admin User Setup
Create an admin user through the signup form, then update the database:
```sql
UPDATE users SET role = 'admin' WHERE email = 'your-admin@email.com';
```

## Project Structure

```
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── lib/          # Utilities and config
│   │   └── main.tsx      # App entry point
├── server/               # Express backend
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Database operations
│   ├── emailService.ts   # Email functionality
│   └── index.ts          # Server entry point
├── shared/               # Shared types and schemas
│   └── schema.ts         # Database schema
└── package.json          # Dependencies
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run db:push` - Push database schema
- `npm run db:studio` - Open database studio

## Features Overview

### Authentication
- Google OAuth integration
- Email/password authentication
- Session management
- Email-based password reset with OTP

### Content Management
- Hierarchical content (Batches → Subjects → Videos)
- Admin dashboard for content creation
- Video progress tracking
- User access control

### Monetization System
- Multi-platform ad network integration
- Revenue tracking and analytics
- Optimized ad placements
- Geographic targeting

### Medical Education Content
- 5+ Medical batches pre-configured
- Complete curriculum structure
- Video protection system
- Progress tracking

## Production Deployment

### Environment Setup
```bash
NODE_ENV=production
DATABASE_URL=your_production_db_url
GOOGLE_CLIENT_ID=your_production_client_id
GOOGLE_CLIENT_SECRET=your_production_client_secret
SESSION_SECRET=your_production_session_secret
```

### Build and Start
```bash
npm run build
npm start
```

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository.