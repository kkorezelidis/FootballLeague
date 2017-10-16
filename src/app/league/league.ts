import { Component, OnInit } from '@angular/core';
import { LeaguedService } from './league.service';
import { map, transform } from 'lodash';

@Component({
  selector: 'app-league',
  templateUrl: './league.html',
  styleUrls: ['./league.scss'],
  providers: [LeaguedService]
})
export class LeagueComponent implements OnInit {
  constructor(private leagueService: LeaguedService) {}

  leagues: Array<any>;
  rankingCols: Array<string>;
  eventCols: Array<string>;
  rankingColNames: Array<string>;
  eventColNames: Array<string>;
  selectedLeague: number;
  rankingData: Array<object>;
  eventData: Array<object>;

  ngOnInit() {
    this.rankingCols = ['teamName', 'points', 'matchesPlayed', 'wins', 'draws', 'loss', 'goalsFor', 'goalsAgainst'];
    this.eventCols = ['homeTeam', 'awayTeam', 'score'];
    this.rankingColNames = ['Ομάδα', 'Πόντοι', 'Παιχνίδια', 'Νίκες', 'Ισσοπαλίες', 'Ήτες', 'Γκολ (Ε)', 'Γκόλ (Δ)'];
    this.eventColNames = ['Γηπεδούχος', 'Φιλοξενούμενος', 'Σκορ'];
    this.leagueService.getLeagues().subscribe(leagues => {
      this.leagues = leagues;
      this.selectedLeague = leagues[0].id;
      this.getRanking();
    }, (error) => {
      console.log('er', error);
    });
  }

  onChange() {
    this.getRanking();
  }

  private getRanking() {
    this.leagueService.getRankings(this.selectedLeague).subscribe((ranking) => {
      this.rankingData = ranking;
    });
    this.leagueService.getEvents(this.selectedLeague).subscribe((events) => {
      map(events, (event) => {
        event['awayTeam'] = event['awayTeam']['name'];
        event['homeTeam'] = event['homeTeam']['name'];
        event['score'] = (event['homeGoals'] !== undefined) ? `${event['homeGoals']}-${event['awayGoals']}` : 'Αναμένεται';
      });

      this.eventData = events;
    });
    // this.leagueService.getRankings.
    // console.log('this.rankingData', );
  }
}
