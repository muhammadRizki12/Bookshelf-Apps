document.addEventListener('DOMContentLoaded', function () {
  const submitForm = document.getElementById('inputBook');

  submitForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addBook();
  });

  const searchForm = document.getElementById('searchBook');

  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    searchBookByTitle();
  });

  // Change text
  const checkBox = document.getElementById('inputBookIsComplete');
  checkBox.addEventListener('change', () => {
    checkFinished();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener('ondatasaved', () => {
  console.log('Data berhasil disimpan.');
});

document.addEventListener('ondataloaded', () => {
  refreshDataFromBooks();
});
