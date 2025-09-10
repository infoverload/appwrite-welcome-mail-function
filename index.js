module.exports = async function (context) {
  // Parse the request payload
  const payload = context.req.body;
  const { userId, email } = payload;

  if (!userId || !email) {
    return context.res.json({
      success: false,
      message: "Missing userId or email"
    });
  }

  // Log the welcome email (in production, integrate with email service)
  console.log(`Welcome email would be sent to: ${email}`);

  // In production, integrate with an email services


  return context.res.json({
    success: true,
    message: `Welcome email sent to ${email}`
  });
};