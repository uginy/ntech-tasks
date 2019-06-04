import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MessageService } from 'src/app/services/message.service';
import { ActivatedRoute } from '@angular/router';
import { itemsPerPage } from 'src/assets/config';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  constructor(
    private api: ApiService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  private title = 'Albums';
  private sparam = '/?userId=';
  private id: number;
  public items: [];
  public iPerPage: number;
  public p;

  ngOnInit() {
    this.iPerPage = itemsPerPage;
    this.messageService.changeMessage(this.title);
    this.id = this.route.snapshot.params['id'];
    this.api.getItems(this.id, this.title, this.sparam).subscribe(res => {
      this.items = res;
    });
  }
}
