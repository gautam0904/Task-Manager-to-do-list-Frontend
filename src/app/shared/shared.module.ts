import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { LoadingComponent } from './loading/loading.component';


@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports :[
    LoadingComponent
  ]
})
export class SharedModule { }
