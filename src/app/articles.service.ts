import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Article } from './article'

@Injectable()
export class ArticlesService {
  apiUrl = 'http://localhost:3000/';

  resourceUrl = this.apiUrl + 'articles/';

  constructor(
    private http: Http
  ) {}

  // create(article: Article):Observable<Article> {

  //   let reqOptions = new RequestOptions({ headers: this.headers() });

  //   return http.post(this.resourceUrl, article, reqOptions)
  //       .map(resp => new Article(resp))
  //       .catch(this.handleError);
  // }

  // find(id: number):Observable:<Article> {

  //   let reqOptions = new RequestOptions({ headers: this.headers()});

  //   return http.get(this.resourceUrl + id, reqOptions)
  //              .map(resp => new Article(resp))
  //              .catch(this.handleError);
  // }

  // search(params:Array):Observable<Article[]> {
  //   let reqParams = new URLSearchParams();
  //   for (var i, i < params.length, i++) { reqParams.set(params[i].key, params[i]); }

  //   let reqOptions = new RequestOptions({ pheaders: this.headers(), params: reqParams });

  //   return http.get(this.resourceUrl, reqOptions)
  //              .map(this.mapArticles)
  //              .catch(this.handleError);
  // }

  // update(article: Article):Observable<number> {

  //   let reqOptions = new RequestOptions({ headers: this.headers() });

  //   return http.put(this.resourceUrl + '/' + article.id, article, reqOptions)
  //              .map(resp => new Article(resp))
  //              .catch(this.handleError);
  // }

  getAll():Observable<Article[]> {
    let reqOptions = new RequestOptions({ headers: this.headers() })

    return this.http.get(this.resourceUrl, reqOptions)
        .map((resp: Response) => this.mapArticles(resp.json()))
        .catch((resp) => this.handleError('getAll', resp));
  }

  // delete(id: number):Observable<Article> {
  //   let article = this.find(id);
  //   let reqOptions = new RequestOptions({ headers: this.headers() });


  //   http.delete(this.resourceUrl + id, reqOptions)
  //       .map(this.mapArticles)
  //       .catch(this.handleError);
  // }

  private headers():Headers {
    return new Headers({ 'Content-Type': 'application/json' });
  }

  private mapArticles(items: Object[]):Article[] {
    let that = this;
    return items.map(function(item) { return that.toArticle(item); });
    // let articles:Article[] = [];
    // let items = resp.json();
    // let that = this;

    // items.forEach((item) => articles.push(that.toArticle(item)));

    // return articles;
  }

  private toArticle(item):Article {
    return new Article(
      item.id,
      item.title,
      item.category
    );
  }

  private handleError(origin: string, resp: Response) {
    let data = resp.json();
    let msg = '';

    switch(origin) {
      case 'getAll':
        msg = "Error loading all articles.";
      break
    }

    data = {
      "status_code": resp.status,
      "message": msg
    }

    console.error(data);
    return Observable.throw(data);
  }
}
