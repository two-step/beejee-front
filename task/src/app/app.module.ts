import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  MatButtonModule,
  MatListModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatCheckboxModule,
  MatPaginatorModule,
  MatTableModule, MatFormFieldModule, MatSortModule, MatTooltipModule, MatSnackBarModule, MatSlideToggleModule
} from '@angular/material';

import {MDBBootstrapModule} from 'angular-bootstrap-md';

import {LoginComponent} from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  CovalentCommonModule, CovalentDialogsModule,
  CovalentFileModule,
  CovalentLayoutModule,
  CovalentLoadingModule, CovalentMediaModule,
  CovalentMessageModule,
  CovalentSearchModule
} from '@covalent/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TaskComponent } from './task/task.component';
import { TaskListComponent } from './task/list/task-list.component';
import { TaskListContainerComponent } from './task/list/task-list-container/task-list-container.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TaskComponent,
    TaskListComponent,
    TaskListContainerComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatTableModule,
    MatCheckboxModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatSnackBarModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MDBBootstrapModule,
    HttpClientModule,
    CovalentLoadingModule,
    CovalentDialogsModule,
    CovalentLayoutModule,
    CovalentCommonModule,
    CovalentFileModule,
    CovalentMessageModule,
    CovalentSearchModule,
    CovalentMediaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
