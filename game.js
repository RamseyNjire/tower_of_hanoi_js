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
                console.log(`Moving from ${startTower} to ${endTower}`);
                reader.close();
            });
        });
    }
}


let towers = {
    0: [3, 2, 1],
    1: [],
    2: []
};

const game = new Game(towers);

game.promptMove();