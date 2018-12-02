import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovesComponent } from './moves/moves.component';
import { MoveStartComponent } from './moves/move-start/move-start.component';
import { MoveEditComponent } from './moves/move-edit/move-edit.component';
import { MoveDetailComponent } from './moves/move-detail/move-detail.component';
import { MoveListComponent } from './moves/move-list/move-list.component';
import { SuppliesComponent } from './supplies/supplies.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    MovesComponent,
    MoveStartComponent,
    MoveEditComponent,
    MoveDetailComponent,
    MoveListComponent,
    SuppliesComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
