import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-your-game-card',
  templateUrl: './your-game-card.component.html',
  styleUrls: ['./your-game-card.component.css']
})
export class YourGameCardComponent implements OnInit {

  @Input() userGame: any;

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

  userId = this.tokenStorageService.decodeToken().sub;

  ngOnInit(): void {
    
  }

  changeStatus() {
    if (this.userGame.status === 'plan to play') {
        this.userGame.status = 'playing';
    } else if (this.userGame.status === 'playing') {
        this.userGame.status = 'completed';
    } else if (this.userGame.status === 'completed') {
        this.userGame.status = 'plan to play';
    }

    this.http.put(`http://localhost:3000/user_games/${this.userGame.id}`, {userId: +this.userId, gameId: this.userGame.gameId , status: this.userGame.status, platform: this.userGame.platform, rating: ""}).subscribe((data) => {
        console.log(data);
    });

  }

  changePlatform() {
    if (this.userGame.platform === 'PC') {
        this.userGame.platform = 'PS5';
    } else if (this.userGame.platform === 'PS5') {
        this.userGame.platform = 'Xbox';
    } else if (this.userGame.platform === 'Xbox') {
        this.userGame.platform = 'PC';
    }

    this.http.put(`http://localhost:3000/user_games/${this.userGame.id}`, {userId: +this.userId, gameId: this.userGame.gameId , status: this.userGame.status, platform: this.userGame.platform, rating: ""}).subscribe((data) => {
        console.log(data);
    });
  }
}
