const { env } = require('./env');

const BASE_URL = env.BASE_URL;

const URLS = {
  BASE:      BASE_URL,
  BOOK_STORE: `${BASE_URL}/books`,
  LOGIN:      `${BASE_URL}/login`,
  PROFILE:    `${BASE_URL}/profile`,
};

const CREDENTIALS = {
  USERNAME: env.USERNAME,
  PASSWORD: env.PASSWORD,
};

const BOOK = {
  SEARCH_TERM: 'Learning JavaScript Design Patterns',
  TITLE: 'Learning JavaScript Design Patterns',
  LINK_NAME: 'Learning JavaScript Design Patterns',
  AUTHOR: 'Addy Osmani',
  PUBLISHER: "O'Reilly Media",
};
const OUTPUT_FILES = {
  BOOK_DETAILS: 'Raksh_books/book-details.txt',
};

module.exports = { URLS, CREDENTIALS, BOOK, OUTPUT_FILES };
