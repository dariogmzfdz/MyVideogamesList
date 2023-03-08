export class Game {
    constructor(
        public gameId: number,
        public name: string,
        public image: string,
    ) { }
}

export class UserGames {
    constructor(
        public id: number,
        public userId: number,
        public gameId: number,
        public status: string,
        public platform: string,
        public rating: number,
        public game: Game | undefined,
    ) { }
}

export class User {
    constructor(
        public id: number,
        public username: string,
        public password: string,
    ) { }
}