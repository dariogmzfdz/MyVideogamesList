import { TokenStorageService } from './../../services/token-storage.service';
import { DataService } from './../../services/data.service';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserGames, Game } from 'src/app/models/games';

@Component({
    selector: 'app-your-games',
    templateUrl: './your-games.component.html',
    styleUrls: ['./your-games.component.css'],
})
export class YourGamesComponent implements AfterViewInit {
    displayedColumns: string[] = ['position', 'name', 'status', 'platform'];
    dataSource = new MatTableDataSource();

    userGames: UserGames[] = [];
    games: Game[] = [];
    ug: any;

    isLogged = this.tokenStorageService.isLogged();

    constructor(
        private dataService: DataService,
        private tokenStorageService: TokenStorageService
    ) {}

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngOnInit(): void {
      
      
      const userId = this.tokenStorageService.decodeToken().userId;
      this.dataService.getGames().subscribe((data: Game[]) => {
            this.games = data;
            console.log(this.games);
            
            this.dataService.getUserGames().subscribe((data: UserGames[]) => {
                this.userGames = data;
                console.log(this.userGames);
                
                this.userGames.forEach(
                    (ug) =>
                        (ug.game = this.games.find(
                            (g) => g.gameId === ug.gameId
                        ))
                );
                this.dataSource.data = this.userGames.filter((ug) => (ug.userId === userId));
                console.log(this.dataSource.data.length);
            });
        });
        console.log(userId);
        
    }

    ngAfterViewInit() {
        this.dataSource.paginator =  this.paginator;
    }

    applyFilterStatus(event: Event) {
      if ((event.target as HTMLInputElement).value === 'completed') {
        (event.target as HTMLInputElement).value = 'plan to play';
        (event.target as HTMLInputElement).innerHTML = 'Status: Plan to play';
      } else if ((event.target as HTMLInputElement).value === 'plan to play') {
        (event.target as HTMLInputElement).value = 'playing';
        (event.target as HTMLInputElement).innerHTML = 'Status: Playing';
      } else if ((event.target as HTMLInputElement).value === 'playing') {
        (event.target as HTMLInputElement).value = '';
        (event.target as HTMLInputElement).innerHTML = 'Status: All';
      } else {
        (event.target as HTMLInputElement).value = 'completed';
        (event.target as HTMLInputElement).innerHTML = 'Status: Completed';
      }
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    applyFilterPlatform(event: Event) {
      if ((event.target as HTMLInputElement).value === 'Xbox') {
        (event.target as HTMLInputElement).value = 'PC';
        (event.target as HTMLInputElement).innerHTML = 'Platform: PC';
      } else if ((event.target as HTMLInputElement).value === 'PC') {
        (event.target as HTMLInputElement).value = 'PS5';
        (event.target as HTMLInputElement).innerHTML = 'Platform: PS5';
      } else if ((event.target as HTMLInputElement).value === 'PS5') {
        (event.target as HTMLInputElement).value = '';
        (event.target as HTMLInputElement).innerHTML = 'Platform: All';
      } else {
        (event.target as HTMLInputElement).value = 'Xbox';
        (event.target as HTMLInputElement).innerHTML = 'Platform: Xbox';
      }
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    hideContent() {
      if (this.dataSource.data.length === 0) {
        return true;
      } else {
        return false;
      }
    }
}
