const Token = require("../model/tokenModel");

exports.generateTokenService = async ({ patientName, phoneNumber }) => {
  if (!patientName || !phoneNumber) {
    throw {
      status: 400,
      message: "Patient Name and Phone Number are required"
    };
  }

  const currentYear = new Date().getFullYear();

  const existingPatient = await Token.findOne({ phoneNumber }).sort({ createdAt: -1 });

  let mrid;

  if (existingPatient) {
    mrid = existingPatient.mrid;
  } else {
    const lastMRID = await Token.findOne({
      mrid: new RegExp(`-${currentYear}$`)
    }).sort({ createdAt: -1 });

    const lastNumber = lastMRID
      ? parseInt(lastMRID.mrid.split("-")[0])
      : 0;

    mrid = `${String(lastNumber + 1).padStart(2, "0")}-${currentYear}`;
  }

  const lastToken = await Token.findOne().sort({ tokenNo: -1 });
  const tokenNo = lastToken ? lastToken.tokenNo + 1 : 1;

  const token = await Token.create({
    patientName,
    phoneNumber,
    mrid,
    tokenNo,
    estimatedTime: "20-30 Minutes"
  });

  return {
    success: true,
    data: {
      tokenNo: token.tokenNo,
      mrid: token.mrid,
      patientName: token.patientName,
      phoneNumber: token.phoneNumber,
      estimatedTime: token.estimatedTime,
      createdAt: token.createdAt
    }
  };
};


exports.getTokenByMRIDService = async (mrid) => {
  if (!mrid) {
    throw { status: 400, message: "MRID is required" };
  }
  try {
    const token = await Token.findOne({ mrid }).select('mrid patientName phoneNumber tokenNo createdAt');
    if (!token) {
      throw { status: 404, message: "No token found with this MRID" };
    }
    return {
      success: true,
      data: token
    };
  } catch (error) {
    throw { status: 500, message: "Server error", error: error.message };
  }
};

exports.getTokensByDateService = async (query) => {
  try {
    const { startDate, endDate } = query;
    if (!startDate || !endDate) {
      throw { status: 400, message: "Start Date and End Date are required" };
    }
    const tokens = await Token.find({
      createdAt: { $gte: startDate, $lte:endDate } 
    }).sort({ createdAt: 1 });
    return { success: true, data: tokens };
  } catch (error) {
    throw { status: 500, message: "Internal Server Error", error: error.message };
  }
};