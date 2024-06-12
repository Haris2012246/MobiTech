const nodemailer = require('nodemailer');

require('dotenv').config();

// Check if environment variables are loaded correctly
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
  service: 'gmail', // Or your email service provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: subject,
    text: text
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const notifyUserProductDeleted = async (userEmail, productName) => {
  const subject = 'Product Deleted Notification';
  const text = `Dear ${user.name},

  Your product "${product.modelName}" has been deleted by the admin.
  
  Best regards,
  Your Team`;

  await sendEmail(userEmail, subject, text);
};

module.exports = { sendEmail, notifyUserProductDeleted };