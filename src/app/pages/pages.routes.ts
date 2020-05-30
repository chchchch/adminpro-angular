import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../services/guards/admin.guard';
import { NopagefoundComponent } from '../shared/nopagefound/nopagefound.component';
import { ForbiddonComponent } from '../shared/forbiddon/forbiddon.component';



const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
          {path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard'}},
          {path: 'progress', component: ProgressComponent, data: { titulo: 'Progress'}},
          {path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas'}},
          {path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'}},
          {path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs'}},
          {path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del tema'}},
          {path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario'}},
          {path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador'}},/* 
          {path: '/pagenofound', component: NopagefoundComponent, data: { titulo: '404-NotFound'}}, */
          {path: 'forbiddon', component: ForbiddonComponent},
          // Mantenimientos
          {path: 'usuarios', component: UsuariosComponent, canActivate: [ AdminGuard ] ,data: { titulo: 'Mantenimiento de usuarios'}},
          {path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de hospitales/clínicas'}},
          {path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de médicos'}},
          {path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar médico'}},
          {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
        ]
      }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes);