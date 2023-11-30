// services.js
import axios from 'axios';

const baseURL = 'https://databalk.crm.dynamics.com/api/data/v9.1/';

export const getDataverseData = async (accessToken) => {
  try {
    const response = await axios.get(baseURL + 'systemuser', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
//Test p[ush]
