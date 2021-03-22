import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VSettingsRoutingModule } from './v-settings-routing.module';
import { VSettingsComponent } from './v-settings.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [VSettingsComponent],
  imports: [
    CommonModule,
    VSettingsRoutingModule,
    FormsModule,
    TranslateModule,
    ComponentsModule
  ]
})
export class VSettingsModule { }
