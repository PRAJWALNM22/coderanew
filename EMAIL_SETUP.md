# Email OTP Setup Guide

## Gmail Configuration for OTP Emails

### Step 1: Gmail Account Setup
1. Use an existing Gmail account or create a new one
2. Enable 2-Factor Authentication on your Gmail account

### Step 2: Generate App Password
1. Go to Google Account settings: https://myaccount.google.com/
2. Navigate to Security → 2-Step Verification
3. Scroll down to "App passwords"
4. Generate a new app password for "Mail"
5. Copy the 16-character password (remove spaces)

### Step 3: Environment Configuration
1. Copy `.env.example` to `.env`
2. Update the following variables:
   ```
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=your-16-character-app-password
   OTP_PORT=3001
   ```

### Step 4: Install Dependencies
```bash
npm install
```

### Step 5: Run Servers
```bash
# Run both OTP and chat servers
npm run dev-servers

# Or run individually
npm run otp-server  # Port 3001
npm run chat-server # Port 8080
```

### Step 6: Run Web Application
```bash
cd web
npm run dev  # Port 5173
```

## Testing OTP Flow
1. Navigate to signup page
2. Enter a valid email address
3. Fill in username and password
4. Click "Send OTP"
5. Check your email for the 6-digit code
6. Enter the OTP to complete registration

## Troubleshooting
- Ensure Gmail 2FA is enabled
- Use App Password, not regular Gmail password
- Check spam folder for OTP emails
- Verify .env file is in project root
- Ensure ports 3001 and 8080 are available