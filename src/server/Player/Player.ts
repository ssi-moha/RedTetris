
class Player {
    public name: string;
    public room: string;
    public score: number;

    constructor(name: string, room: string) {
        this.name = name;
        this.room = room;
        this.score = 0;
    }
}

export default Player;