import { Injectable } from '@angular/core';
import { MdDialog } from '@angular/material';
import { DialogComponent } from './dialog.component';

@Injectable()
export class DialogService {

  constructor(private dialog: MdDialog) { }

  openDialog(title, content, buttonAccept, buttonReject, acceptFunc?, rejectFunc?) {
    this.dialog.open(DialogComponent, {
      // height: '350px',
      data: {
        title,
        content,
        buttonAccept,
        buttonReject,
        acceptFunc
      }
    });
  }
}
