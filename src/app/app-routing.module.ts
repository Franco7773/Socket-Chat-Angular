import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { MensajesComponent } from './pages/mensajes/mensajes.component';
import { AuthGuard } from './services/guards/auth.guard';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'mensajes', component: MensajesComponent, canActivate: [ AuthGuard ] },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot( appRoutes, { useHash: true })],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
