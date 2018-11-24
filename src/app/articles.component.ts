import { Component, OnInit } from '@angular/core';

import { Article } from './article';
import { ArticlesService } from './articles.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})

export class ArticlesComponent implements OnInit {
  articlesList: Article[] = [];
  msg: string = '';

  constructor(
    private articlesService: ArticlesService
  ) {}

  ngOnInit() {
    let that = this;
    this.articlesService.getAll()
        .subscribe(
          function(articles) { that.articlesList = articles; },
          error => this.msg = error.message
        )
  }
}
