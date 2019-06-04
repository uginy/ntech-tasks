import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MessageService } from 'src/app/services/message.service';
import { ActivatedRoute } from '@angular/router';
import { itemsPerPage } from 'src/assets/config';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  constructor(
    private api: ApiService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  private title = 'Users';
  private id: number;
  public items: [];
  public iPerPage: number;
  public p;

  ngOnInit() {
    this.iPerPage = itemsPerPage;
    this.messageService.changeMessage(this.title);
    this.id = this.route.snapshot.params['id'];
    this.api.getItems(this.id, this.title).subscribe(res => {
      this.items = res;
    });
  }
}
