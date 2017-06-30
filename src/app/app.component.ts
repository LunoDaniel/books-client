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
    public synopses1:string = "The most evil and powerful dark wizard in history, Lord Voldemort, murders James and Lily Potter but mysteriously disappears after failing to kill their infant son, Harry. While the wizarding world celebrates Voldemort's apparent downfall, Professor Dumbledore, Professor McGonagall and half-giant Rubeus Hagrid place the one-year-old orphan in the care of his surly and cold Muggle uncle and aunt,"+ 
                    "Vernon and Petunia Dursley and their spoilt and bullying son, Dudley.";
    public synopses2:string = "During another summer with his Aunt Petunia and Uncle Vernon, Harry Potter and Dudley are attacked by Dementors. After using magic to save Dudley and himself, Harry is expelled from Hogwarts, but the decision is later rescinded. Harry is whisked off by a group of wizards (including the real Mad-Eye Moody, Professor Lupin, and several new faces, including Nymphadora Tonks, a bubbly young witch who is a Metamorphmagus [a wizard who can change his/her appearance without a potion or spell], and Kingsley Shacklebolt, a senior Auror who believes everyone is equal) to Number 12, Grimmauld Place, the former home of his godfather, Sirius Black. ";
    
    book1 = new Book("Harry Potter and The Filosopher Stone", "J.K. Rolling", this.src1, this.synopses1);
    book2 = new Book("Harry Potter and The Order of the Phoenix", "J.K. Rolling", this.src2, this.synopses2);
    
    button = "<button class='btn' type='button' >CLICK </button>";
};
class Book{
    
    private src: String; 
    private title: String; 
    private author: String;
    private synopses: String;
        
    constructor(title, author, u,synopses){
        this.src = u; 
        this.title = title;
        this.author = author;
        this.synopses = synopses;
    }
}