import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { LoaderService } from './common/loader/loader.service';
import { LoaderComponent } from './common/loader/loader.component';
import { TableComponent } from './common/table/table.component';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatIconModule,
  MatIconRegistry,
  MatSidenavModule,
  MatListModule,
  MatTableModule,
  MatSortModule,
  MatInputModule,
  MatTabsModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatDialogModule,
  MatGridListModule
} from '@angular/material';
import { AppComponent } from './app.component';
import { HomePageComponent } from './homepage/homepage';
import { LeagueComponent } from './league/league';
import 'hammerjs';
import { DialogService } from './common/dialog/dialog.service';
import { DialogComponent } from './common/dialog/dialog.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: 'homepage', component: HomePageComponent },
  { path: 'league', component: LeagueComponent }
];

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LeagueComponent,
    HomePageComponent,
    LoaderComponent,
    TableComponent,
    DialogComponent
  ],
  entryComponents: [
    DialogComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
      // { enableTracing: true } // <-- debugging purposes only
    ),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatTabsModule,
    MatSelectModule,
    FormsModule,
    HttpModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatGridListModule
  ],
  exports: [LoaderComponent, DialogComponent, TableComponent],
  providers: [MatIconRegistry, LoaderService, DialogService],
  bootstrap: [AppComponent]
})
export class AppModule {}
