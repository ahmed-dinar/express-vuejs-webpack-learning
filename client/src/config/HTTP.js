//not using anymore, insted of progress, vue-spinner is used

// import axios from 'axios';
// import NProgress from 'nprogress';

// axios.interceptors.request.use( config => {
//   NProgress.start();
//   return config;
// }, err => {
//   NProgress.done();
//   NProgress.remove();
//   return Promise.reject(err);
// });

// axios.interceptors.response.use(response => {
//   NProgress.done();
//   NProgress.remove();
//   return response;
// }, error => {
//   NProgress.done();
//   NProgress.remove();
//   return Promise.reject(error);
// });

// export const HTTP = axios;