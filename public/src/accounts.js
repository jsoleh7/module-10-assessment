//returns the account object that has the matching ID
function findAccountById(accounts, id) {
  let userMatch = accounts.find((user) => user.id === id);
  return userMatch;
}

//returns a sorted array of the provided account objects. The objects are sorted alphabetically by last name
function sortAccountsByLastName(accounts) {
  let sortedArray = accounts.sort((userOne, userTwo) =>
    userOne.name.last.toLowerCase() > userTwo.name.last.toLowerCase() ? 1 : -1
  );
  return sortedArray;
}

//returns a _number_ that represents the number of times the account's ID appears in any book's `borrows` array
function getTotalNumberOfBorrows(account, books) {
  let match = 0;
  for (let i = 0; i < books.length; i++) {
    let borrowedList = books[i].borrows.filter(
      (borrowed) => borrowed.id === account.id
    );
    if (borrowedList.length > 0) {
      match++;
    }
  }
  return match;
}

/*It returns an array of book objects, including author information, that represents all books _currently checked out_ by the given account. _Look carefully at the object below,_ as it's not just the book object; the author object is nested inside of it
 */
function getBooksPossessedByAccount(account, books, authors) {
  let newArray = [];
  const bookMatch = books.forEach((book) => {
   let borrowed = book.borrows
   if(borrowed.find((borrow) => borrow.id === account.id && borrow.returned === false)){
     newArray.push(book)
   }
  });
  newArray.forEach((book) => {
    let author = authors.find((author) => author.id === book.authorId)
  book.author = author
  })
  return newArray
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
