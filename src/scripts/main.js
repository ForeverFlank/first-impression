'use strict';

import { Game } from "./game.js"
import { GameUI } from "./ui.js";

function main() {
    let game = new Game();
    game.gameLoop();
    // game.uiLoopStart();

    let gameUI = new GameUI(game);
    gameUI.init();
    gameUI.bind();
    gameUI.startLoop();

}


export { main }