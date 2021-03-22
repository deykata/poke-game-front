import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VSettingsComponent } from './v-settings.component';

const routes: Routes = [{ path: '', component: VSettingsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VSettingsRoutingModule { }
