import { User } from './../../models/games';
import { TokenStorageService } from './../../services/token-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private tokenStorageService: TokenStorageService) { }

  user = this.tokenStorageService.decodeToken();

  isLogged = this.tokenStorageService.isLogged();

  currentEndpoint = window.location.href.slice(window.location.href.lastIndexOf('/') + 1);

  isInLogin = this.currentEndpoint === 'login' ? true : false;
  
  ngOnInit(): void {
  }

  LogOut() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
