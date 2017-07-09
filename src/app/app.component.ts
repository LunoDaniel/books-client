import { AppComponentService } from './app.component.service';
import { Component, Input, EventEmitter, OnInit, ApplicationRef } from '@angular/core';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls:
  [
    './app.component.css'
  ],
  providers: [AppComponentService]
})

export class AppComponent {

  public listOfBooks: Book[];
  public modalTitle = 'New Book';
  public emptyList = 'Your List of Books is Empty! :(';
  book =   new Book();
  authors: string[];

  modalActions = new EventEmitter<string | MaterializeAction>();
  openModal() {
    this.modalActions.emit({ action: 'modal', params: ['open'] });
  }
  closeModal() {
    this.modalActions.emit({ action: 'modal', params: ['close'] });
  }

  constructor(private bookService: AppComponentService) {
      bookService.listAll().subscribe(
          (books: any) => this.listOfBooks = books,
          (error) => console.log(error),
          () => console.log('Books service Completed')
      );
  }

  validateList(): Array<Book> {
    if (this.listOfBooks.length === 0) {
      this.emptyList = 'Your List of Books is Empty :(';
      ApplicationRef.apply('ul');
      return null;
    }else {
      return this.listOfBooks;
    }
  }

  addComment(book, commentName: HTMLInputElement, review: HTMLInputElement) {
    if (book != null && review.value !== '' && commentName.value !== '') {
      book.comments.push(new Comment(review.value, commentName.value));
      this.bookService.add(book);
      commentName.value = null;
      review.value = null;
    }
  };

  addBook(bookTitle: HTMLInputElement , bookDescription: HTMLInputElement,
    bookReleastedDate: HTMLInputElement, bookAuthor: HTMLInputElement, bookIsbn: HTMLInputElement, bookImageUrl: HTMLInputElement) {

    if (bookTitle.value !== '' && bookDescription.value !== '' && bookReleastedDate.value !== '' && bookAuthor.value !== ''
      && bookIsbn.value !== '' && bookImageUrl.value !== '') {

        this.authors = bookAuthor.value.split(',');

        for (let a of this.authors){
            this.book.authors.push(new Author(a));
        };
        //
        this.book.title = bookTitle.value;
        this.book.description = bookDescription.value;
        this.book.photoUrl = bookImageUrl.value;
        this.book.releasedDate = bookReleastedDate.value;
        this.book.isbn = bookIsbn.value;
        this.bookService.add(this.book);
        this.bookService.listAll();
        ApplicationRef.apply('ul');
    }
  };

  editBook(book: Book) {
    this.modalTitle = 'Editing a Book';
    this.bookService.update(book);
    this.openModal();
  }

  deleteBook(book: Book) {
    const index: number = this.listOfBooks.indexOf(book);
    if (index !== -1) {
       this.bookService.del(book);
       this.listOfBooks.splice(index, 1);
    }
  }

};

export class Book {

  public id: number;
  public photoUrl: String;
  public title: String;
  public author: String;
  public description: String;
  public releasedDate: String;
  public isbn: String;
  public authors: Author[] = [];
  public comments: Comment[] = [];

}

export class Author {

  public id: number;
  public name: String;

  constructor(name) {
      this.name = name;
  }

}

export class Comment {
  public id: number;
  public name: String;
  public review: String;

  constructor(name, review) {
    this.name = name;
    this.review = review;
  }
}
