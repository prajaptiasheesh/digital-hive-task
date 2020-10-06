module.exports = {
    development: {
      port: process.env.PORT || 3000,
      db: process.env.MONGODB_URI,
      stripeSecretKey: process.env.STRIPE_SECRET_KEY,
      stripePublicKey: process.env.STRIPE_PUBLIC_KEY,
      stripeClientId: process.env.STRIPE_CLIENT_ID,
      server_uri: process.env.SERVER_URI,
      sms_api_key: process.env.SMS_API_KEY,
      host: process.env.HOST_URL,
      admin_share: process.env.ADMIN_SHARE,
      admin_email: process.env.ADMIN_EMAIL,
      admin_password: process.env.ADMIN_PASSWORD,
      mail: {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: true,
        user: process.env.MAIL_USER,
        password: process.env.MAIL_PASSWORD,
        from: process.env.MAIL_FROM,
        preview: false,
        send: true
      }
    },
    staging: {
      port: process.env.PORT || 3001,
      db: process.env.MONGODB_URI || `mongodb+srv://interviewee@cluster0.kycep.mongodb.net/machine_test?retryWrites=true&w=majority`,
      host: process.env.HOST_URL || 'https://localhost:3000',
      mail: {
        host: process.env.MAIL_HOST || 'smtp.gmail.com',
        port: process.env.MAIL_PORT || 587,
        secure: false,
        preview: false,
        send: true,
        tls: true,
      }
    },
    production: {
      port: process.env.PORT || 3000,
      db: process.env.MONGODB_URI,
      stripeSecretKey: process.env.STRIPE_SECRET_KEY,
      stripePublicKey: process.env.STRIPE_PUBLIC_KEY,
      stripeClientId: process.env.STRIPE_CLIENT_ID,
      admin_share: process.env.ADMIN_SHARE,
      server_uri: process.env.SERVER_URI,
      sms_api_key: process.env.SMS_API_KEY,
      host: process.env.HOST_URL,
      mail: {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT || 465,
        secure: false,
        user: process.env.MAIL_USER,
        password: process.env.MAIL_PASSWORD,
        from: process.env.MAIL_FROM,
        preview: false,
        send: true,
        tls: true,
      }
    }
  };
  