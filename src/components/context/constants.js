// config.js
// import { URL } from '@env';

// const config = {
//   URL: 'http://Prod-env.eba-tabt2pxm.ap-south-1.elasticbeanstalk.com', // Provide a default value if URL is not defined
//   // URL: 'http://uat-env.eba-epp52dpv.ap-south-1.elasticbeanstalk.com', // Provide a default value if URL is not defined
// };
const config = {
  URL: '/api',  // Proxying all requests through Netlify with '/api' prefix
};

export default config;
