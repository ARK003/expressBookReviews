const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const { books, getBookByISBN } = require('./router/booksdb');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.get('/api/books', (req, res) => {
  res.json(books.books);
});


app.use(
  '/customer',
  session({ secret: 'fingerprint_customer', resave: true, saveUninitialized: true })
);

app.use('/customer/auth', customer_routes); // Change this line
app.use('/', genl_routes);

app.use('/customer/auth/*', function auth(req, res, next) {
  // exclude register and login endpoints from the JWT check
  if(req.originalUrl === '/customer/auth/register' || req.originalUrl === '/customer/auth/login') return next();

  const accessToken = req.headers.authorization;

  if (!accessToken) {
    return res.status(401).send('Access token must be provided');
  }

  try {
    const decoded = jwt.verify(accessToken, 'secretKey');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).send('Invalid access token');
  }
});

app.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = getBookByISBN(isbn);
  if (book) {
    res.json(book);
  } else {
    res.status(404).send('Book not found');
  }
});

const PORT = 5000;

app.listen(PORT, () => console.log('Server is running'));
