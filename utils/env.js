require('dotenv').config();

/**

 * @param {string} key
 * @returns {string}
 */
function required(key) {
  const value = process.env[key];
  if (!value) {
    throw new Error("Missing required environment variable: " + key
    );
  }
  return value;
}

/**
 * @param {string} key
 * @param {string} defaultValue
 * @returns {string}
 */
function optional(key, defaultValue) {
  return process.env[key] || defaultValue;
}


const env = {
//ui
  USERNAME: required('DEMOQA_USERNAME'),
  PASSWORD: required('DEMOQA_PASSWORD'),


//api
  API_BASE_URL: required('API_BASE_URL'),
  REQRES_API_KEY: required('REQRES_API_KEY'),


  
  BASE_URL:  optional('BASE_URL',  'https://demoqa.com'),
  HEADLESS:  optional('HEADLESS',  'true') === 'true',
  SLOW_MO:   parseInt(optional('SLOW_MO', '0'), 10),
};

module.exports = { env };
