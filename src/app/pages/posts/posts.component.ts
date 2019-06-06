import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { itemsPerPage } from 'src/assets/config';
import { DataService } from 'src/app/services/data.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  isLoaded: string;
  constructor(
    private data: DataService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  private title = 'Posts';
  private searchParam = '/?userId=';
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
