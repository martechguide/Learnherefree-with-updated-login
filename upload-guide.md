# Production Upload Guide

## Step 1: Stop Current Test App
Terminal में Ctrl+C press करें

## Step 2: Clear htdocs Directory  
```bash
rm -rf /home/learnherefree2025/htdocs/*
ls -la
```

## Step 3: Upload Production Files
CloudPanel File Manager में:
1. htdocs folder में जाएं
2. सभी test files delete करें
3. Production files upload करें:
   - dist/ (entire folder)
   - server/ (entire folder) 
   - shared/ (entire folder)
   - package.json (production version)
   - drizzle.config.ts
   - ecosystem.config.js

## Step 4: Setup Environment Variables
```bash
# Create .env file
cat > .env << 'EOF'
DATABASE_URL=postgresql://learnhereuser:Golu@91700@localhost:5432/learnherefreedb
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SESSION_SECRET=your_secure_session_secret_here_make_it_long_and_random
PORT=3000
NODE_ENV=production
EOF
```

## Step 5: Install Production Dependencies
```bash
npm install
```

## Step 6: Setup Database
```bash
npm run db:push
```

## Step 7: Start Production App
```bash
npm start
# या PM2 के साथ:
pm2 start ecosystem.config.js
```

## Quick Commands Summary:
```bash
# All in one sequence:
rm -rf *
# Upload files via File Manager
npm install
npm run db:push
npm start
```