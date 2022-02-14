const readline = require('readline');

const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Game {
    constructor(towers) {
        this.towers = towers;
    }

    promptMove() {
        console.log(this.towers);
        reader.question("Please select a start tower: ", (answer) => {
            let startTower = parseInt(answer);
            reader.question("Please select an end tower: ", (answer) => {
                let endTower = parseInt(answer);
                this.move(startTower, endTower);
                reader.close();
            });
        });
    }

    isValidMove(startTower, endTower) {
        if (this.towers[startTower].length === 0) {
            return false;
        }

        let targetDisk = this.towers[startTower][this.towers[startTower].length - 1];

        if (this.towers[endTower][this.towers[endTower].length - 1] > targetDisk) {
            return false;
        }

        return true;
    }

    move(startTower, endTower) {
        if (this.isValidMove(startTower, endTower)) {
            let targetDisk = this.towers[startTower].pop();
            this.towers[endTower].push(targetDisk);
            return true;
        }

        return false;
    }
}


let towers = {
    0: [3, 2, 1],
    1: [],
    2: []
};

const game = new Game(towers);

game.promptMove();