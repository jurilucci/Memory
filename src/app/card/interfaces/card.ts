export interface Card {
  imageId: string;
  state: 'default' | 'flipped' | 'matched';
  isLoaded: boolean;
}
