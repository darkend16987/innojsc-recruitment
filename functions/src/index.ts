// functions/src/index.ts
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';

admin.initializeApp();

// Configure email transport

// Bỏ qua Option 1 (Gmail)
/*
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().email.user,
    pass: functions.config().email.password,
  },
});
*/

// Option 2: Sử dụng SMTP của nhà cung cấp dịch vụ email bất kỳ (InnoJSC)
// Bạn phải cấu hình các biến này qua Firebase CLI (xem Bước 2)
const transporter = nodemailer.createTransport({
  host: functions.config().smtp.host,     // 'mail90162.maychuemail.com'
  port: functions.config().smtp.port,     // '465'
  // Dòng này sẽ tự động là TRUE nếu port là 465 (đúng như cấu hình của bạn)
  secure: functions.config().smtp.port == 465, 
  auth: {
    user: functions.config().email.user,
    pass: functions.config().email.password,
  },
  // Thêm tùy chọn TLS nếu cần thiết
  tls: {
    rejectUnauthorized: false
  }
});

/**
 * Cloud Function triggered when a new application is created
 * Sends notification email to HR
 */
export const onApplicationCreated = functions
  .region('asia-southeast1') // Change to your preferred region
  .firestore.document('applications/{applicationId}')
  .onCreate(async (snapshot, context) => {
    const application = snapshot.data();
    const applicationId = context.params.applicationId;

    console.log('New application received:', applicationId);

    // Fetch job details
    const jobRef = admin.firestore().collection('jobs').doc(application.jobId);
    const jobDoc = await jobRef.get();
    const jobData = jobDoc.data();

    if (!jobData) {
      console.error('Job not found:', application.jobId);
      return null;
    }

    // Prepare email content
    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
          .info-row { margin: 15px 0; padding: 10px; background: white; border-radius: 6px; }
          .label { font-weight: bold; color: #4b5563; display: inline-block; width: 150px; }
          .value { color: #1f2937; }
          .button { display: inline-block; padding: 12px 24px; background: #3b82f6; color: white; text-decoration: none; border-radius: 6px; margin-top: 20px; }
          .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎯 Ứng tuyển mới - InnoJSC</h1>
          </div>
          <div class="content">
            <p>Xin chào HR Team,</p>
            <p>Có một ứng viên mới đã nộp đơn ứng tuyển vào vị trí:</p>
            
            <h2 style="color: #3b82f6; margin: 20px 0;">${jobData.title}</h2>
            
            <div class="info-row">
              <span class="label">👤 Họ tên:</span>
              <span class="value">${application.applicantName}</span>
            </div>
            
            <div class="info-row">
              <span class="label">📧 Email:</span>
              <span class="value">${application.applicantEmail}</span>
            </div>
            
            <div class="info-row">
              <span class="label">📱 Điện thoại:</span>
              <span class="value">${application.applicantPhone}</span>
            </div>
            
            <div class="info-row">
              <span class="label">🏢 Phòng ban:</span>
              <span class="value">${jobData.department}</span>
            </div>
            
            <div class="info-row">
              <span class="label">📍 Địa điểm:</span>
              <span class="value">${jobData.location}</span>
            </div>
            
            <div class="info-row">
              <span class="label">📅 Ngày ứng tuyển:</span>
              <span class="value">${new Date(application.appliedAt).toLocaleString('vi-VN')}</span>
            </div>
            
            <div style="margin-top: 20px;">
              <a href="${application.cvUrl}" class="button">📄 Tải CV xuống</a>
            </div>
            
            <div class="footer">
              <p>Email này được gửi tự động từ hệ thống tuyển dụng InnoJSC</p>
              <p>© ${new Date().getFullYear()} InnoJSC. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Email options
    const mailOptions = {
      from: `"InnoJSC Recruitment" <${functions.config().email.user}>`,
      to: 'ahr@innojsc.com',
      subject: `🔔 Ứng tuyển mới: ${application.applicantName} - ${jobData.title}`,
      html: emailContent,
      // Add CC if needed
      // cc: 'hr2@innojsc.com',
    };

    // Send email
    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully to ahr@innojsc.com');

      // Update application with email sent status (optional)
      await snapshot.ref.update({
        emailSent: true,
        emailSentAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      return { success: true };
    } catch (error) {
      console.error('Error sending email:', error);
      
      // Update application with error status (optional)
      await snapshot.ref.update({
        emailSent: false,
        emailError: error instanceof Error ? error.message : 'Unknown error',
      });

      throw error;
    }
  });

/**
 * Optional: Callable function to resend email manually
 */
export const resendApplicationEmail = functions
  .region('asia-southeast1')
  .https.onCall(async (data, context) => {
    // Check if user is authenticated and has admin role
    // This is just a placeholder - implement proper authentication
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'User must be authenticated to call this function.'
      );
    }

    const { applicationId } = data;

    try {
      const applicationRef = admin.firestore().collection('applications').doc(applicationId);
      const applicationDoc = await applicationRef.get();

      if (!applicationDoc.exists) {
        throw new functions.https.HttpsError('not-found', 'Application not found');
      }

      // Trigger the same email sending logic here
      // (You can extract the email logic into a separate function and reuse it)

      return { success: true, message: 'Email resent successfully' };
    } catch (error) {
      console.error('Error resending email:', error);
      throw new functions.https.HttpsError('internal', 'Failed to resend email');
    }
  });
