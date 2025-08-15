# Complete Setup Guide

## Prerequisites

1. Node.js (18+ recommended)
2. PostgreSQL database
3. Google Cloud Console account (for OAuth)
4. SendGrid account (optional, for emails)

## Step-by-Step Setup

### 1. Environment Configuration

Create `.env` file with these variables:

```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/learnherefree
PGHOST=localhost
PGPORT=5432
PGUSER=your_db_username
PGPASSWORD=your_db_password
PGDATABASE=learnherefree

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Session Security
SESSION_SECRET=your_very_secure_session_secret_here

# Email (Optional)
SENDGRID_API_KEY=your_sendgrid_api_key
```

### 2. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project: "Learn Here Free"
3. Enable APIs:
   - Google+ API
   - Google OAuth2 API
4. Create OAuth 2.0 Client ID:
   - Application type: Web application
   - Authorized redirect URIs:
     - `http://localhost:5000/auth/google/callback`
     - `https://yourdomain.com/auth/google/callback`
5. Copy Client ID and Client Secret to `.env`

### 3. Database Setup

```bash
# Install dependencies
npm install

# Create database
createdb learnherefree

# Push schema to database
npm run db:push
```

### 4. Email Setup (Optional)

#### Option A: SendGrid (Recommended)
1. Create account at [SendGrid](https://sendgrid.com/)
2. Create API key with Mail Send permissions
3. Verify sender email address
4. Add `SENDGRID_API_KEY` to `.env`

#### Option B: Gmail SMTP
1. Enable 2-factor authentication on Gmail
2. Generate app password
3. Add to `.env`:
   ```
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=your-app-password
   ```

### 5. Admin User Setup

1. Start the application:
   ```bash
   npm run dev
   ```

2. Open http://localhost:5000
3. Create account through signup form
4. Update database to make user admin:
   ```sql
   UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
   ```

### 6. Content Setup

The application comes with pre-configured medical education content:
- 5 Medical batches
- 13 Subjects (Anatomy, Physiology, etc.)
- Sample videos and progress tracking

### 7. Production Deployment

#### Replit Deployment
1. Fork this repository
2. Import to Replit
3. Add environment variables in Secrets
4. Deploy using Replit's deployment feature

#### VPS Deployment
1. Clone repository on server
2. Install dependencies: `npm install`
3. Build application: `npm run build`
4. Start with PM2:
   ```bash
   npm install -g pm2
   pm2 start ecosystem.config.js
   ```

#### Domain Setup
1. Point domain to server IP
2. Update Google OAuth redirect URIs
3. Update CORS settings if needed

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify PostgreSQL is running
   - Check DATABASE_URL format
   - Ensure database exists

2. **Google OAuth Error**
   - Check redirect URIs match exactly
   - Verify client ID/secret are correct
   - Enable required APIs in Google Cloud

3. **Email Not Sending**
   - Verify SendGrid API key is valid
   - Check sender email is verified
   - For Gmail: ensure app password (not regular password)

4. **Admin Access Issues**
   - Verify user role is set to 'admin' in database
   - Check session is active
   - Clear browser cache/cookies

### Database Reset

If you need to reset the database:
```bash
# Drop and recreate database
dropdb learnherefree
createdb learnherefree

# Push schema again
npm run db:push
```

## Security Notes

- Never commit `.env` file to version control
- Use strong session secrets in production
- Enable HTTPS for production deployments
- Regularly update dependencies
- Monitor email quota limits

## Performance Tips

- Use CDN for static assets
- Enable gzip compression
- Optimize images and videos
- Monitor database query performance
- Implement caching strategies

For additional support, refer to the main README.md file.