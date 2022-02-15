class Game {
    constructor() {
        this.towers = [[3, 2, 1], [], []];
    }

    isValidMove(startTowerIndex, endTowerIndex) {
        const startTower = this.towers[startTowerIndex];
        const endTower = this.towers[endTowerIndex];

        if (startTower.length === 0) {
            return false;
        } else if (endTower.length == 0) {
            return true;
        } else {
            const topStartDisc = startTower[startTower.length - 1];
            const topEndDisc = endTower[endTower.length - 1];
            return topStartDisc < topEndDisc;
        }
    }

    isWon() {
        // move all the discs to the last or second tower
        return (this.towers[2].length == 3) || (this.towers[1].length == 3);
    }

    move(startTowerIndex, endTowerIndex) {
        if (this.isValidMove(startTowerIndex, endTowerIndex)) {
            this.towers[endTowerIndex].push(this.towers[startTowerIndex].pop());
            return true;
        } else {
            return false;
        }
    }

    print() {
        console.log(JSON.stringify(this.towers));
    }

    promptMove(reader, callback) {
        this.print();
        reader.question("Enter a starting tower: ", start => {
            const startTowerIndex = parseInt(start);
            reader.question("Enter an ending tower: ", end => {
                const endTowerIndex = parseInt(end);
                callback(startTowerIndex, endTowerIndex);
            });
        });
    }

    run(reader, gameCompletionCallback) {
        this.promptMove(reader, (startTowerIndex, endTowerIndex) => {
            if (!this.move(startTowerIndex, endTowerIndex)) {
                console.log("Invalid move!");
            }

            if (!this.isWon()) {
                // Continue to play!
                this.run(reader, gameCompletionCallback);
            } else {
                this.print();
                console.log("You win!");
                gameCompletionCallback();
            }
        });
    }
}

module.exports = Game;
