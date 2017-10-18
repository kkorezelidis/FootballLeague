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
    this.rankingCols = ['teamName', 'matchesPlayed', 'points', 'wins', 'draws', 'loss', 'goalsFor', 'goalsAgainst'];
    this.eventCols = ['homeTeam', 'awayTeam', 'score'];

    const screenWidth = window.innerWidth;

    if (screenWidth < 480){
      this.rankingColNames = ['Ο', 'Α', 'Β', 'Ν', 'Ι', 'Ή', 'ΓΥ', 'ΓΚ'];
    }else {
      this.rankingColNames = ['Ομάδα', 'Αγώνες', 'Βαθμοί', 'Νίκες', 'Ισοπαλίες', 'Ήττες', 'Γκολ Υπέρ', 'Γκόλ Κατά'];
    }
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
  }
}
