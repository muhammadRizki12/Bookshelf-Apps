const UNCOMPLETED_LIST = 'incompleteBookshelfList';
const COMPLETED_LIST = 'completeBookshelfList';
const BOOK_ITEMID = 'itemId';

// Function
function addBook() {
  const uncompleteReadBook = document.getElementById(UNCOMPLETED_LIST);
  const completeReadBook = document.getElementById(COMPLETED_LIST);

  // Get Element
  const title = document.getElementById('inputBookTitle').value;
  const author = document.getElementById('inputBookAuthor').value;
  const year = document.getElementById('inputBookYear').value;
  const isComplete = document.getElementById('inputBookIsComplete').checked;

  const book = makeBook(title, author, year, isComplete);
  const bookObject = composeBookObject(title, author, year, isComplete);

  // Get id
  book[BOOK_ITEMID] = bookObject.id;

  books.push(bookObject);

  if (isComplete) {
    completeReadBook.append(book);
  } else {
    uncompleteReadBook.append(book);
  }
  updateDataToStorage();
}

function makeBook(title, author, year, isComplete) {
  const textTitle = document.createElement('h3');
  textTitle.innerText = title;

  const textAuthor = document.createElement('p');
  textAuthor.innerText = author;

  const textYear = document.createElement('p');
  textYear.innerText = year;

  // Action
  const action = document.createElement('div');
  action.classList.add('action');

  if (isComplete) {
    action.append(createButtonUncompleted(), createButtonDelete());
  } else {
    action.append(createButtonCompleted(), createButtonDelete());
  }

  const container = document.createElement('article');
  container.classList.add('book_item');

  container.append(textTitle, textAuthor, textYear, action);

  return container;
}

// Create Button
function createdButton(buttonTypeClass, eventListener) {
  const button = document.createElement('button');
  button.classList.add(buttonTypeClass);
  button.addEventListener('click', function (event) {
    eventListener(event);
  });

  return button;
}

// Completed button
function createButtonCompleted() {
  const buttonCompleted = createdButton('green', function (event) {
    addBookToCompleted(event.target.parentElement.parentElement);
  });

  buttonCompleted.innerText = 'Selesai dibaca';
  return buttonCompleted;
}
// deleted Button
function createButtonDelete() {
  const buttonDelete = createdButton('red', function (event) {
    deleteBook(event.target.parentElement.parentElement);
  });

  buttonDelete.innerText = 'Hapus buku';
  return buttonDelete;
}

// uncompleted button
function createButtonUncompleted() {
  const buttonUncompleted = createdButton('green', function (event) {
    addBookToUncompleted(event.target.parentElement.parentElement);
  });

  buttonUncompleted.innerText = 'Belum Selesai di Baca';
  return buttonUncompleted;
}

// ------------------------------

function addBookToCompleted(bookElement) {
  const listCompleted = document.getElementById(COMPLETED_LIST);

  const bookTitle = bookElement.querySelector('.book_item > h3').innerText;
  const bookAuthor = bookElement.querySelector('.book_item > p').innerText;
  const bookYear = bookElement.querySelector('.book_item > p ~ p').innerText;

  const newBook = makeBook(bookTitle, bookAuthor, bookYear, true);
  const book = findBook(bookElement[BOOK_ITEMID]);

  book.isComplete = true;
  newBook[BOOK_ITEMID] = book.id;

  listCompleted.append(newBook);

  bookElement.remove();
  updateDataToStorage();
}

function addBookToUncompleted(bookElement) {
  const listUncompleted = document.getElementById(UNCOMPLETED_LIST);

  const bookTitle = bookElement.querySelector('.book_item > h3').innerText;
  const bookAuthor = bookElement.querySelector('.book_item > p').innerText;
  const bookYear = bookElement.querySelector('.book_item > p ~ p').innerText;

  const newBook = makeBook(bookTitle, bookAuthor, bookYear, false);
  const book = findBook(bookElement[BOOK_ITEMID]);

  book.isComplete = false;
  newBook[BOOK_ITEMID] = book.id;

  listUncompleted.append(newBook);

  bookElement.remove();
  updateDataToStorage();
}

function deleteBook(bookElement) {
  const confirmMessage = !confirm('Apakah Anda Yakin');
  if (confirmMessage) {
    return false;
  } else {
    const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
    books.splice(bookPosition, 1);

    bookElement.remove();
    updateDataToStorage();
  }
}

function checkFinished() {
  const checkBox = document.getElementById('inputBookIsComplete').checked;

  const textButton = document.querySelector('span');

  if (checkBox) {
    textButton.innerText = 'selesai dibaca';
  } else {
    textButton.innerText = 'Belum selesai dibaca';
  }
}

function searchBookByTitle() {
  const keyInput = document.getElementById('searchBookTitle').value.toLowerCase();
  const item = document.querySelectorAll('article');

  for (i of item) {
    const title = i.firstElementChild.textContent.toLowerCase();
    if (keyInput === title) {
      i.style.color = '';
    } else if (keyInput === '') {
      i.style.display = '';
    } else {
      i.style.display = 'none';
    }
  }
}
