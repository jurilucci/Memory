import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'memory-restart-dialog',
  template: `
    <h2 mat-dialog-title>Congratulazioni!</h2>
    <mat-dialog-content class="mat-typography">
      Hai completato il gioco.
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-raised-button color="primary" [mat-dialog-close]="true">Gioca ancora</button>
    </mat-dialog-actions>
  `,
  styles: [
  ]
})
export class RestartDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
