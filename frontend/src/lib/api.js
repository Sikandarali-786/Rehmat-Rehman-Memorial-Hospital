import axios from "axios";

const generateSignature = (data) => {
  return btoa(JSON.stringify(data));
};

export const getData = async (url, params = {}) => {
  try {
    const data = ""; // for signature
    const signature = generateSignature(data);
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const response = await axios.get(url, {
      params,
      headers: {
        "Project-Name": "Rehmat Rehman Hospital",
        Signature: signature,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    return response.data;
  } catch (e) {
    console.error("GET Error:", e);
    return { data: null };
  }
};


export const postData = async (url, body = {}) => {
  try {
    const signature = generateSignature(body);
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const response = await axios.post(url, body, {
      headers: {
        "Project-Name": "Rehmat Rehman Hospital",
        Signature: signature,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    return response.data;
  } catch (e) {
    console.error("POST Error:", e);
    return { data: null };
  }
};