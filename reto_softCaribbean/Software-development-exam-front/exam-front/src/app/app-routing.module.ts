import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { ClientFindComponent } from './client-find/client-find.component';
import { HomeComponent } from './home/home.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'clients', component: ClientesComponent},
  {path: 'clientFind', component: ClientFindComponent},
  {path: 'clients/client-detail/:document', component: ClientDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
