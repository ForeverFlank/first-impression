'use strict';

import { Item } from "./item.js";

class Impressions {
    constructor() {
        this.count = new Item(
            new Decimal(0),
            (val, arg) => {
                if (val.cmp(0) == 0) {
                    return new Decimal(0);
                }
                if (val.cmp(1) == 0) {
                    return new Decimal(5);
                }
                if (val.cmp(2) == 0) {
                    return new Decimal(6);
                }
                if (val.cmp(3) == 0) {
                    return new Decimal(8);
                }
                let imBuyDiscounts = arg[0];
                return new Decimal(2).pow(val).mul(0.9 ** imBuyDiscounts.value);
            }
        );
        this.tier = new Item(
            1,
            (val, arg) => {
                let imTierDiscounts = arg[0];
                let base = 1.5 + 1 ;
                return 40 * 2.5 ** (val) * 0.9 ** imTierDiscounts.value;
            }
        );
        this.reset = new Item(
            0,
            (val, arg) => 10000 * 10 ** val
        );
    }

    buyImpression(game) {
        let cost = game.impressions.count.getCost();
        if (game.im.cmp(cost) >= 0) {
            game.impressions.count.value = game.impressions.count.value.add(1);
            game.im = game.im.sub(cost);
        }
    }

    buyUpgrade(game) {
        let cost = game.impressions.tier.getCost();
        if (game.im.cmp(cost) >= 0) {
            game.impressions.tier.value += 1;
            game.impressions.count.value = new Decimal(0);
            game.im = new Decimal(0);
        }
    }

    buyReset(game) {
        let cost = game.impressions.reset.getCost();
        if (game.im.cmp(cost) >= 0) {
            game.impressions.reset.value += 1;
            game.impressions.tier.value = 1;
            game.impressions.count.value = new Decimal(0);
            game.im = new Decimal(0);
            game.tickets.amount += game.tickets.upgrades.gainPerReset.value;
        }
    }
}

class Tickets {
    constructor() {
        this.amount = 0,
        this.upgrades = {
            imBuyDiscounts: new Item(
                0,
                (value, arg) => 3 ** value
            ),
            imTierDiscounts: new Item(
                0,
                (value, arg) => 2 * 3 ** value
            ),
            gainPerReset: new Item(
                1,
                (value, arg) => 2 * 4 ** value
            )
        }
    }

    buyImBuyDiscounts(game) {
        let cost = game.tickets.upgrades.imBuyDiscounts.getCost();
        if (game.tickets.amount - cost >= 0) {
            game.tickets.amount -= cost;
            game.tickets.upgrades.imBuyDiscounts.value += 1;
        }
    }

    buyImTierDiscounts(game) {
        let cost = game.tickets.upgrades.imTierDiscounts.getCost();
        if (game.tickets.amount - cost >= 0) {
            game.tickets.amount -= cost;
            game.tickets.upgrades.imTierDiscounts.value += 1;
        }
    }
    
    buyGainPerReset(game) {
        let cost = game.tickets.upgrades.gainPerReset.getCost();
        if (game.tickets.amount - cost >= 0) {
            game.tickets.amount -= cost;
            game.tickets.upgrades.gainPerReset.value += 1;
        }
    }
}

export { Impressions, Tickets }