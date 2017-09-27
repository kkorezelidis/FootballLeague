import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdButtonModule,
  MdCheckboxModule,
  MatDatepickerModule,
  MdNativeDateModule,
  MdIconModule,
  MdIconRegistry,
  MdSidenavModule,
  MdListModule
} from '@angular/material';
import { AppComponent } from './app.component';
import { HomePageComponent } from './homepage/homepage';
import { LeaderBoardComponent } from './leaderboard/leaderboard';
import 'hammerjs';

const appRoutes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomePageComponent },
  { path: 'leaderboard', component: LeaderBoardComponent }
];

@NgModule({
  declarations: [AppComponent, LeaderBoardComponent, HomePageComponent],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    MatDatepickerModule,
    MdNativeDateModule,
    MdIconModule,
    MdSidenavModule,
    MdListModule
  ],
  providers: [MdIconRegistry],
  bootstrap: [AppComponent]
})
export class AppModule {}
