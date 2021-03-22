import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VArenaComponent } from './v-arena.component';

const routes: Routes = [{ path: '', component: VArenaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VArenaRoutingModule { }
