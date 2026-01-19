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


exports.getTokenByMRID = async (req, res) => {
  try {
    const { mrid } = req.params;
    const response = await tokenService.getTokenByMRIDService(mrid);
    res.status(200).json(response);
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getTokensByDate = async (req, res) => {
  try {
    const response = await tokenService.getTokensByDateService(req.query);
    res.status(200).json(response);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message
    });
  }
};
