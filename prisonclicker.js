var eBlock = document.querySelector("#block");
var money = 0;
var addedMoney;
var currentBlock = 0;
var cooldown = 0;
var maxCooldown = 60;
var durability = 5;
var buyAmount = 1;
var now;
var explosions;
var lastMine = new Date();
var rank = {
    cost: 100, 
    level: 1,
    letter: "A",
    multiplier: 1,
}
var efficiency = {
    cost: 10,
    level: 0,
    max: 0,
    increase: 2,
    effect: 0.9,
};
var fortune = {
    cost: 1,
    level: 0,
    max: 0,
    increase: 1.025,
    effect: 1.01,
}
var unbreaking = {
    cost: 5,
    level: 0,
    max: 0,
    increase: 1.5,
    effect: 1,
}
var multiclick = {
    cost: 1000,
    level: 0,
    max: 0,
    increase: 1.1,
    effect: 1.05,
}
var explosion = {
    cost: 1e6,
    level: 0,
    max: 0,
    increase: 1.3,
    effect: 1,
}
var autominer = {
    level: 0,
    cost: 100,
}

function load() {
    if(localStorage.getItem("money") != null){
        money = Number(localStorage.getItem("money"));
        cooldown = Number(localStorage.getItem("cooldown"));
        efficiency.level = Number(localStorage.getItem("efficiencyLevel"));
        fortune.level = Number(localStorage.getItem("fortuneLevel"));
        unbreaking.level = Number(localStorage.getItem("unbreakingLevel"));
        multiclick.level = Number(localStorage.getItem("multiclickLevel"));
        explosion.level = Number(localStorage.getItem("explosionLevel"));
        autominer.level = Number(localStorage.getItem("autominerLevel"));
        rank.level = Number(localStorage.getItem("rank"));
        currentBlock = Number(localStorage.getItem("currentBlock"));
        buyAmount = Number(localStorage.getItem("buyAmount"));
        durability = Number(localStorage.getItem("durability"));
    }
    if (document.URL.includes("index")) {
        switch(currentBlock) {
            case 0: eBlock.style.backgroundImage = "url(Images/Stone.png)"; break;
            case 1: eBlock.style.backgroundImage = "url(Images/Coal_Ore.png)"; break;
            case 2: eBlock.style.backgroundImage = "url(Images/Iron_Ore.png)"; break;
            case 3: eBlock.style.backgroundImage = "url(Images/Redstone_Ore.png)"; break;
            case 4: eBlock.style.backgroundImage = "url(Images/Lapis_Lazuli_Ore.png)"; break;
            case 5: eBlock.style.backgroundImage = "url(Images/Gold_Ore.png)"; break;
            case 6: eBlock.style.backgroundImage = "url(Images/Diamond_Ore.png)"; break;
            case 7: eBlock.style.backgroundImage = "url(Images/Emerald_Ore.png)"; break;
        }
    }
}

function mine() {
    addedMoney = 0;
    if (durability > 0) {
        lastMine = new Date();
        durability -= 1;
        switch(currentBlock) {
            case 0: addedMoney += 1; break;
            case 1: addedMoney += 2; break;
            case 2: addedMoney += 4; break;
            case 3: addedMoney += 8; break;
            case 4: addedMoney += 16; break;
            case 5: addedMoney += 32; break;
            case 6: addedMoney += 64; break;
            case 7: addedMoney += 128; break;
        }
        j = explosion.level;
        chance = Math.random()*100;
        explosions = 1;
        while (chance < j) { j -= 10; explosions += 1; }

        i = Math.pow(multiclick.effect, multiclick.level);
        chance = Math.random()*100;
        multiclicks = 1;
        while (chance < i) { i /= 2; multiclicks += 1; }

        addedMoney *= explosions * multiclicks;
        addedMoney *= Math.pow(fortune.effect, fortune.level);
        addedMoney *= rank.multiplier;
        money += addedMoney;

        chance = Math.random() * 100;
        if (chance < 0.25) { currentBlock = 7 }
        else if (chance < 0.75) { currentBlock = 6 }
        else if (chance < 1.75) { currentBlock = 5 }
        else if (chance < 4.25) { currentBlock = 4 }
        else if (chance < 9.25) { currentBlock = 3 }
        else if (chance < 19.25) { currentBlock = 2 }
        else if (chance < 49.25) { currentBlock = 1 }
        else { currentBlock = 0 }
        if (document.URL.includes("index")) {
            switch(currentBlock) {
                case 0: eBlock.style.backgroundImage = "url(Images/Stone.png)"; break;
                case 1: eBlock.style.backgroundImage = "url(Images/Coal_Ore.png)"; break;
                case 2: eBlock.style.backgroundImage = "url(Images/Iron_Ore.png)"; break;
                case 3: eBlock.style.backgroundImage = "url(Images/Redstone_Ore.png)"; break;
                case 4: eBlock.style.backgroundImage = "url(Images/Lapis_Lazuli_Ore.png)"; break;
                case 5: eBlock.style.backgroundImage = "url(Images/Gold_Ore.png)"; break;
                case 6: eBlock.style.backgroundImage = "url(Images/Diamond_Ore.png)"; break;
                case 7: eBlock.style.backgroundImage = "url(Images/Emerald_Ore.png)"; break;
            }
        }
        document.querySelector("#explosionCount").innerHTML = + explosions + "x";
        document.querySelector("#multiclickCount").innerHTML = + multiclicks + "x";
    }
}

function automine() {
    now = new Date()
    if (autominer.level > 0) {
        if (Math.random()*100 < Math.pow((now - lastMine)/1000, autominer.level/3)) { mine() }
    }
    if (Math.pow((now - lastMine)/1000, autominer.level/3) > 0 && document.URL.includes("autominer")) {
        document.querySelector("#autominerChance").innerHTML = Math.round(Math.pow((now - lastMine)/1000, autominer.level/3)*100)/100 + "%";
    } else if (document.URL.includes("autominer")) {
        document.querySelector("#autominerChance").innerHTML = 0 + "%";
    }
}

function update() {
    // MAIN PAGE //
    if (document.URL.includes("index")) {
        document.querySelector("#progressBar").style.width = cooldown/maxCooldown*100 + "%"; 
        document.querySelector("#cooldownTimer").innerHTML = Math.round(convert(cooldown/maxCooldown)*100) + "%";
        document.querySelector("#durabilityLeft").style.width = durability/(unbreaking.level + 5)*100 + "%";
        document.querySelector("#durabilityCounter").innerHTML = durability;
    }
    // UPGRADES PAGE //
    if (document.URL.includes("upgrades")) {
        if (buyAmount == 1) {
            efficiency.cost = 10*Math.pow(efficiency.increase, efficiency.level);
            fortune.cost = 1*Math.pow(fortune.increase, fortune.level);
            unbreaking.cost = 5*Math.pow(unbreaking.increase, unbreaking.level);
            multiclick.cost = 1000*Math.pow(multiclick.increase, multiclick.level);
            explosion.cost = 1e6*Math.pow(explosion.increase, explosion.level);
        } else if (buyAmount == 10 || buyAmount == 100) {
            efficiency.cost = 0;
            fortune.cost = 0;
            unbreaking.cost = 0;
            multiclick.cost = 0;
            explosion.cost = 0;
            for (i = 0; i < buyAmount; i++) {
                efficiency.cost += 10*Math.pow(efficiency.increase, efficiency.level + i);
                fortune.cost += 1*Math.pow(fortune.increase, fortune.level + i);
                unbreaking.cost += 5*Math.pow(unbreaking.increase, unbreaking.level + i);
                multiclick.cost += 1000*Math.pow(multiclick.increase, multiclick.level + i);
                explosion.cost += 1e6*Math.pow(explosion.increase, explosion.level + i);
            }
        } else if (buyAmount == 0) {
            efficiency.cost = 10*Math.pow(efficiency.increase, efficiency.level);
            fortune.cost = 1*Math.pow(fortune.increase, fortune.level);
            unbreaking.cost = 5*Math.pow(unbreaking.increase, unbreaking.level);
            multiclick.cost = 1000*Math.pow(multiclick.increase, multiclick.level);
            explosion.cost = 1e6*Math.pow(explosion.increase, explosion.level);
            i = 0;
            while(money > efficiency.cost + 10*Math.pow(efficiency.increase, efficiency.level + i)) {
                efficiency.cost += 10*Math.pow(efficiency.increase, efficiency.level + i);
                i += 1;
            }
            efficiency.max = i;
            i = 0;
            while(money > fortune.cost + 1*Math.pow(fortune.increase, fortune.level + i)) {
                fortune.cost += 1*Math.pow(fortune.increase, fortune.level + i);
                i += 1;
            }
            fortune.max = i;
            i = 0;
            while(money > unbreaking.cost + 5*Math.pow(unbreaking.increase, unbreaking.level + i)) {
                unbreaking.cost += 5*Math.pow(unbreaking.increase, unbreaking.level + i);
                i += 1;
            }
            unbreaking.max = i;
            i = 0;
            while(money > multiclick.cost + 1000*Math.pow(multiclick.increase, multiclick.level + i)) {
                multiclick.cost += 1000*Math.pow(multiclick.increase, multiclick.level + i);
                i += 1;
            }
            multiclick.max = i;
            i = 0;
            while(money > explosion.cost + 1e6*Math.pow(explosion.increase, explosion.level + i)) {
                explosion.cost += 1e6*Math.pow(explosion.increase, explosion.level + i);
                i += 1;
            }
            explosion.max = i;
            i = 0;
        }
        
        if (money >= unbreaking.cost) { document.querySelector("#unbreakingButton").classList.replace("unavailable", "available");
        } else { document.querySelector("#unbreakingButton").classList.replace("available", "unavailable"); }
        if (money >= efficiency.cost) { document.querySelector("#efficiencyButton").classList.replace("unavailable", "available");
        } else { document.querySelector("#efficiencyButton").classList.replace("available", "unavailable"); }
        if (money >= fortune.cost) { document.querySelector("#fortuneButton").classList.replace("unavailable", "available");
        } else { document.querySelector("#fortuneButton").classList.replace("available", "unavailable"); }
        if (money >= multiclick.cost) { document.querySelector("#multiclickButton").classList.replace("unavailable", "available");
        } else { document.querySelector("#multiclickButton").classList.replace("available", "unavailable"); }
        if (money >= explosion.cost) { document.querySelector("#explosionButton").classList.replace("unavailable", "available");
        } else { document.querySelector("#explosionButton").classList.replace("available", "unavailable"); }
        
        if (buyAmount == 1) {
            document.querySelector("#buy1").classList.replace("unavailable", "available");
            document.querySelector("#buy10").classList.replace("available", "unavailable");
            document.querySelector("#buy100").classList.replace("available", "unavailable");
            document.querySelector("#buyMax").classList.replace("available", "unavailable");
        } else if (buyAmount == 10) {
            document.querySelector("#buy1").classList.replace("available", "unavailable");
            document.querySelector("#buy10").classList.replace("unavailable", "available");
            document.querySelector("#buy100").classList.replace("available", "available");
            document.querySelector("#buyMax").classList.replace("available", "unavailable");
        } else if (buyAmount == 100) {
            document.querySelector("#buy1").classList.replace("available", "unavailable");
            document.querySelector("#buy10").classList.replace("available", "unavailable");
            document.querySelector("#buy100").classList.replace("unavailable", "available");
            document.querySelector("#buyMax").classList.replace("available", "unavailable");
        } else if (buyAmount == 0) {
            document.querySelector("#buy1").classList.replace("available", "unavailable");
            document.querySelector("#buy10").classList.replace("available", "unavailable");
            document.querySelector("#buy100").classList.replace("available", "unavailable");
            document.querySelector("#buyMax").classList.replace("unavailable", "available");
        }

        document.querySelector("#unbreakingButton").innerHTML = "€" + convert(unbreaking.cost);
        document.querySelector("#unbreakingLevel").innerHTML = "Lvl " + convert(unbreaking.level);
        document.querySelector("#efficiencyButton").innerHTML = "€" + convert(efficiency.cost);
        document.querySelector("#efficiencyLevel").innerHTML = "Lvl " + convert(efficiency.level);
        document.querySelector("#fortuneButton").innerHTML = "€" + convert(fortune.cost);
        document.querySelector("#fortuneLevel").innerHTML = "Lvl " + convert(fortune.level);
        document.querySelector("#fortuneDescription").innerHTML = "Fortune will increase the amount of money you get by 1% per level! ("+convert(Math.pow(fortune.effect, fortune.level))+"x)";
        document.querySelector("#multiclickButton").innerHTML = "€" + convert(multiclick.cost);
        document.querySelector("#multiclickLevel").innerHTML = "Lvl " + convert(multiclick.level);
        document.querySelector("#multiclickDescription").innerHTML = "Multiclick will increase the chance of using multiple clicks at once by 5% per level! (" + convert(Math.pow(multiclick.effect, multiclick.level)) + "%)";
        document.querySelector("#explosionButton").innerHTML = "€" + convert(explosion.cost);
        document.querySelector("#explosionLevel").innerHTML = "Lvl " + convert(explosion.level);
        document.querySelector("#explosionDescription").innerHTML = "Explosion will increase the chance that you will mine multiple blocks with one click! (" + explosion.level*explosion.effect + "%)";
    }
    // AUTOMINER PAGE //
    if (document.URL.includes("autominer")) {
        autominer.cost = Math.pow(10, 2+autominer.level);
        if (money >= autominer.cost) {
            document.querySelector("#autominerButton").classList.add("available");
            document.querySelector("#autominerButton").classList.remove("unavailable");
        } else {
            document.querySelector("#autominerButton").classList.add("unavailable");
            document.querySelector("#autominerButton").classList.remove("available");
        }
        document.querySelector("#autominerCost").innerHTML = "Upgrade autominer for: €" + convert(autominer.cost);
    }
    // RANKS PAGE //
    if (document.URL.includes("ranks")) {
        if (money >= rank.cost) {
            document.querySelector("#rankButton").classList.add("available");
            document.querySelector("#rankButton").classList.remove("unavailable");
        } else {
            document.querySelector("#rankButton").classList.add("unavailable");
            document.querySelector("#rankButton").classList.remove("available");
        }
        document.querySelector("#currentRank").innerHTML = rank.letter;
        document.querySelector("#currentMultiplier").innerHTML = "Multiplier: <br />" + convert(rank.multiplier);
        document.querySelector("#rankButton").innerHTML = "Get next rank for: <br />" + convert(rank.cost);
    }
    
    
    switch (rank.level) {
        case 1: rank = { level: 1, letter: "A", cost: 100, multiplier: 1, }; break;
        case 2: rank = { level: 2, letter: "B", cost: 100*Math.pow(5, 1), multiplier: Math.pow(2, 1), }; break;
        case 3: rank = { level: 3, letter: "C", cost: 100*Math.pow(5, 2), multiplier: Math.pow(2, 2), }; break;
        case 4: rank = { level: 4, letter: "D", cost: 100*Math.pow(5, 3), multiplier: Math.pow(2, 3), }; break;
        case 5: rank = { level: 5, letter: "E", cost: 100*Math.pow(5, 4), multiplier: Math.pow(2, 4), }; break;
        case 6: rank = { level: 6, letter: "F", cost: 100*Math.pow(5, 5), multiplier: Math.pow(2, 5), }; break;
        case 7: rank = { level: 7, letter: "G", cost: 100*Math.pow(5, 6), multiplier: Math.pow(2, 6), }; break;
        case 8: rank = { level: 8, letter: "H", cost: 100*Math.pow(5, 7), multiplier: Math.pow(2, 7), }; break;
        case 9: rank = { level: 9, letter: "I", cost: 100*Math.pow(5, 8), multiplier: Math.pow(2, 8), }; break;
        case 10: rank = { level: 10, letter: "J", cost: 100*Math.pow(5, 9), multiplier: Math.pow(2, 9), }; break;
        case 11: rank = { level: 11, letter: "K", cost: 100*Math.pow(5, 10), multiplier: Math.pow(2, 10), }; break;
        case 12: rank = { level: 12, letter: "L", cost: 100*Math.pow(5, 11), multiplier: Math.pow(2, 11), }; break;
        case 13: rank = { level: 13, letter: "M", cost: 100*Math.pow(5, 12), multiplier: Math.pow(2, 12), }; break;
        case 14: rank = { level: 14, letter: "N", cost: 100*Math.pow(5, 13), multiplier: Math.pow(2, 13), }; break;
        case 15: rank = { level: 15, letter: "O", cost: 100*Math.pow(5, 14), multiplier: Math.pow(2, 14), }; break;
        case 16: rank = { level: 16, letter: "P", cost: 100*Math.pow(5, 15), multiplier: Math.pow(2, 15), }; break;
        case 17: rank = { level: 17, letter: "Q", cost: 100*Math.pow(5, 16), multiplier: Math.pow(2, 16), }; break;
        case 18: rank = { level: 18, letter: "R", cost: 100*Math.pow(5, 17), multiplier: Math.pow(2, 17), }; break;
        case 19: rank = { level: 19, letter: "S", cost: 100*Math.pow(5, 18), multiplier: Math.pow(2, 18), }; break;
        case 20: rank = { level: 20, letter: "T", cost: 100*Math.pow(5, 19), multiplier: Math.pow(2, 19), }; break;
        case 21: rank = { level: 21, letter: "U", cost: 100*Math.pow(5, 20), multiplier: Math.pow(2, 20), }; break;
        case 22: rank = { level: 22, letter: "V", cost: 100*Math.pow(5, 21), multiplier: Math.pow(2, 21), }; break;
        case 23: rank = { level: 23, letter: "W", cost: 100*Math.pow(5, 22), multiplier: Math.pow(2, 22), }; break;
        case 24: rank = { level: 24, letter: "X", cost: 100*Math.pow(5, 23), multiplier: Math.pow(2, 23), }; break;
        case 25: rank = { level: 25, letter: "Y", cost: 100*Math.pow(5, 24), multiplier: Math.pow(2, 24), }; break;
        case 26: rank = { level: 26, letter: "Z", cost: "MAX RANK!", multiplier: 2e8, }; break;
    } 

    localStorage.setItem("cooldown", cooldown);
    document.querySelector("#moneyCounter").innerHTML = "€" + convert(money);
    cooldown += 0.01;
    if (cooldown >= maxCooldown) {
        durability = unbreaking.level + 5;
        cooldown = 0;
    }
    maxCooldown = 60 * Math.pow(0.9, efficiency.level);
}

function buyUpgrade(upgrade) {
    if (upgrade == "rank" && money >= rank.cost && rank.level < 26) {
        money -= rank.cost;
        rank.level += 1;
    }
    if (upgrade == "autominer" && money >= autominer.cost) {
        money -= autominer.cost;
        autominer.level += 1;
        autominer.cost = Math.pow(10, 2+autominer.level);
    }
    if (upgrade == "unbreaking" && money >= unbreaking.cost) {
        money -= unbreaking.cost;
        if (buyAmount != 0) {
            unbreaking.level += buyAmount;
        } else {
            unbreaking.level += unbreaking.max;
        }
    }
    if (upgrade == "efficiency" && money >= efficiency.cost) {
        money -= efficiency.cost;
        if (buyAmount != 0) {
            efficiency.level += buyAmount;
        } else {
            efficiency.level += efficiency.max;
        }
    }
    if (upgrade == "fortune" && money >= fortune.cost) {
        money -= fortune.cost;
        if (buyAmount != 0) {
            fortune.level += buyAmount;
        } else {
            fortune.level += fortune.max;
        }
    }
    if (upgrade == "multiclick" && money >= multiclick.cost) {
        money -= multiclick.cost;
        if (buyAmount != 0) {
            multiclick.level += buyAmount;
        } else {
            multiclick.level += multiclick.max;
        }
    }
    if (upgrade == "explosion" && money >= multiclick.cost) {
        money -= explosion.cost;
        if (buyAmount != 0) {
            explosion.level += buyAmount;
        } else {
            explosion.level += explosion.max
        }
    }

}

function setBuyAmount(amount) {
    if (amount == 1 && buyAmount != 1) {
        buyAmount = 1;
    } else if (amount == 10 && buyAmount != 10) {
        buyAmount = 10;
    } else if (amount == 100 && buyAmount != 100) {
        buyAmount = 100;
    } else if (amount == 0 && buyAmount != 0) {
        buyAmount = 0;
    }
}

function save() {
    localStorage.setItem("money", money);
    localStorage.setItem("cooldown", cooldown);
    localStorage.setItem("efficiencyLevel", efficiency.level);
    localStorage.setItem("fortuneLevel", fortune.level);
    localStorage.setItem("unbreakingLevel", unbreaking.level);
    localStorage.setItem("multiclickLevel", multiclick.level);
    localStorage.setItem("explosionLevel", explosion.level);
    localStorage.setItem("autominerLevel", autominer.level);
    localStorage.setItem("rank", rank.level);
    localStorage.setItem("currentBlock", currentBlock);
    localStorage.setItem("buyAmount", buyAmount);
    localStorage.setItem("durability", durability);
}

function reset() {
    localStorage.clear();
    window.location.href = "index.html";
    localStorage.clear();
}

function convert(number) {
    if (number >= 1e21) { number = Math.round(number/1e19)/100 + " Sx"}
    else if (number >= 1e18) { number = Math.round(number/1e16)/100 + " Qu"}
    else if (number >= 1e15) { number = Math.round(number/1e13)/100 + " Qa"}
    else if (number >= 1e12) { number = Math.round(number/1e10)/100 + " T"}
    else if (number >= 1e9) { number = Math.round(number/1e7)/100 + " B"}
    else if (number >= 1e6) { number = Math.round(number/1e4)/100 + " M"}
    else if (number >= 1e3) { number = Math.round(number/1e1)/100 + " K"}
    else if (number < 1e3) { number = Math.round(number*100)/100}
    return number;
}

load();
window.setInterval(update, 10);
window.setInterval(automine, 100);
window.setInterval(save, 100);