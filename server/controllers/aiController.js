const axios = require("axios");

exports.generateQuestions = async (req, res) => {

  try {

    const { resumeText } = req.body;

    if (!resumeText) {
      return res.status(400).json({
        message: "Resume text is required",
      });
    }

    const prompt = `
    You are an expert software engineering interviewer.

    Analyze the following resume carefully and generate:

    1. 5 HR interview questions
    2. 5 technical interview questions
    3. 5 project-based interview questions

    Keep the questions realistic, professional,
    and relevant to the candidate's skills.

    Format the response properly with headings.

    Resume:
    ${resumeText}
    `;

    const response = await axios.post(

      "https://openrouter.ai/api/v1/chat/completions",

      {
        model: "deepseek/deepseek-chat",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },

      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const questions =
      response?.data?.choices?.[0]?.message?.content;

    if (!questions) {

      return res.status(500).json({
        message: "No AI response received",
      });
    }

    res.status(200).json({
      questions,
    });

  } catch (error) {

    console.log(
      "OpenRouter Error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      message: "AI generation failed",
    });
  }
};