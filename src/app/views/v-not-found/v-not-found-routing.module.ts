import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VNotFoundComponent } from './v-not-found.component';

const routes: Routes = [{ path: '', component: VNotFoundComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VNotFoundRoutingModule { }
