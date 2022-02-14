const readline = require('readline');

const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Game {
    constructor(towers) {
        this.towers = towers;
    }

    promptMove(callbackFunction) {
        this.print();
        reader.question("Please select a start tower: ", (answer) => {
            let startTower = parseInt(answer);
            reader.question("Please select an end tower: ", (answer) => {
                let endTower = parseInt(answer);
                callbackFunction(startTower, endTower);
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
            reader.close();
            let targetDisk = this.towers[startTower].pop();
            this.towers[endTower].push(targetDisk);
            return true;
        } else {
            return false;
        }
    }

    print() {
        console.log(JSON.stringify(this.towers));
    }

    isWon() {
        if (this.towers[2].length === 3) {
            return true;
        }
        return false
    }

    run(completionCallback) {
        if(game.isWon()) {
            console.log("You win!");
            return completionCallback();
        }
        this.promptMove(
            (startTower, endTower) => {
                if(this.move(startTower, endTower)) {
                    this.run();
                } else {
                    console.log("Invalid move!");
                    this.run();
                }
            }
        );
    }
}


let towers = {
    0: [3, 2, 1],
    1: [],
    2: []
};

const game = new Game(towers);

game.run();
