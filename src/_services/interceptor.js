const API_URL = process.env.REACT_APP_API_URL;

export function setupAxios(axios) {
    axios.defaults.headers.Accept = 'application/json'
    axios.interceptors.request.use((config)=> {
        config.withCredentials = true
        return config;
      }, function (error) {
        return Promise.reject(error);
      });
    axios.interceptors.response.use(function (response) {
        return response;
      }, async function (err) {
        const originalConfig = err.config;
        if(err.response.status === 403 &&err.response.data.message ==='session expired'){
          window.location = '/login';
          localStorage.removeItem('isLogedIn')
        }
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
            await axios.get(`${API_URL}/auth/refreshToken_cookie`)
            return axios.request(originalConfig);
          } catch (_error) {
            console.log(_error,'here');
            return Promise.reject(_error);
          }
      }
    });
  }