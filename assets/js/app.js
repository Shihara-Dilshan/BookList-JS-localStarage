// Book class : Represent a Book

class Book {
  constructor(title, author, ISBN) {
    this.title = title;
    this.author = author;
  }
}

// UI Class : Hanfle UI tasks

class UI {
  static displayBooks() {
    const StoreBooks = [
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

    const books = StoreBooks;

    //books.forEach((book) => UI.addBookToList(book));

    books.forEach(myFunction);

    function myFunction(book) {
      UI.addBookToList(book);
    }
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.ISBN}</td>
            <td><i class="material-icons smaller teal-text ">delete</i></td>
        `;

    list.appendChild(row);
  }
}

// Store Class : Handles Storage

// Event : Display Books

document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Event : Add a Book

//Event : Remove a Book
