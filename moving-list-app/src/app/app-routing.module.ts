import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoveStartComponent } from './moves/move-start/move-start.component';
import { MoveEditComponent } from './moves/move-edit/move-edit.component';
import { MoveDetailComponent } from './moves/move-detail/move-detail.component';
import { MovesComponent } from './moves/moves.component';
import { SuppliesComponent } from './supplies/supplies.component';

const appRoutes: Routes = [
    {path: '', redirectTo: '/moves', pathMatch: 'full'},
    {path: 'moves', component: MovesComponent, children: [
      {path: '', component: MoveStartComponent},
      {path: 'new', component: MoveEditComponent},
      {path: ':id', component: MoveDetailComponent},
      {path: ':id/edit', component: MoveEditComponent},
    ]},
    {path: 'supplies', component: SuppliesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
