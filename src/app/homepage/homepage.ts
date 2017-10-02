import { Component } from '@angular/core';
import { DialogService } from '../common/dialog/dialog.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.html',
  styleUrls: ['./homepage.scss']
})
export class HomePageComponent {
  constructor(private dialogService: DialogService) {

  }
}
