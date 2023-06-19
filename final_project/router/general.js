const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');

public_users.post("/register", (req,res) => {
  return res.status(300).json({message: "Yet to be implemented"});
});

public_users.get('/', async function (req, res) {
  try {
    const response = await axios.get('http://localhost:5000/api/books');
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving books' });
  }
});

public_users.get('/isbn/:isbn',function (req, res) {
  let isbn = req.params.isbn;
  let book = books.getBookByISBN(isbn);
  res.status(200).json(book);
});

public_users.get('/author/:author',function (req, res) {
  let author = req.params.author;
  let authorBooks = books.books.filter((book) => book.author === author);
  res.status(200).json(authorBooks);
});

public_users.get('/title/:title', function (req, res) {
  let title = req.params.title;
  let booksByTitle = books.books.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
  res.status(200).json(booksByTitle);
});

public_users.get('/review/:isbn', function (req, res) {
  let isbn = req.params.isbn;
  let book = books.getBookByISBN(isbn);
  if (book && book.reviews) {
    res.status(200).json(book.reviews);
  } else {
    res.status(404).json({ message: "Book review not found" });
  }
});

module.exports.general = public_users;
