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
            mrid: new RegExp(`${currentYear}$`)
        }).sort({ createdAt: -1 });

        const lastNumber = lastMRID
            ? parseInt(lastMRID.mrid.split("-")[0])
            : 0;

        mrid = `${String(lastNumber + 1).padStart(2, "0")}-${currentYear}`;
    }

    const startOfYear = new Date(currentYear, 0, 1);
    const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59, 999);

    const lastTokenOfYear = await Token.findOne({
        createdAt: { $gte: startOfYear, $lte: endOfYear }
    }).sort({ tokenNo: -1 });

    const tokenNo = lastTokenOfYear ? lastTokenOfYear.tokenNo + 1 : 1;

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
