
class Games {
    constructor() {
        this.games = [];
        this.players = [];
    }

    addQuiz(host, roomName, difficulty, count, subject) {
        let quiz = {
            host: host,
            room: roomName,
            difficult: difficulty,
            count: count,
            subject: subject,
            players: [],
            active: false
        }

        this.games.push(quiz);

        this.games.forEach(room => console.log(room))
        return quiz;
    }

    addPlayer (username, room, hostID) {
        let player = {
            username: username,
            roomName: room,
            roomID: hostID,
            score: 0
        }

        this.players.push(player);
        let quiz = this.games.find(y => y.room == room)
        try{
          quiz.players.push(player) //push player user in players array
        } catch (err) {
            console.log(err);
            return { error: err}
        }
    }

    getGame (roomName) {
        let game = this.games.find( y => y.room == roomName);   //find game by roomName from constructor games[]
        return game;
    } 

}

module.exports = { Games }
