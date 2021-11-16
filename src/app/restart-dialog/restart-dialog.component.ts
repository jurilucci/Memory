import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'memory-restart-dialog',
  template: `
    <h2 mat-dialog-title>Congratulazioni!</h2>
    <mat-dialog-content class="mat-typography">
      Hai completato il gioco in {{data.movesCount}} mosse.
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-raised-button color="primary" [mat-dialog-close]="true">Gioca ancora</button>
    </mat-dialog-actions>
  `,
  styles: [
  ]
})
export class RestartDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RestartDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { movesCount: number },
  ) {}

  ngOnInit(): void {
  }

}
