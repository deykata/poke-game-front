import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArenaGuard } from './shared/guards/arena.guard';

const routes: Routes = [
  { 
    path: '',
    redirectTo: 'settings',
    pathMatch: 'full'
  }, // redirect to `settings`
  { 
    path: 'settings',
    loadChildren: () => import('./views/v-settings/v-settings.module').then(m => m.VSettingsModule)
  },
  { 
    path: 'arena', 
    loadChildren: () => import('./views/v-arena/v-arena.module').then(m => m.VArenaModule),
    canLoad: [ArenaGuard]
  },
  { 
    path: '**',
    loadChildren: () => import('./views/v-not-found/v-not-found.module').then(m => m.VNotFoundModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
