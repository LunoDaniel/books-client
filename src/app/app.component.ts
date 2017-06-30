import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls:
    [
        './app.component.css'
    ]
})

export class AppComponent {

    public src1: string = "https://www.teachervision.com/sites/default/files/fe_slideshow/2007_07/HPusa1_TV.gif";
    public src2: string = "http://images.gr-assets.com/books/1387141547l/2.jpg";
    book1 = new Book("Harry Potter and The Filosopher Stone", "J.K. Rolling", this.src1);
    book2 = new Book("Harry Potter and The Order of the Phoenix", "J.K. Rolling", this.src2);
};
class Book{
    
    private src: string; 
    private title: String; 
    private author: String;
        
    constructor(title, author, u){
    this.src = u; 
        this.title = title;
        this.author = author;
    }
}