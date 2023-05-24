import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Example1Component } from './components/example1/example1.component';
import { Example2Component } from './components/example2/example2.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Example3Component } from './components/example3/example3.component';

@NgModule({
  declarations: [
    AppComponent,
    Example1Component,
    Example2Component,
    Example3Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
