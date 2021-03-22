import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VNotFoundRoutingModule } from './v-not-found-routing.module';
import { VNotFoundComponent } from './v-not-found.component';


@NgModule({
  declarations: [VNotFoundComponent],
  imports: [
    CommonModule,
    VNotFoundRoutingModule
  ]
})
export class VNotFoundModule { }
