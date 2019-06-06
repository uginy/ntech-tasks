import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { itemsPerPage } from 'src/assets/config';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  constructor(private data: DataService, private route: ActivatedRoute) {}

  private title = 'Users';
  public id: number = this.route.snapshot.params['id'];
  public items: [];
  public itemsPerPage: number = itemsPerPage;
  public currentPage: number;

  ngOnInit() {
    this.data.dataLoad(this.id, this.title).subscribe(res => {
      this.items = res;
    });
  }
}
