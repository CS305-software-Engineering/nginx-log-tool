import axios from 'axios';

const baseURL = 'http://localhost:8001/wapi/';


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
	withCredentials: true

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
	//   console.log('axios',response)
	return response
  }, async function (error) {
	const originalRequest = error.config;
	// console.log("axIOS" , error.response)
	if(error.response.status == 401)
	{
		window.location.href = '/';
	}
	if (error.response.status === 403 &&  error.response.data.message === "JsonWebTokenError"){
		localStorage.removeItem('access_token');
		window.location.href ='/';

	}
	if(error.response.status === 403 && error.response.data.message === 'TokenExpiredError')  {
		console.log('This is interceptors')
		axiosInstance
		.post('refresh_token')
		.then((response) => {
			console.log("Intepceptor",response.data)
			if(!response.data.error){
			localStorage.setItem('access_token', response.data.token);
			axiosInstance.defaults.headers['Authorization'] =
				'Bearer ' + response.data.token;
			originalRequest.headers['Authorization'] =
				'Bearer ' + response.data.token;
			}
			
			return axiosInstance(originalRequest);
		})
		.catch((err) => {
			console.log(err);
		});
	}
	return Promise.reject(error);
  });

  export default axiosInstance;