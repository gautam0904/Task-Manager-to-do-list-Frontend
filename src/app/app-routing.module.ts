import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { HorizontalComponent } from './layout/horizontal/horizontal.component';
import { LayoutModule } from './layout/layout.module';

const routes: Routes = [
  {
    path : '',
    redirectTo : '/page',
    pathMatch : 'full'
  },
  {
    path : 'page',
    component : HorizontalComponent,
    loadChildren: () => import('./page/page.module').then(m => m.PageModule),
    canActivate : [authGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes), LayoutModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
