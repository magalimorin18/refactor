export interface Play {
  name: string;
  type: string;
}

export interface Plays {
  [key: string]: Play; // Index signature to allow multiple plays
}

export interface Performance {
  playID: string;
  audience: number;
}

export interface Invoice {
  customer: string;
  performances: Performance[];
}
