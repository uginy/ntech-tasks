import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MessageService } from 'src/app/services/message.service';
import { ActivatedRoute } from '@angular/router';
import { itemsPerPage, menuItems, currentTypeData } from 'src/assets/config';
import * as _ from 'lodash';

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
  private linkFind = _.find(menuItems, { name: this.title });
  private link = this.linkFind ? this.linkFind.data : currentTypeData;
  public p = 1;
  public items;
  public iPerPage: number;
  public userdata;

  ngOnInit() {
    this.iPerPage = itemsPerPage;
    this.messageService.changeMessage('List Of ' + this.title);
    this.id = this.route.snapshot.params['id'];
    this.api.getUser(this.id);
    this.api.getItems(this.id, this.link);
  }
}
