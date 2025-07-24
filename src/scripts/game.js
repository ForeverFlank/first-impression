'use strict';

import * as Const from "./constants.js";
import { Impressions, Tickets } from "./impressions.js";
import { format, ordinalWord } from "./notation.js";

class Game {
    constructor() {
        this.im = new Decimal(0);
        this.imRate = new Decimal(0);
        this.impressions = new Impressions();
        this.tickets = new Tickets();
    }

    gameInit() {
        this.impressions.count.setArg([this.tickets.upgrades.imBuyDiscounts]);
        this.impressions.tier.setArg([this.tickets.upgrades.imTierDiscounts]);
        document.getElementById("btn-ticket-per-reset").addEventListener("click", () => {
            let cost = this.tickets.upgrades.gainPerReset.getCost();
            if (this.tickets.amount - cost >= 0) {
                this.tickets.amount = this.tickets.amount - cost;
                this.tickets.upgrades.gainPerReset.value += 1;
            }
        });
    }

    gameStart() {
        this.im = new Decimal(0)
        // this.impressions.count.value = new Decimal(10);
        // this.impressions.tier.value = 2;
        // this.impressions.reset.value = 1
    }

    #imUpdate() {
        let num = this.impressions.count.value;
        num = num.mul(this.impressions.tier.value ** 2);
        num = num.pow(1 + 0.1 * this.impressions.reset.value);
        this.imRate = num;
        this.im = this.im.add(this.imRate.mul(Const.dt));

        /*
        this.impressions.buyImpression(this);
        this.impressions.buyUpgrade(this);
        this.impressions.buyReset(this);
        */
    }

    gameUpdate() {
        this.#imUpdate();
    }

    gameLoop() {
        this.gameInit();
        this.gameStart();
        this.gameLoop = setInterval(() => {
            this.gameUpdate()
        }, 1000 / Const.tickrate);
    }
}

export { Game }