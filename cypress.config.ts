import {defineConfig} from 'cypress';

require('dotenv').config({path: '.env.stage'});

export default defineConfig({
  e2e: {
    baseUrl: process.env.REACT_APP_URL,
    chromeWebSecurity: false,
  },
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
});
