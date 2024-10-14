import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';
import {FormsModule} from "@angular/forms";
import { GameItemComponent } from './components/game/game-item/game-item.component';
import { CongratulationModalComponent } from './components/congratulation-modal/congratulation-modal.component';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    GameItemComponent,
    CongratulationModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatInput,
    MatLabel,
    MatFormField
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
