import {Component, OnInit} from '@angular/core';
import {Card} from './card/interfaces/card';
import {MatDialog} from '@angular/material/dialog';
import {RestartDialogComponent} from './restart-dialog/restart-dialog.component';

@Component({
  selector: 'memory-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  titleApp = 'Memory';
  readyToPlay = false;
  isLoading = false;

  cardImagesUrl = [
    'assets/img1.jpg',
    'assets/img2.jpg',
    'assets/img3.jpg',
    'assets/img4.jpg',
    'assets/img5.jpg',
    'assets/img6.jpg',
  ];

  cards: Card[] = [];
  flippedCards: Card[] = [];
  cardsLoaded = false;
  matchedCount = 0;
  movesCount = 0;

  constructor(
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.setupCards();
  }

  private shuffleArray(anArray: any[]): any[] {
    return anArray.map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
  }

  /**
   * Funzione di inizio del gioco
   */
  private setupCards(): void {
    this.cards = [];
    // utilizzo l'url come id dell'oggeto Card
    this.cardImagesUrl.forEach((imageUrl) => {
      const cardData: Card = {
        imageId: imageUrl,
        state: 'default',
        isLoaded: false
      };
      // per ogni carta ne faccio un doppione
      this.cards.push({...cardData});
      this.cards.push({...cardData});
    });

    this.cards = this.shuffleArray(this.cards);
    this.cardsLoaded = true;
  }

  /**
   * Funziona che verifica se le 2 carte selezionate sono identiche
   * Se abbiamo scoperto tutte le carte chiama la funzione di restart
   */
  private checkForCardMatch(): void {
    setTimeout(() => {
      const cardOne = this.flippedCards[0];
      const cardTwo = this.flippedCards[1];
      if (cardOne && cardTwo) {
        const nextState = cardOne.imageId === cardTwo.imageId ? 'matched' : 'default';
        cardOne.state = cardTwo.state = nextState;
        this.movesCount++;
        this.flippedCards = [];

        if (nextState === 'matched') {
          this.matchedCount++;

          if (this.matchedCount === this.cardImagesUrl.length) {
            const dialogRef = this.dialog.open(RestartDialogComponent, {
              disableClose: true,
              data: { movesCount: this.movesCount },
            });

            dialogRef.afterClosed().subscribe(_ => {
              this.restart();
            });
          }
        }
        this.isLoading = false;
      }
    }, 5000);
  }

  start() {
    this.isLoading = true;
    setTimeout(() => {
      this.readyToPlay = true;
      this.isLoading = false;
    }, 1000);
  }

  /**
   * Funzione di click della singola carta
   * @param index Indice dell'array delle carte
   */
  cardClicked(index: number): void {
    const cardInfo = this.cards[index];

    if (cardInfo.state === 'default' && this.flippedCards.length < 2) {
      cardInfo.state = 'flipped';
      this.flippedCards.push(cardInfo);

      if (this.flippedCards.length > 1) {
        this.isLoading = true;
        this.checkForCardMatch();
      }

    } else if (cardInfo.state === 'flipped' && this.flippedCards.length <= 2) {
      return;
    } else if (cardInfo.state === 'flipped') {
      this.isLoading = false;
      cardInfo.state = 'default';
      this.flippedCards.pop();
    }
  }

  /**
   * Funzione che permette di ripartire con il gioco
   */
  restart(): void {
    this.matchedCount = 0;
    this.readyToPlay = false;
    this.setupCards();
  }

}
