import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthRoutingModule } from './auth/register/auth.routing';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { PromesasComponent } from './pages/promesas/promesas.component';
import { RxjsComponent } from './pages/rxjs/rxjs.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'} },
      { path: 'grafica1', component: Grafica1Component, data: {titulo: 'Gráfica 1'} },
      { path: 'progress', component: ProgressComponent, data: {titulo: 'Progress Bar'} },
      { path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes'} },
      { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'} },
      { path: 'rxjs', component: RxjsComponent, data: {titulo: 'Rxjs'} },
      { path: 'perfil', component: PerfilComponent, data: {titulo: 'Perfil'} },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
    ]
   },
  { path: '**', component: NopagefoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
