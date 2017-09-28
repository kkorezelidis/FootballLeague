import { Component, ViewChild } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

const flags = {
  GREEK: 'flag-icon-gr',
  ENGLISH: 'flag-icon-gb'
};

const langs = {
  GR: 'gr',
  EN: 'en'
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  flag: string = flags.ENGLISH;
  @ViewChild('sidenav') sidenav;
  constructor(private router: Router, private translate: TranslateService) {
    this.setDefaultLang();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.sidenav.close();
      }
    });
  }

  private setDefaultLang() {
    this.translate.setDefaultLang(langs.GR);
    this.translate.use(langs.GR);
  }

  public toggleLanguage() {
    switch (this.translate.currentLang) {
      case 'en':
        this.translate.use(langs.GR);
        this.flag = flags.ENGLISH;
        break;
      case 'gr':
        this.translate.use(langs.EN);
        this.flag = flags.GREEK;
        break;
    }
  }
}
