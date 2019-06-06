import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { itemsPerPage } from 'src/assets/config';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  constructor(private data: DataService, private route: ActivatedRoute) {}

  private title = 'Comments';
  private postsTitle = 'Posts';
  private searchParam = '/?postId=';
  public id: number = this.route.snapshot.params['id'];
  public items: [];
  public postdata: [];
  public itemsPerPage: number = itemsPerPage;
  public currentPage: number;

  ngOnInit() {
    this.data.dataLoad(this.id, this.title, this.searchParam).subscribe(res => {
      this.items = res;
    });

    if (this.id) {
      this.data.dataLoad(this.id, this.postsTitle).subscribe(res => {
        this.postdata = res[0];
      });
    }
  }
}
