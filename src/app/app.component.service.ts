import { AppComponent } from './app.component';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { Book } from './app.component.js';
import { Comment } from './app.component.js';
import { MaterializeDirective, MaterializeAction } from 'angular2-materialize';

import 'rxjs/Rx';

declare var Materialize: any;

@Injectable()
export class AppComponentService {

  url = 'api/books';
  constructor(private http: Http) { }

  listAll() {
    return this.http.get(this.url)
      .map( (res: Response) => {
          return res.json();
      });
  }

  add(book: Book): Promise<Book> {
    const body = JSON.stringify(book);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(this.url, body, options).toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }//

  del(book: Book): Observable<any> {
     return this.http.delete(this.url + '/' + book.id)
      .map((res: Response) => {
        Materialize.toast('Book Deleted!! ^^', 3000, 'green-text');
        return res.json();
      })
      .catch(this.handleError);
  }

  update(book: Book): Observable<any> {
      const body = JSON.stringify(book);
      const headers = new Headers({ 'Content-Type': 'application/json' });
      const options = new RequestOptions({ headers: headers });

      return this.http.put(this.url, body, options)
          .map((res: Response) => res.json())
          .catch(this.handleErrorPromise);
  }

  private handleErrorPromise(error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  }

  private extractData(res: Response) {
    const body = res.json();
    Materialize.toast('Book Added with Success!! ^^', 3000, 'green-text');
    return body.data || {};
  }

  private handleError(error: Response) {
    console.error(error);
    Materialize.toast('Book Dont Added!! :(' + error, 3000, 'red-text');
    return Observable.throw(error.json().error || 'Server error');
  }
}
