const readline = require('readline');

const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Game {
    constructor(towers) {
        this.towers = towers;
    }

    promptMove(move_handler) {
        console.log(this.towers);
        reader.question("Please select a start tower: ", (answer) => {
            let startTower = parseInt(answer);
            reader.question("Please select an end tower: ", (answer) => {
                let endTower = parseInt(answer);
                move_handler(startTower, endTower);
            });
        });
    }
}


let towers = {
    0: [3, 2, 1],
    1: [],
    2: []
};

const move_handler = function(start_tower, end_tower) {
    console.log(`Moving from ${start_tower} to ${end_tower}`);
    reader.close();
}

const game = new Game(towers);

game.promptMove(move_handler);