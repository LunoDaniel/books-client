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
        
        for(let a of this.authors){
            this.book.authors.push(new Author(a));  
        };
        //
        this.book.title = bookTitle.value;
        this.book.description = bookDescription.value;
        this.book.photoUrl = bookImageUrl.value;
        this.book.releasedDate = bookReleastedDate.value;
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
       this.bookService.del(book.id);
       this.listOfBooks.splice(index, 1);
    }
  }

};

export class Book {

  private _id: number;
  private _photoUrl: String;
  private _title: String;
  private _author: String;
  private _description: String;
  private _releasedDate: String;
  private _isbn: String;
  private _authors: Author[] = [];
  private _comments: Comment[] = [];


  set id(id: number){
    this._id = id;
  }

  get id(){
    return this._id;
  }
  set photoUrl(photoUrl: String) {
    this._photoUrl = photoUrl;
  }

  get photoUrl(): String {
    return this._photoUrl;
  }

  set title(title: String) {
    this._title = title;
  }

  get title(): String {
    return this._title;
  }

  set description(description: String) {
    this._description = description;
  }

  get description(): String {
    return this._description;
  }

  set releasedDate(releasedDate: String) {
    this._releasedDate = releasedDate;
  }

  get releasedDate(): String {
    return this._releasedDate;
  }

  set isbn(isbn: String) {
    this._isbn = isbn;
  }

  get isbn(): String {
    return this._isbn;
  }

  set authors(authors: Author[]) {
    this._authors = authors;
  }

  get authors(): Author[] {
    return this._authors;
  }

  set comments(comment: Comment[]) {
    this._comments = comment;
  }

  get comments(): Comment[] {
    return this._comments;
  }
}

export class Author {

  private id: number;
  private _name: String;
  private books: Book[] = [];
    
  constructor(name){
      this._name = name;
  }
  
  set name(name: String){
       this._name = name;
  }
    
  get name(): String {
      return this._name;
  }
  

}

export class Comment {
  private id: number;
  private name: String;
  private review: String;

  constructor(name, review) {
    this.name = name;
    this.review = review;
  }
}
