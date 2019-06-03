import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MessageService } from 'src/app/services/message.service';
import { ActivatedRoute } from '@angular/router';
import { itemsPerPage, menuItems, currentTypeData } from 'src/assets/config';
import * as _ from 'lodash';
@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {
  private items: [];
  private title = 'Photos';
  private id: number;
  private query: string;
  private linkFind = _.find(menuItems, { name: this.title });
  private link = this.linkFind ? this.linkFind.data : currentTypeData;
  public p = 1;
  public iPerPage: number;

  constructor(
    private api: ApiService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.iPerPage = itemsPerPage;
    this.messageService.changeMessage('List Of ' + this.title);
    this.id = this.route.snapshot.params['id'];
    this.fetchPhotos(this.id);
  }

  private fetchPhotos(id?: any) {
    if (!id) {
      this.query = this.link;
    } else {
      this.query = `${this.link}/?albumId=${id}`;
    }

    this.api.getDataHttp(this.query).subscribe(
      data => {
        this.items = data;
      },
      err => {
        console.log(err);
      }
    );
  }
}
