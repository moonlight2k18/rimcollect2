import { NgModule, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EnquetteursComponent } from './components/enquetteurs/enquetteurs.component';
import { OutputComponent } from './components/output/output.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {path: 'enquetteurs', component: EnquetteursComponent, pathMatch: 'full'},
  {path: 'output', component: OutputComponent, pathMatch: 'full'},
  {path: 'home', component: HomeComponent, pathMatch: 'full'},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'home', pathMatch: 'full'},
]

@NgModule({
  imports: [RouterModule.forRoot(routes) ],//CommonModule
  exports: [RouterModule]

})
export class AppRoutingModule {



 }
