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
        return this.http.get('http://localhost:5000/api/games/');
    }

    getUserGames(): Observable<any> {
        return this.http.get('http://localhost:5000/api/games/userGames/');
    }

    subscribe = this.getUserGames().subscribe((data: UserGames[]) => {
        this.userGames = data;
        this.userGamesId = this.userGames.length + 1;
    });

    addUserGame(userId: string, gameId: string): Observable<any> {
        return this.http.post('http://localhost:5000/api/games/addUserGame/', {
            userId,
            gameId,
            status: 'plan to play',
            platform: 'PC',
        });
    }

    updateUserGame(
        userId: string,
        gameId: string,
        status: string,
        platform: string
    ): Observable<any> {
        return this.http.put(
            'http://localhost:5000/api/games/updateUserGame/',
            {
                userId,
                gameId,
                status,
                platform,
            }
        );
    }

    login(email: string, password: string): Observable<any> {
        return this.http.post('http://localhost:5000/api/users/login/', {
            email,
            password,
        });
    }

    register(
        username: string,
        password: string,
        email: string,
        fullname: string,
        birthdate: string,
        deposit: number
    ): Observable<any> {
        return this.http.post('http://localhost:5000/api/users/register/', {
            username,
            password,
            email,
            fullname,
            birthdate,
            deposit,
        });
    }

    public isAdded(gameId: string, userId: string): boolean {
        let isAdded = false;
        console.log(this.userGames);
        
        this.userGames.forEach((game) => {
            if (game.gameId === gameId && game.userId === userId) {
                isAdded = true;
            }
        });
        return isAdded;
    }
}
