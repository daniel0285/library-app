const libraryPage = document.getElementById("libraryPage");
const bookContainer = document.getElementById("book-container");

const bookForm = document.getElementById("bookForm");

libraryPage.addEventListener("click", (e) => {
  if (e.target.id === "addBookBtn") {
    addBookModal.showModal();
  }
  if (e.target.id === "submitBook") {
    console.log(e.target.id);
  }
});

bookForm.addEventListener("submit", function (e) {
  e.preventDefault();
  getInputData(e.target);
});

const library = [];

function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

function getInputData(form) {
  const formData = new FormData(form);
  const book = Object.fromEntries(formData);

  addBookToLibrary(book.title, book.author, book.pages, book.status);
  addBookModal.close();
  bookForm.reset();
  showAllBooks();
}

const addBookToLibrary = (title, author, pages, readStatus) => {
  const newBook = new Book(title, author, pages, readStatus);
  library.push(newBook);
};

const showAllBooks = () => {
  bookContainer.innerHTML = "";

  for (const [i, book] of library.entries()) {
    const bookContainer = document.getElementById("book-container");
    const bookFragment = document.createDocumentFragment();
    const bookItem = document.createElement("article");

    bookItem.classList.add("book-item");
    bookItem.innerHTML = `<h2>${book.title}</h2>
                        <h3>${book.author}</h3>
                        <p>${book.pages}</p>
                        <button>${book.readStatus}</button>
                        <button id="${i}">Delete</button>`;

    bookFragment.appendChild(bookItem);
    bookContainer.appendChild(bookFragment);
  }
};

showAllBooks();
