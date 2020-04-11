// Book class : Represent a Book

class Book {
  constructor(title, author, ISBN) {
    this.title = title;
    this.author = author;
    this.ISBN = ISBN;
  }
}

// UI Class : Hanfle UI tasks

class UI {
  static displayBooks() {
    /*const StoreBooks = [
      {
        title: "Harry potter",
        author: "J.K.Rowing",
        ISBN: "BK12P31",
      },
      {
        title: "Lord of the rings",
        author: "K.Honn",
        ISBN: "BK00U81",
      },
    ];

    */

    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));

    /*books.forEach(myFunction);

    function myFunction(book) {
      UI.addBookToList(book);
    }
    */
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.ISBN}</td>
            <td><i class="material-icons smaller teal-text delete">delete</i></td>
        `;

    list.appendChild(row);
  }

  static deleteBook(ET) {
    if (ET.classList.contains("delete")) {
      let choice = prompt("Do you want to remove the Book?");

      if (
        choice == "Y" ||
        choice == "y" ||
        choice == "Yes" ||
        choice == "YES" ||
        choice == "yes"
      ) {
        ET.parentElement.parentElement.remove();
        M.toast({ html: "Succefully Deleted" });
        Store.removeBook(ET.parentElement.previousElementSibling.textContent);

        //console.log(ET.parentElement.previousElementSibling.textContent);
      } else {
        M.toast({ html: "Book has not been delected" });
      }
    }
  }

  static showAlert(message, className) {
    //const div = document.createElement("div");
  }

  static clearFields() {
    document.querySelector("#Btitle").value = "";
    document.querySelector("#Bauthor").value = "";
    document.querySelector("#BISBN").value = "";
  }
}

// Store Class : Handles Storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static addBooks(book) {
    const books = Store.getBooks();

    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.ISBN === isbn) {
        books.splice(index, 1);
        localStorage.setItem("books", JSON.stringify(books));
      }
    });
  }
}

// Event : Display Books

document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Event : Add a Book

document
  .getElementById("sumbitBTN")
  .addEventListener("click", function (Event) {
    //get book details
    let book_ISBN =
      Event.target.parentElement.parentElement.previousElementSibling
        .lastElementChild.lastElementChild.lastElementChild.value;

    let book_Author =
      Event.target.parentElement.parentElement.previousElementSibling
        .previousElementSibling.lastElementChild.lastElementChild
        .lastElementChild.value;

    let book_name =
      Event.target.parentElement.parentElement.previousElementSibling
        .previousElementSibling.previousElementSibling.lastElementChild
        .lastElementChild.lastElementChild.value;

    //validate inputs

    if (book_ISBN === "" || book_Author === "" || book_name === "") {
      alert("Fill all the fields");
    } else {
      //instatiate book
      const book = new Book(book_name, book_Author, book_ISBN);

      //add boook to UI
      UI.addBookToList(book);

      //add book to store
      Store.addBooks(book);

      //clear field
      UI.clearFields();
      M.toast({ html: "Succefully added the Book" });
    }
  });

//Event : Remove a Book UI

//document
//.getElementById("book-list")
//.addEventListener("click", function (EventDeel) {
//console.log(EventDeel.target.parentElement.previousElementSibling.textContent);

//});

document
  .getElementById("book-list")
  .addEventListener("click", function (Event) {
    UI.deleteBook(Event.target);
  });
