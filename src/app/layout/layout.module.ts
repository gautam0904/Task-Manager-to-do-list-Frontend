import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { HorizontalComponent } from './horizontal/horizontal.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    NavbarComponent,
    HorizontalComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports : [
    NavbarComponent,
    HorizontalComponent
  ]
})
export class LayoutModule { }
