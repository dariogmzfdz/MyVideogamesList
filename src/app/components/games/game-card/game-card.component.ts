import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent implements OnInit {
  
  @Input() game: any;
  
  
  constructor(private dataService: DataService, private tokenStorageService: TokenStorageService) { }

  userId = this.tokenStorageService.decodeToken().userId;

  isAdded = false;
  
  ngOnInit(): void {
    console.log(this.game);
    const isAdded = this.dataService.isAdded(this.game.gameId, this.userId);
    if (isAdded) {
      this.isAdded = true;
    }
    console.log(this.isAdded);
    
  }
  
  addGame() {
    const userId = this.tokenStorageService.decodeToken().userId;
    const gameId = this.game.gameId;

    this.dataService.addUserGame(userId, gameId).subscribe((data) => {
      console.log(data);
    });

    this.isAdded = true;
  }

}
