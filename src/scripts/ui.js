import { format, ordinalWord } from "./notation.js";

function openTab(group, item) {
    let i, tabcontent;

    tabcontent = document.getElementsByClassName(group);
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    document.getElementById(item).style.display = "flex";
}

class GameUI {
    constructor(game) {
        this.game = game;
    }

    init() {
        document.getElementById("btn-im").addEventListener("click", (e) => {
            openTab("tabcontent-main", "tab-im");
        });
        document.getElementById("btn-me").addEventListener("click", (e) => {
            openTab("tabcontent-main", "tab-me");
        });
        document.getElementById("btn-dr").addEventListener("click", (e) => {
            openTab("tabcontent-main", "tab-dr");
        });

        openTab("tabcontent-main", "tab-im");
    }

    bind() {
        document.getElementById("btn-im-up-amount").addEventListener("click", () => {
            this.game.impressions.buyImpression(this.game);
        });
        document.getElementById("btn-im-up-tier").addEventListener("click", () => {
            this.game.impressions.buyUpgrade(this.game);
        });
        document.getElementById("btn-im-up-reset").addEventListener("click", () => {
            this.game.impressions.buyReset(this.game);
        });

        document.getElementById("btn-ticket-buy-discount").addEventListener("click", () => {
            this.game.tickets.buyImBuyDiscounts(this.game);
        });

        document.getElementById("btn-ticket-tier-discount").addEventListener("click", () => {
            this.game.tickets.buyImTierDiscounts(this.game);
        });

        document.getElementById("btn-ticket-per-reset").addEventListener("click", () => {
            this.game.tickets.buyGainPerReset(this.game);
        });
    }

    setHTML(id, val) {
        document.getElementById(id).innerHTML = val;
    }

    update() {
        const pairs = [
            ["val-im", format(this.game.im, 1, true)],
            ["val-im-rate", format(this.game.imRate, 1, true)],
            ["val-im-up-amount", format(this.game.impressions.count.value)],
            ["val-im-up-tier", ordinalWord(this.game.impressions.tier.value)],
            ["btn-im-up-amount", format(this.game.impressions.count.getCost())],
            ["btn-im-up-tier", format(this.game.impressions.tier.getCost())],
            ["btn-im-up-reset", format(this.game.impressions.reset.getCost())],
            
            
            ["val-ticket", format(this.game.tickets.amount)],
            ["btn-ticket-per-reset", format(this.game.tickets.upgrades.gainPerReset.getCost())],
            ["btn-ticket-buy-discount", format(this.game.tickets.upgrades.imBuyDiscounts.getCost())],
            ["btn-ticket-tier-discount", format(this.game.tickets.upgrades.imTierDiscounts.getCost())]
        ];
    
        for (const [id, val] of pairs) {
            this.setHTML(id, val);
        }
    }
    
    loop() {
        requestAnimationFrame(() => {
            this.update();
            this.loop();
        });
    }

    startLoop() {
        this.loop();
    }
}

export { GameUI }