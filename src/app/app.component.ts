import { Component, OnInit } from '@angular/core';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
import { MessageService } from './services/message.service';
import { filter } from 'lodash';
import { menuItems, currentTypeData } from 'src/assets/config';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public loading = false;
  public message: string;
  public status: boolean;
  public homeUrl: string = currentTypeData;
  public menus: {};

  constructor(private messageService: MessageService, private router: Router) {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngOnInit() {
    this.initLoad();
  }

  private initLoad() {
    this.menus = filter(menuItems, { active: true });
    this.messageService.currentMessage.subscribe(
      message => (this.message = message)
    );
  }
}
