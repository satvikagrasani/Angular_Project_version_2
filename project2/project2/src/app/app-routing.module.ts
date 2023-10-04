import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmpeditComponent } from './empedit/empedit.component';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './auth.guard';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'list', component: ListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard] },
  { path: 'empedit/:id', component: EmpeditComponent },
  // Lazy load PagenotfoundModule for any unknown routes
  {path:'**',component:PagenotfoundComponent}
  // { path: '**', loadChildren: () => import('./pagenotfound/pagenotfound.module').then(m => m.PagenotfoundModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
