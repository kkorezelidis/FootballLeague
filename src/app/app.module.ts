import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdButtonModule,
  MdCheckboxModule,
  MatDatepickerModule,
  MdNativeDateModule,
  MdIconModule,
  MdIconRegistry,
  MdSidenavModule,
  MdListModule,
  MdTableModule,
  MdSortModule
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

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [AppComponent, LeaderBoardComponent, HomePageComponent],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    ),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    BrowserModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    MatDatepickerModule,
    MdNativeDateModule,
    MdIconModule,
    MdSidenavModule,
    MdListModule,
    MdTableModule,
    MdSortModule
  ],
  providers: [MdIconRegistry],
  bootstrap: [AppComponent]
})
export class AppModule {}
