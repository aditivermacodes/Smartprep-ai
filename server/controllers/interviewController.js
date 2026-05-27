const axios = require("axios");
const InterviewSession = require("../models/InterviewSession");

exports.chatInterview = async (req, res) => {

  try {

    const { messages } = req.body;

    if (!messages) {

      return res.status(400).json({
        message: "Messages are required",
      });
    }

    const systemPrompt = `
        You are an expert software engineering interviewer.

        Your responsibilities:

        1. Conduct realistic technical interviews
        2. Ask one question at a time
        3. Evaluate the candidate's answers
        4. Give professional feedback
        5. Continue the interview naturally

        For EVERY user answer:

        Provide:

        Technical Accuracy Score: X/10
        Communication Score: X/10
        Confidence Score: X/10

        Then give:
        - strengths
        - weaknesses
        - improvement suggestions

        Finally:
        - ask the next interview question

        Keep responses conversational and professional.
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

    const updatedConversation = [
        ...messages,
        {
            role: "ai",
            text: aiMessage,
            time: new Date(),
        },
    ];

    await InterviewSession.create({
        user: req.user,
        messages: updatedConversation,
    });

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

exports.getSessions = async (req, res) => {

  try {

    const sessions =
      await InterviewSession.find({

        user: req.user,

      }).sort({ createdAt: -1 });

    res.status(200).json(sessions);

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch sessions",
    });
  }
};