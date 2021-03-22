import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VArenaRoutingModule } from './v-arena-routing.module';
import { VArenaComponent } from './v-arena.component';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [VArenaComponent],
  imports: [
    CommonModule,
    VArenaRoutingModule,
    TranslateModule,
    ComponentsModule
  ]
})
export class VArenaModule { }
