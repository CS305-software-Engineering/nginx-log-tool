import axios from 'axios';

const baseURL = 'https://nginx-log-tool.herokuapp.com/wapi/';


const  axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 20000,
	headers: {
		Authorization: localStorage.getItem('access_token')
			? 'Bearer ' + localStorage.getItem('access_token')
			: null,
		'Content-Type': 'application/json',
		accept: 'application/json',
	}, 
});

// axios.interceptors.request.use(
// 	function(successfulReq) {
	  
// 		return successfulReq;
// 	}, 
// 	function(error) {
// 	  return Promise.reject(error);
// 	}
//   );


  // Response interceptor for API calls
  axiosInstance.interceptors.response.use((response) => {
	  console.log('axios',response)
	return response
  }, async function (error) {
	const originalRequest = error.config;
	console.log("axIOS" , error.response)
	if (error.response.error) {
		axiosInstance
		.post('refresh_token')
		.then((response) => {
			localStorage.setItem('access_token', response.data.token);

			axiosInstance.defaults.headers['Authorization'] =
				'Bearer ' + response.data.token;
			originalRequest.headers['Authorization'] =
				'Bearer ' + response.data.token;
			return axiosInstance(originalRequest);
		})
		.catch((err) => {
			console.log(err);
		});
	}
	return Promise.reject(error);
  });

  export default axiosInstance;