import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from './services/message.service';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { NavComponent } from './layout/nav/nav.component';

@NgModule({
  declarations: [ AppComponent, HeaderComponent, NavComponent ],
  imports: [ HttpClientModule, BrowserModule, AppRoutingModule ],
  providers: [ MessageService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
