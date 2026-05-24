const fs = require("fs");
const pdfParse = require("pdf-parse");

exports.uploadResume = async (req, res) => {

    try {

        const filePath = req.file.path;

        const dataBuffer = fs.readFileSync(filePath);

        const pdfData = await pdfParse(dataBuffer);

        const extractedText = pdfData.text;

        res.status(200).json({
            message: "Resume uploaded successfully",
            extractedText,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error uploading resume",
        });
    }
};