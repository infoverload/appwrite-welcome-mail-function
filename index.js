const { Resend } = require('resend');

module.exports = async function (context) {
  const resend = new Resend(context.variables.RESEND_API_KEY);
  
  const { userId, email } = context.req.body;
  
  if (!userId || !email) {
    return context.res.json({
      success: false,
      message: "Missing required fields"
    });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Todo App <hello@todo.com>',
      to: [email],
      subject: 'Welcome to Todo App!',
      html: `
        <h1>Welcome to Todo App!</h1>
        <p>Thank you for signing up! We're excited to have you on board.</p>
        <p>With Todo App, you can:</p>
        <ul>
          <li>Create unlimited nested tasks</li>
          <li>Organize your projects efficiently</li>
          <li>Access your todos from anywhere</li>
        </ul>
      `
    });

    if (error) {
      throw error;
    }

    return context.res.json({
      success: true,
      message: 'Welcome email sent',
      messageId: data?.id
    });
  } catch (error) {
    console.error('Email send error:', error);
    return context.res.json({
      success: false,
      error: error.message
    }, 500);
  }
};