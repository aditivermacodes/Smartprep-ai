const Interview =
  require("../models/Interview");

exports.getHistory = async (req, res) => {

  try {

    const history =
      await Interview.find({
        user: req.user,
      }).sort({ createdAt: -1 });

    res.status(200).json(history);

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch history",
    });
  }
};