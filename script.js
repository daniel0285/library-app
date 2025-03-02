const libraryPage = document.getElementById("libraryPage");
const bookContainer = document.getElementById("book-container");
const bookForm = document.getElementById("bookForm");
const addBookModal = document.getElementById("addBookModal");

libraryPage.addEventListener("click", (e) => {
  if (e.target.id === "addBookBtn") {
    addBookModal.showModal();
  }

  if (e.target.id === "closeButton") {
    addBookModal.close();
  }

  if (e.target.classList.contains("delete-btn")) {
    deleteBook(e.target.id);
  }

  if (e.target.classList.contains("status-btn")) {
    changeReadStatus(e);
  }
});

bookForm.addEventListener("input", (e) => {
  if (e.target.id === "totalPages") {
    if (e.target.validity.rangeUnderflow) {
      e.target.setCustomValidity("Pages cannot be less than 0");
    } else {
      e.target.setCustomValidity("");
    }
  }
});

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getInputData(e.target);
});

const STATUS = {
  readText: "Finished",
  notReadText: "Not Finished",
  readClass: "finished",
  notReadClass: "not-finished",
};

const library = [];
class Book {
  constructor(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
  }
}

const getInputData = (form) => {
  const formData = new FormData(form);
  const book = Object.fromEntries(formData);

  if (book.status === undefined) {
    book.status = STATUS.notReadText;
  } else {
    book.status = STATUS.readText;
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
  const target = e.target;

  if (e.target.textContent === STATUS.notReadText) {
    updateButtonAttribute(book, target, STATUS.readText);
    target.classList.replace(STATUS.notReadClass, STATUS.readClass);
  } else {
    updateButtonAttribute(book, target, STATUS.notReadText);
    target.classList.replace(STATUS.readClass, STATUS.notReadClass);
  }
};

const updateButtonAttribute = (book, target, text) => {
  book.readStatus = text;
  target.textContent = text;
};

function createBookElement(elementType, className, text, obj, index) {
  const bookElement = document.createElement(elementType);
  bookElement.textContent = text;
  bookElement.classList.add(className);
  let readStatusClass = obj.readStatus;

  if (index !== undefined) {
    bookElement.id = index;
  }

  readStatusClass =
    readStatusClass === STATUS.notReadText
      ? (readStatusClass = STATUS.notReadClass)
      : (readStatusClass = STATUS.readClass);

  if (bookElement.classList.contains("status-btn")) {
    bookElement.classList.add(readStatusClass, "btn");
  }

  if (bookElement.classList.contains("delete-btn")) {
    bookElement.classList.add("btn");
  }

  return bookElement;
}

const createBookItem = (index, book) => {
  const bookItem = document.createElement("article");
  bookItem.classList.add("book-item", "center");

  const title = createBookElement("h2", "title", book.title, book);
  const author = createBookElement("p", "author", `By ${book.author}`, book);
  const pages = createBookElement("p", "pages", `${book.pages} Pages`, book);
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

  const buttonGroup = document.createElement("div");
  buttonGroup.classList.add("btn-group", "flex-row", "center");

  buttonGroup.append(statusButton, deleteButton);
  bookItem.append(title, author, pages, buttonGroup);

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
    bookContainer.innerHTML = "<h2>Your library is empty</h2>";
  }
};

displayLibrary();
