const tokenService = require("../services/tokenServices");

exports.generateToken = async (req, res) => {
  try {
    const response = await tokenService.generateTokenService(req.body);
    res.status(201).json(response);

  } catch (error) {
    console.error("Token Controller Error:", error);

    if (error.status) {
      return res.status(error.status).json({ message: error.message });
    }

    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        message: "Duplicate entry",
        field,
        value: error.keyValue[field]
      });
    }

    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};


exports.getMRID = async (req, res) => {
  try {
    const getMrid = await Token.findOne().sort({ createdAt: -1 }).select('mrid');
    if (!getMrid) {
      return res.status(404).json({
        success: false,
        message: "No MRID found",
      });
    }
    res.status(200).json({
      success: true,
      data: getMrid,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};