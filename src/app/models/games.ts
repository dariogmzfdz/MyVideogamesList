export class Game {
    constructor(
        public gameId: string,
        public name: string,
        public image: string,
    ) { }
}

export class UserGames {
    constructor(
        public userId: string,
        public gameId: string,
        public status: string,
        public platform: string,
        public game: Game | undefined,
    ) { }
}

export class User {
    constructor(
        public userId: string,
        public username: string,
        public password: string,
    ) { }
}