function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let count = 0;
  for (let i = 0; i < books.length; i++) {
    let borrowedCount = books[i].borrows.filter(
      (book) => book.returned === false
    );
    if (borrowedCount.length > 0) count++;
  }
  return count;
}

function getMostCommonGenres(books) {
  let result = books.reduce((bookGenre, book) => {
    if (bookGenre[book.genre]) {
      bookGenre[book.genre]++;
    } else {
      bookGenre[book.genre] = 1;
    } 
    return bookGenre;
  }, {});
  let bookGenreArray = getBookGenreArray(result);
 
  bookGenreArray = bookGenreArray.sort((bookOne, bookTwo) => bookOne.count < bookTwo.count ? 1 : -1)
  console.log(bookGenreArray)
  return bookGenreArray.splice(0,5)
}

function getBookGenreArray(bookGenre) {
  let bookGenreArray = [];
  Object.keys(bookGenre).forEach((genre) => {
    bookGenreArray.push({ name: genre, count: bookGenre[genre] });
  });
  return bookGenreArray
} 

function getMostPopularBooks(books) {
  let result = books.reduce((bookBorrows, book) => {
    bookBorrows[book.title] = book.borrows.length
    
    return bookBorrows;
  }, {});
  let popBooksArray = []
  Object.keys(result).forEach((bookTitle) => {
    popBooksArray.push({name: bookTitle, count: result[bookTitle]})
  })
  
  popBooksArray = popBooksArray.sort((book1, book2) => book1.count < book2.count ? 1 : -1)
  return popBooksArray.splice(0,5)
}

function getMostPopularAuthors(books, authors) {
  let popularAuthors = [];
  for(let i = 0; i < authors.length; i++) {
    let authorsBooks = books.filter((book) => book.authorId === authors[i].id);
    let borrowCount = 0;
    for (let j = 0; j < authorsBooks.length; j++) {
       borrowCount += authorsBooks[j].borrows.length;
    }
    
    popularAuthors.push(
      {
        name: `${authors[i].name.first} ${authors[i].name.last}`,
        count: borrowCount
      }
    )
  }
  
  popularAuthors = popularAuthors.sort((author1, author2) => author1.count < author2.count ? 1 : -1)
  return popularAuthors.splice(0,5)
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
