import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Game } from 'src/app/models/games';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  games: Game[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getGames().subscribe((data: Game[]) => {
      this.games = data;
    });
  }

}
