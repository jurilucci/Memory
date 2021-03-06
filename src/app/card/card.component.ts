import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Card} from './interfaces/card';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'memory-card',
  template: `
    <div [hidden]="!data.isLoaded" [ngClass]="data.state === 'matched' ? 'card border-success' : 'card'" (click)="cardClicked.emit()" [@cardFlip]="data.state">
      <div class="back">
        <img alt="backImage" src="assets/card-back.jpg" (load)="data.isLoaded = true">
      </div>
      <div class="front">
        <img alt="frontImage" [src]="data.imageId">
      </div>
    </div>
  `,
  styles: [
  `
    :host {
      display: block;
    }

    .card {
      -webkit-box-shadow: 10px 10px 43px -18px rgba(0, 0, 0, 0.75);
      -moz-box-shadow: 10px 10px 43px -18px rgba(0, 0, 0, 0.75);
      box-shadow: 10px 10px 43px -18px rgba(0, 0, 0, 0.75);
      border-radius: 5px;
      border: 2px solid white;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 200px;
      cursor: pointer;
      position: relative;
      -webkit-transform-style: preserve-3d;
      transform-style: preserve-3d;
    }

    .border-success {
      border: 2px solid chartreuse !important;
    }

    .back,
    .front {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }

    .back {
      -webkit-transform: rotateY(0deg);
      -moz-transform: rotateY(0deg);
      -ms-transform: rotateY(0deg);
      transform: rotateY(0deg);
    }

    .front {
      -webkit-transform: rotateY(180deg);
      -moz-transform: rotateY(180deg);
      -ms-transform: rotateY(180deg);
      transform: rotateY(180deg);
      pointer-events: none;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 5px;
    }
  `
  ],
  animations: [
    trigger('cardFlip', [
      state('default', style({
        transform: 'none',
      })),
      state('flipped', style({
        transform: 'rotateY(180deg)'
      })),
      state('matched', style({
        transform: 'rotateY(180deg)'
      })),
      transition('default => flipped', [
        animate('400ms')
      ]),
      transition('flipped => default', [
        animate('400ms')
      ]),
      transition('* => matched', [
        animate('400ms')
      ])
    ])
  ]
})
export class CardComponent {

  @Input() data!: Card;

  @Output() cardClicked = new EventEmitter();

  constructor() { }
}
