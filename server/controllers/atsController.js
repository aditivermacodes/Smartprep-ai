const axios = require("axios");
const fs = require("fs");
const pdfParse = require("pdf-parse");

// =============================
// TEXT ATS ANALYZER
// =============================

exports.analyzeResume = async (req, res) => {

  try {

    const { resumeText } = req.body;

    if (!resumeText) {

      return res.status(400).json({
        message: "Resume text is required",
      });
    }

    const prompt = `
You are an expert ATS (Applicant Tracking System) resume analyzer.

Analyze this resume and provide:

# ATS Resume Analysis

## ATS Score
Give a score out of 100.

## Strengths
Mention the resume strengths.

## Missing Keywords
Mention important missing technical keywords.

## Weaknesses
Mention resume weaknesses.

## Improvement Suggestions
Provide actionable suggestions.

## Recommended Skills
Suggest modern technical skills to learn.

Format the response beautifully using markdown.

Resume:
${resumeText}
`;

    const response = await axios.post(

      "https://openrouter.ai/api/v1/chat/completions",

      {
        model:
          "meta-llama/llama-3.1-8b-instruct",

        max_tokens: 1200,

        temperature: 0.5,

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

    const analysis =
      response.data.choices[0].message.content;

    res.status(200).json({
      analysis,
    });

  } catch (error) {

    console.log(
      "ATS Analysis Error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      message: "ATS analysis failed",
    });
  }
};

// =============================
// PDF ATS ANALYZER
// =============================

exports.analyzeResumePDF = async (req, res) => {

  try {

    if (!req.file) {

      return res.status(400).json({
        message: "Resume PDF required",
      });
    }

    // READ PDF

    const dataBuffer =
      fs.readFileSync(req.file.path);

    const pdfData =
      await pdfParse(dataBuffer);

    const resumeText =
      pdfData.text;

    // DELETE TEMP FILE

    fs.unlinkSync(req.file.path);

    // VALIDATE EXTRACTED TEXT

    if (!resumeText.trim()) {

      return res.status(400).json({
        message:
          "Could not extract text from PDF",
      });
    }

    // AI PROMPT

    const prompt = `
You are an expert ATS (Applicant Tracking System) resume analyzer.

Analyze this resume and provide:

# ATS Resume Analysis

## ATS Score
Give a score out of 100.

## Strengths
Mention the resume strengths.

## Missing Keywords
Mention important missing technical keywords.

## Weaknesses
Mention resume weaknesses.

## Improvement Suggestions
Provide actionable suggestions.

## Recommended Skills
Suggest modern technical skills to learn.

Format the response beautifully using markdown.

Resume:
${resumeText}
`;

    const response = await axios.post(

      "https://openrouter.ai/api/v1/chat/completions",

      {
        model:
          "meta-llama/llama-3.1-8b-instruct",

        max_tokens: 1200,

        temperature: 0.5,

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

    const analysis =
      response.data.choices[0].message.content;

    res.status(200).json({
      analysis,
    });

  } catch (error) {

    console.log(
      "PDF ATS Error:",
      error.response?.data || error.message
    );

    res.status(500).json({
      message: "PDF ATS analysis failed",
    });
  }
};