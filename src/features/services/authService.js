// import axios from 'axios';

// const API_URL = 'https://rio-backender.org.kg/lorby/authentication/' ;

// const login = async (credentials) => {
//   const response = await axios.post(`${API_URL}login/`, credentials, {
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       'X-CSRFToken': 'SPcEswKMTOLE0rsMU7L4OaRR2NFLH8z1xzLpv32CvINsRc1E2RgpzlEL64O6yCRh',
//     },
//   });
//   return response.data;
// };

// const register = async (userInfo) => {
//   const response = await axios.post(`${API_URL}register/`, userInfo, {
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       'X-CSRFToken': 'SPcEswKMTOLE0rsMU7L4OaRR2NFLH8z1xzLpv32CvINsRc1E2RgpzlEL64O6yCRh',
//     },
//   });
//   return response.data;
// };

// const confirmEmail = async (confirmationCode) => {
//   const response = await axios.post(`${API_URL}email-confirm/`, { code: confirmationCode }, {
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       'X-CSRFToken': 'SPcEswKMTOLE0rsMU7L4OaRR2NFLH8z1xzLpv32CvINsRc1E2RgpzlEL64O6yCRh',
//     },
//   });
//   return response.data;
// };

// const refreshToken = async (refreshToken) => {
//   const response = await axios.post(`${API_URL}login/refresh/`, { refresh: refreshToken }, {
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       'X-CSRFToken': 'SPcEswKMTOLE0rsMU7L4OaRR2NFLH8z1xzLpv32CvINsRc1E2RgpzlEL64O6yCRh',
//     },
//   });
//   return response.data;
// };

// const logout = async (refreshToken) => {
//   const response = await axios.post(`${API_URL}logout/`, { refresh_token: refreshToken }, {
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       'X-CSRFToken': 'SPcEswKMTOLE0rsMU7L4OaRR2NFLH8z1xzLpv32CvINsRc1E2RgpzlEL64O6yCRh',
//     },
//   });
//   return response.data;
// };

// const resendConfirmationCode = async (email) => {
//   const response = await axios.post(`${API_URL}resend-confirmation-code/`, { email }, {
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       'X-CSRFToken': 'SPcEswKMTOLE0rsMU7L4OaRR2NFLH8z1xzLpv32CvINsRc1E2RgpzlEL64O6yCRh',
//     },
//   });
//   return response.data;
// };

// export default {
//   login,
//   register,
//   confirmEmail,
//   refreshToken,
//   logout,
//   resendConfirmationCode,
// };


import axios from 'axios';

const API_URL = 'https://rio-backender.org.kg/lorby/authentication/';

const handleResponse = async (request) => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 200 range
      console.error('Error response:', error.response.data);
      throw new Error(`Error: ${error.response.status} - ${error.response.data}`);
    } else if (error.request) {
      // Request was made but no response was received
      console.error('Error request:', error.request);
      throw new Error('No response received from server');
    } else {
      // Something happened in setting up the request
      console.error('Error message:', error.message);
      throw new Error(error.message);
    }
  }
};

const login = (credentials) => {
  return handleResponse(
    axios.post(`${API_URL}login/`, credentials, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': 'SPcEswKMTOLE0rsMU7L4OaRR2NFLH8z1xzLpv32CvINsRc1E2RgpzlEL64O6yCRh',
      },
    })
  );
};

const register = (userInfo) => {
  return handleResponse(
    axios.post(`${API_URL}register/`, userInfo, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': 'SPcEswKMTOLE0rsMU7L4OaRR2NFLH8z1xzLpv32CvINsRc1E2RgpzlEL64O6yCRh',
      },
    })
  );
};

const confirmEmail = (confirmationCode) => {
  return handleResponse(
    axios.post(`${API_URL}email-confirm/`, { code: confirmationCode }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': 'SPcEswKMTOLE0rsMU7L4OaRR2NFLH8z1xzLpv32CvINsRc1E2RgpzlEL64O6yCRh',
      },
    })
  );
};

const refreshToken = (refreshToken) => {
  return handleResponse(
    axios.post(`${API_URL}login/refresh/`, { refresh: refreshToken }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': 'SPcEswKMTOLE0rsMU7L4OaRR2NFLH8z1xzLpv32CvINsRc1E2RgpzlEL64O6yCRh',
      },
    })
  );
};

const logout = (refreshToken) => {
  return handleResponse(
    axios.post(`${API_URL}logout/`, { refresh_token: refreshToken }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': 'SPcEswKMTOLE0rsMU7L4OaRR2NFLH8z1xzLpv32CvINsRc1E2RgpzlEL64O6yCRh',
      },
    })
  );
};

const resendConfirmationCode = (email) => {
  return handleResponse(
    axios.post(`${API_URL}resend-confirmation-code/`, { email }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': 'SPcEswKMTOLE0rsMU7L4OaRR2NFLH8z1xzLpv32CvINsRc1E2RgpzlEL64O6yCRh',
      },
    })
  );
};

export default {
  login,
  register,
  confirmEmail,
  refreshToken,
  logout,
  resendConfirmationCode,
};