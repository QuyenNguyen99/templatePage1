import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';


const routesConfig: Routes =  [
  {path:'contacts', component: ContactsComponent},
  {path:'contacts/edit/:id', component: EditComponent},
  {path:'contacts/add', component: AddComponent},
  {path:'detail', component: DetailComponent},
  {path:'news', component: NewsComponent},
  {path:'news/news-edit', component: EditNewsComponent}
];  
import { AppComponent } from './app.component';
import { LogoComponent } from './logo/logo.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { MaintainComponent } from './maintain/maintain.component';
import { ContactsComponent } from './contacts/contacts.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';
import { TodoService } from './todo.service';
import { NewsComponent } from './news/news.component';
import { EditNewsComponent } from './edit-news/edit-news.component';


@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
    HeaderComponent,
    ProfileComponent,
    LeftMenuComponent,
    MaintainComponent,
    ContactsComponent,
    DetailComponent,
    EditComponent,
    AddComponent,
    NewsComponent,
    EditNewsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routesConfig)
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
