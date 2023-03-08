import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserGames } from '../models/games';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    userGames: UserGames[] = [];

    userGamesId: any;

    constructor(private http: HttpClient) {}

    getGames(): Observable<any> {
        return this.http.get('http://localhost:3000/games');
    }

    getUserGames(): Observable<any> {
        return this.http.get('http://localhost:3000/user_games');
    }

    subscribe = this.getUserGames().subscribe((data: UserGames[]) => {
        this.userGames = data;
        this.userGamesId = this.userGames.length + 1;
    });

    addUserGame(userId: number, gameId: number): Observable<any> {
        ++this.userGamesId;
        return this.http.post('http://localhost:3000/user_games', {
            id: this.userGamesId,
            userId,
            gameId,
            status: 'plan to play',
            platform: 'PC',
            rating: '',
        });
    }

    login(email: string, password: string): Observable<any> {
        return this.http.post('http://localhost:3000/login', {
            email,
            password,
        });
    }
}
