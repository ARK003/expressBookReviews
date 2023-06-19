let books = [
  {
    id: 3,
    author: "Dante Alighieri",
    title: "The Divine Comedy",
    isbn: "123",
    reviews: [
    {
      rating: 4.5,
      comment: "A masterpiece of literature",
    },
  ]
  },
  {
    id: 4,
    author: "Unknown",
    title: "The Epic Of Gilgamesh",
    isbn: "124",
    reviews: {},
  },
  {
    id: 5,
    author: "Unknown",
    title: "The Book Of Job",
    isbn: "125",
    reviews: {},
  },
  {
    id: 6,
    author: "Unknown",
    title: "One Thousand and One Nights",
    isbn: "126",
    reviews: {},
  },
  {
    id: 7,
    author: "Unknown",
    title: "Njál's Saga",
    isbn: "127",
    reviews: {},
  },
  {
    id: 8,
    author: "Jane Austen",
    title: "Pride and Prejudice",
    isbn: "128",
    reviews: {},
  },
  {
    id: 9,
    author: "Honoré de Balzac",
    title: "Le Père Goriot",
    isbn: "129",
    reviews: {},
  },
  {
    id: 10,
    author: "Samuel Beckett",
    title: "Molloy, Malone Dies, The Unnamable, the trilogy",
    isbn: "130",
    reviews: {},
  },
];

function getBookByISBN(isbn) {
  return books.find((book) => book.isbn === isbn);
}

// booksdb.js

function setBookReview(isbn, username, review) {
  // Find the book
  const book = books.find((book) => book.isbn === isbn);

  if (!book) {
    return false;
  }

  // Check if the user already has a review
  const userReview = book.reviews.find((rev) => rev.username === username);

  if (userReview) {
    // Update the existing review
    userReview.review = review;
  } else {
    // Add a new review
    book.reviews.push({ username, review });
  }

  return true;
}

// booksdb.js

function deleteBookReview(isbn, username) {
  // Find the book
  const book = books.find(book => book.isbn === isbn);

  if (!book || !book.reviews) {
    return false;
  }

  // Filter out the user's review
  const userReviewIndex = book.reviews.findIndex(review => review.username === username);

  if (userReviewIndex === -1) {
    return false;
  }

  // Remove the review
  book.reviews.splice(userReviewIndex, 1);
  
  return true;
}

module.exports = {
  books,
  getBookByISBN,
  setBookReview,
  deleteBookReview
};
