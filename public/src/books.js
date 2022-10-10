//It returns the author object that has the matching ID.
function findAuthorById(authors, id) {
  let matchAuthor = authors.find((author) => author.id === id);
  return matchAuthor;
}

//It returns the book object that has the matching ID.
function findBookById(books, id) {
  let matchBook = books.find((book) => book.id === id);
  return matchBook;
}

function partitionBooksByBorrowedStatus(books) {
  const booksOut = [];
  const booksReturned = [];
  const final = [];
  let result = books.forEach((book) => {
    const status = book.borrows;
    let checkedOut = status.some((checkedOut) => checkedOut.returned === false);
    if (checkedOut) {
      booksOut.push(book);
    } else {
      booksReturned.push(book);
    }
  });
  final.push(booksOut, booksReturned)
  return final;
}


function getBorrowersForBook(book, accounts) {
  const status = book.borrows.slice(0,10)
  return status.map((borrow) => {
    let account = accounts.find((a) => a.id === borrow.id);
    borrow = {
      ...borrow,
      ...account
    };
    return borrow
  })
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
