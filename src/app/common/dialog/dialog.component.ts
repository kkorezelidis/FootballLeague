import { Inject, Component } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
  templateUrl: 'dialog.component.html',
  styleUrls: ['dialog.component.scss']
})
export class DialogComponent {
  constructor(@Inject(MD_DIALOG_DATA) public data: any) {}
}
