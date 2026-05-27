const axios = require("axios");

exports.chatInterview = async (req, res) => {

  try {

    const { messages } = req.body;

    if (!messages) {

      return res.status(400).json({
        message: "Messages are required",
      });
    }

    const systemPrompt = `
    You are a professional software engineering interviewer.

    Your task:
    - Conduct realistic technical interviews
    - Ask follow-up questions
    - Evaluate answers naturally
    - Keep responses conversational
    - Ask ONE question at a time
    - Be professional and encouraging
    `;

    const formattedMessages = [

      {
        role: "system",
        content: systemPrompt,
      },

      ...messages.map((msg) => ({

        role:
          msg.role === "ai"
            ? "assistant"
            : "user",

        content: msg.text,
      })),
    ];

    const response = await axios.post(

      "https://openrouter.ai/api/v1/chat/completions",

      {
        model: "deepseek/deepseek-chat",

        messages: formattedMessages,
      },

      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiMessage =
      response.data.choices[0].message.content;

    res.status(200).json({
      reply: aiMessage,
    });

  } catch (error) {

    console.log(
      "Interview Chat Error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      message: "Interview AI failed",
    });
  }
};