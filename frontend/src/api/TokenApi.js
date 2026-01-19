import { getData, postData } from "@/lib/api"
import { TokenByMRID, Token, TokenSummary } from "./endpoint"

export const addToken = async (values) => {
    const response = await postData(Token, values)
    return response?.data
}

export const getTokenByMRID = async (mrid) => {
    const res = await getData(`${TokenByMRID}/${mrid}`);
    return res?.data;
};

export const getTokensByDate = async (startDate, endDate) => {
    const res = await getData(`${TokenSummary}?startDate=${startDate}&endDate=${endDate}`);
    console.log("API Response", res);
    return res;
};
  