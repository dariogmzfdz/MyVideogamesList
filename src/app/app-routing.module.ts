import { MainPageComponent } from './pages/main-page/main-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { YourGamesComponent } from './pages/your-games/your-games.component';

const routes: Routes = [
  { path: '', component: MainPageComponent},
  { path: 'login', component: LoginComponent },
  { path: 'your-games', component: YourGamesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
