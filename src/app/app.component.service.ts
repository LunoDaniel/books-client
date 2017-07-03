import { AppComponent } from './app.component';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Book } from './app.component.js';

@Injectable()
export class AppComponentService {

  url = 'api/books';
  constructor(private http: Http) { }

  listAll() {
    return this.http.get('api/books')
      .map(
      (res: Response) => {
        return res.json();
      }
      );
  }

  add(book: Book): Promise<Book> {
    const body = JSON.stringify(book);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(this.url, book, options).toPromise()
      .then(this.extractData)
      .catch(this.handleErrorPromise);
  }

  del(id: number): Observable<any> {
      return this.http.delete('api/add' + id)
        .map((res: Response) => {
          return res.json();
        }).catch(this.handleErrorPromise);
  }

  update(book: Book): Observable<any> {
      const body = JSON.stringify(book);
      const headers = new Headers({ 'Content-Type': 'application/json' });
      const options = new RequestOptions({ headers: headers });

      return this.http.put('localhost:8080/books/api/Cadastre/DocumentType', body, options)
          .map((res: Response) => res.json())
          .catch(this.handleErrorPromise);
  }

  private handleErrorPromise(error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body.data || {};
  }
}
