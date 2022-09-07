
class Games {
    constructor() {
        this.games = [];
        this.players = [];
    }

    addGame(host, roomName, difficulty, count, subject) {
        let game = {
            host: host,
            room: roomName,
            difficult: difficulty,
            count: count,
            subject: subject,
            players: [],
            active: false
        }

        this.games.push(game);

        this.games.forEach(room => console.log(room))
        return game;
    }

    addPlayer (username, room, hostID) {
        let player = {
            username: username,
            roomName: room,
            roomID: hostID,
            score: 0
        }

        this.players.push(player);
        let game = this.games.find(y => y.room == room)
        try{
          game.players.push(player) //push player user in players array
        } catch (err) {
            console.log(err);
            return { error: err};
        }
    }

    getGame (roomName) {
        let game = this.games.find( y => y.room == roomName);   //find game by roomName from constructor games[]
        return game;
    } 

    joinRoom (roomName) {
        console.log('finding room...');
        const game = this.games.filter (game => {
            console.log(game.room === roomName);
            return game.room === roomName
        });

        if (game.length > 0) {
            return game;
        } else {
            return 'Error. Room cannot be found.'
        }
    }

    findGameRoom(roomName) {
        this.games.forEach(game => console.log(game))
        const game = this.games.filter(game => {
            console.log(game.room === roomName);
            return game.room === roomName;
        })

        return game;
    }

}

module.exports = { Games }
