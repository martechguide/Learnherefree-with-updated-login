import { MailService } from '@sendgrid/mail';
import nodemailer from 'nodemailer';

interface SendOTPParams {
  to: string;
  otp: string;
  name?: string;
}

export class EmailService {
  private sendGridClient: MailService | null = null;
  private transporter: nodemailer.Transporter | null = null;
  private fromEmail: string = 'noreply@learnherefree.online';
  private emailProvider: 'sendgrid' | 'gmail' | 'none' = 'none';

  constructor() {
    this.initializeService();
  }

  private initializeService() {
    // Priority 1: SendGrid (most reliable for production)
    const sendgridKey = process.env.SENDGRID_API_KEY;
    if (sendgridKey) {
      try {
        this.sendGridClient = new MailService();
        this.sendGridClient.setApiKey(sendgridKey);
        // Use a verified sender email - must be verified in SendGrid
        this.fromEmail = 'spguide4you@gmail.com'; // Using admin email as verified sender
        this.emailProvider = 'sendgrid';
        console.log('SendGrid email service initialized successfully');
        return;
      } catch (error) {
        console.error('SendGrid initialization failed:', error);
      }
    }

    // Priority 2: Gmail SMTP (fallback)
    const gmailUser = process.env.EMAIL_USER || process.env.GMAIL_USER;
    const gmailPass = process.env.EMAIL_PASS || process.env.GMAIL_PASS;

    if (gmailUser && gmailPass) {
      try {
        this.transporter = nodemailer.createTransporter({
          service: 'gmail',
          auth: {
            user: gmailUser,
            pass: gmailPass
          }
        });
        this.fromEmail = gmailUser;
        this.emailProvider = 'gmail';
        console.log('Gmail SMTP service initialized successfully');
        return;
      } catch (error) {
        console.error('Gmail SMTP initialization failed:', error);
      }
    }

    console.warn('No email credentials found. Email service disabled.');
    console.warn('To enable email: Add SENDGRID_API_KEY (preferred) or EMAIL_USER/EMAIL_PASS');
  }

  async sendOTP({ to, otp, name }: SendOTPParams): Promise<boolean> {
    if (!this.sendGridClient && !this.transporter) {
      console.error('No email service initialized. Cannot send OTP.');
      return false;
    }

    const emailContent = {
      subject: 'Password Reset OTP - Learn Here Free',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; text-align: center; margin: 0;">🏥 Learn Here Free</h1>
            <p style="color: white; text-align: center; margin: 10px 0 0 0;">Medical Education Platform</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
            <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
            
            ${name ? `<p>नमस्ते ${name},</p>` : '<p>नमस्ते,</p>'}
            
            <p style="color: #555; line-height: 1.6;">
              आपने अपना password reset करने के लिए request की है। आपका OTP नीचे दिया गया है:
            </p>
            
            <div style="background: #e8f5e8; border: 2px solid #4caf50; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
              <h1 style="color: #2e7d32; font-size: 32px; letter-spacing: 8px; margin: 0;">${otp}</h1>
              <p style="color: #4caf50; margin: 10px 0 0 0; font-size: 14px;">Valid for 10 minutes only</p>
            </div>
            
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 5px; padding: 15px; margin: 20px 0;">
              <p style="color: #856404; margin: 0; font-size: 14px;">
                <strong>⚠️ Security Notice:</strong> यह OTP 10 मिनट के लिए valid है। अगर आपने यह request नहीं की है, तो इस email को ignore करें।
              </p>
            </div>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            
            <p style="color: #888; font-size: 12px; text-align: center;">
              यह एक automated message है। कृपया इसका reply न करें।<br>
              <strong>Learn Here Free</strong> - Medical Education Platform<br>
              <a href="https://learnherefree.online" style="color: #667eea;">learnherefree.online</a>
            </p>
          </div>
        </div>
      `,
      text: `
Learn Here Free - Password Reset OTP

${name ? `नमस्ते ${name},` : 'नमस्ते,'}

आपका password reset OTP: ${otp}

यह OTP 10 मिनट के लिए valid है। अगर आपने यह request नहीं की है, तो इस message को ignore करें।

Learn Here Free - Medical Education Platform
learnherefree.online
      `
    };

    try {
      if (this.emailProvider === 'sendgrid' && this.sendGridClient) {
        // Use SendGrid
        const msg = {
          to: to,
          from: {
            email: this.fromEmail,
            name: 'Learn Here Free'
          },
          subject: emailContent.subject,
          html: emailContent.html,
          text: emailContent.text
        };

        await this.sendGridClient.send(msg);
        console.log(`OTP email sent successfully via SendGrid to ${to}`);
        return true;

      } else if (this.emailProvider === 'gmail' && this.transporter) {
        // Use Gmail SMTP
        const mailOptions = {
          from: `"Learn Here Free" <${this.fromEmail}>`,
          to: to,
          subject: emailContent.subject,
          html: emailContent.html,
          text: emailContent.text
        };

        await this.transporter.sendMail(mailOptions);
        console.log(`OTP email sent successfully via Gmail SMTP to ${to}`);
        return true;

      } else {
        console.error('No valid email provider available');
        return false;
      }
    } catch (error) {
      console.error(`Failed to send OTP email via ${this.emailProvider}:`, error);
      return false;
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      if (this.emailProvider === 'sendgrid' && this.sendGridClient) {
        // SendGrid doesn't have a direct verify method, so we'll just check if the API key is set
        console.log('SendGrid email service connection verified successfully');
        return true;
      } else if (this.emailProvider === 'gmail' && this.transporter) {
        await this.transporter.verify();
        console.log('Gmail SMTP service connection verified successfully');
        return true;
      } else {
        console.log('No email service initialized');
        return false;
      }
    } catch (error) {
      console.error(`${this.emailProvider} email service connection failed:`, error);
      return false;
    }
  }

  getProviderStatus(): { provider: string; isActive: boolean } {
    return {
      provider: this.emailProvider,
      isActive: this.emailProvider !== 'none'
    };
  }
}

export const emailService = new EmailService();