import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { SimpledataService } from 'src/app/services/simpledata.service';
import { ActivatedRoute } from '@angular/router';
import { PagerService } from 'src/app/services/pager.service';
import { itemsPerPage, menuItems, currentTypeData } from 'src/assets/config';
import * as _ from 'lodash';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit, OnDestroy {
  albums;
  title = 'Albums';
  messages: string;
  id: number;
  query: string;
  private sub: any;
  linkFind = _.find(menuItems, { name: this.title });
  link = this.linkFind ? this.linkFind.data : currentTypeData;
  pager: any = {};
  pagedItems: any[];

  constructor(
    private api: ApiService,
    private data: SimpledataService,
    private route: ActivatedRoute,
    private pagerService: PagerService
  ) {}

  ngOnInit() {
    this.data.changeMessage('List Of ' + this.title);
    this.sub = this.route.params.subscribe(params => {
      this.id = +params.id;
    });
    this.fetchAlbums(this.id);
  }

  fetchAlbums(id?) {
    if (!id) {
      this.query = this.link;
    } else {
      this.query = this.link + '/?userId=' + id;
    }

    this.api.getDataHttp(this.query).subscribe(
      data => {
        this.albums = data;
        this.setPage(1);
        // console.log(this.posts);
      },
      err => {
        console.log(err);
      }
    );
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(
      this.albums.length,
      page,
      itemsPerPage
    );

    // get current page of items
    this.pagedItems = this.albums.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
