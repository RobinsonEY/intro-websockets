import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Example1Component } from './components/example1/example1.component';
import { Example2Component } from './components/example2/example2.component';
import { Example3Component } from './components/example3/example3.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {path: 'example1', component: Example1Component},
      {path: 'example2', component: Example2Component},
      {path: 'example3', component: Example3Component}
    ])
  ]
})
export class AppRoutingModule { }
