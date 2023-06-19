const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { books, getBookByISBN, setBookReview } = require('./booksdb');
const authenticateToken = require('./middleware');

const users = [
  {
    "username": "user1",
    "password": "password1",
    "username": "Ali",
    "password": "password1"

}
];

const authenticated = express.Router();

// User registration
// User registration
authenticated.post("/register", (req, res) => {
  let { username, password } = req.body;
  
  if(!username || !password){
      return res.status(400).json({ message: "Username and password are required." });
  }

  let user = users.find(user => user.username === username);
  if(user){
      return res.status(400).json({ message: "Username already exists." });
  }

  users.push({username, password});
  res.status(201).json({ message: "User registered successfully." });
});


// User login
// User login
authenticated.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required." });
  }

  const user = users.find(user => user.username === username);

  if (!user) {
      return res.status(401).json({ message: "Invalid username or password." });
  }

  // Assuming passwords are saved in plain text. 
  // If they are hashed, you would need to use bcrypt.compare
  if(user.password !== password) {
      return res.status(401).json({ message: "Invalid username or password." });
  }

  // The user is authenticated, create and send the token
  const token = jwt.sign({ username: user.username }, 'secretKey');
  res.json({ message: "Logged in successfully.", token });
});



// Route for adding or modifying a book review
authenticated.post("/review/:isbn", authenticateToken, (req, res) => {
  const { review } = req.body;
  const { isbn } = req.params;
  const { username } = req.user;

  const result = setBookReview(isbn, username, review);
  
  if (!result) {
    return res.status(404).send('Book not found');
  }

  res.status(200).json({ message: "Review added successfully." });
});

authenticated.delete("/auth/review/:isbn", authenticateToken, (req, res) => {
  // Extract ISBN from the request parameters
  const { isbn } = req.params;

  // Extract the username from the JWT
  const { username } = req.user;

  // Use the `deleteBookReview` function
  const result = deleteBookReview(isbn, username);

  if (!result) {
    // If the review was not found or could not be deleted, return an error
    return res.status(404).json({ message: "Review not found or could not be deleted" });
  }

  // If everything went well, return a success message
  return res.json({ message: "Review deleted successfully" });
});

module.exports = {
    users,
    authenticated,
};
