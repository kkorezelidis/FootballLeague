export interface League {
  id: number;
  name: string;
}

export interface Ranking {
  draws: number;
  goalsAgainst: number;
  goalsFor: number;
  loss: number;
  matchesPlayed: number;
  points: number;
  teamId: number;
  teamName: string;
  wins: number;
}
