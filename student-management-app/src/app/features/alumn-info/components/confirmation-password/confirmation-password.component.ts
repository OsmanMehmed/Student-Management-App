import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-password',
  templateUrl: './confirmation-password.component.html',
  styleUrls: ['./confirmation-password.component.scss']
})
export class ConfirmationPasswordComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmationPasswordComponent>) { }

  ngOnInit(): void {
  }


  closeDialogAccepting(){
    this.dialogRef.close(true);
  }

  closeDialogCanceling(){
    this.dialogRef.close(false);
  }

}
