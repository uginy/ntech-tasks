import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MessageService } from 'src/app/services/message.service';
import { ActivatedRoute } from '@angular/router';
import { itemsPerPage } from 'src/assets/config';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  constructor(
    private api: ApiService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  private title = 'Comments';
  private postsTitle = 'Posts';
  private sparam = '/?postId=';
  private id: number;
  public items: [];
  public iPerPage: number;
  public postdata: [];
  public p;

  ngOnInit() {
    this.iPerPage = itemsPerPage;
    this.messageService.changeMessage(this.title);
    this.id = this.route.snapshot.params['id'];
    this.api.getItems(this.id, this.title, this.sparam).subscribe(res => {
      this.items = res;
    });
    if (this.id) {
      this.api.getItems(this.id, this.postsTitle).subscribe(res => {
        this.postdata = res[0];
      });
    }
  }
}
