const libraryPage = document.getElementById("libraryPage");
const bookContainer = document.getElementById("book-container");
const bookForm = document.getElementById("bookForm");

const library = [];

function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

libraryPage.addEventListener("click", (e) => {
  if (e.target.id === "addBookBtn") {
    addBookModal.showModal();
  }

  if (e.target.classList.contains("delete-btn")) {
    deleteBook(e.target.id);
  }

  if (e.target.classList.contains("status-btn")) {
    changeReadStatus(e);
  }
});

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getInputData(e.target);
});

const getInputData = (form) => {
  const formData = new FormData(form);
  const book = Object.fromEntries(formData);

  if (book.status === undefined) {
    book.status = "Not Read";
  } else {
    book.status = "Read";
  }

  addBookToLibrary(book.title, book.author, book.pages, book.status);
  addBookModal.close();
  bookForm.reset();
  displayLibrary();
};

const addBookToLibrary = (title, author, pages, readStatus) => {
  const newBook = new Book(title, author, pages, readStatus);
  library.push(newBook);
};

const deleteBook = (target) => {
  library.splice(target, 1);
  displayLibrary();
};

const changeReadStatus = (e) => {
  const book = library[e.target.id];

  if (e.target.textContent === "Not Read") {
    book.readStatus = "Read";
    e.target.textContent = "Read";
    e.target.classList.replace("not-read", "read");
  } else {
    book.readStatus = "Not Read";
    e.target.textContent = "Not Read";
    e.target.classList.replace("read", "not-read");
  }
};

function createBookElement(elementType, className, text, obj, index) {
  const bookElement = document.createElement(elementType);
  bookElement.textContent = text;
  bookElement.id = index;
  bookElement.classList.add(className);

  let readStatusClass = obj.readStatus;

  if (readStatusClass === "Not Read") {
    readStatusClass = "not-read";
  } else {
    readStatusClass = "read";
  }

  if (bookElement.classList.contains("status-btn")) {
    bookElement.classList.add(readStatusClass);
  }

  return bookElement;
}

const createBookItem = (index, book) => {
  const bookItem = document.createElement("article");
  bookItem.classList.add("book-item");

  const title = createBookElement("h2", "title", book.title, book);
  const author = createBookElement("h3", "author", book.author, book);
  const pages = createBookElement("p", "pages", book.pages, book);
  const statusButton = createBookElement(
    "button",
    "status-btn",
    book.readStatus,
    book,
    index
  );
  const deleteButton = createBookElement(
    "button",
    "delete-btn",
    "Delete",
    book,
    index
  );

  bookItem.append(title, author, pages, statusButton, deleteButton);

  return bookItem;
};

const populateBookContainer = (fragment, array) => {
  for (const [i, book] of array.entries()) {
    const bookItem = createBookItem(i, book);
    fragment.appendChild(bookItem);
  }
};

const displayLibrary = () => {
  bookContainer.innerHTML = "";
  const bookFragment = document.createDocumentFragment();

  if (library.length > 0) {
    populateBookContainer(bookFragment, library);
    bookContainer.appendChild(bookFragment);
  } else {
    bookContainer.innerHTML = "<h2>No books yet</h2>";
  }
};

displayLibrary();
