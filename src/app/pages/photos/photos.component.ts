import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { itemsPerPage } from 'src/assets/config';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {
  constructor(private data: DataService, private route: ActivatedRoute) {}

  private title = 'Photos';
  private searchParam = '/?albumId=';
  public id: number = this.route.snapshot.params['id'];
  public items: [];
  public itemsPerPage: number = itemsPerPage;
  public currentPage: number;

  ngOnInit() {
    this.data.dataLoad(this.id, this.title, this.searchParam).subscribe(res => {
      this.items = res;
    });
  }
}
