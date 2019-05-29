var eBlock = document.querySelector("#block");
var money = 0;
var currentBlock = 0;
var cooldown = 0;
var maxCooldown = 10;
var buyAmount = 1;
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
    increase: 1.5,
    effect: 0.9,
};
var fortune = {
    cost: 20,
    level: 0,
    max: 0,
    increase: 1.015,
    effect: 1.01,
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
        autominer.level = Number(localStorage.getItem("autominerLevel"));
        rank.level = Number(localStorage.getItem("rank"));
        currentBlock = Number(localStorage.getItem("currentBlock"));
        buyAmount = Number(localStorage.getItem("buyAmount"));
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
if (cooldown > maxCooldown) {
    cooldown = 0;
    switch(currentBlock) {
        case 0: 
            money += Math.pow(fortune.effect, fortune.level) * rank.multiplier;
            break
        case 1:
            money += Math.pow(fortune.effect, fortune.level) * 2 * rank.multiplier;
            break
        case 2:
            money += Math.pow(fortune.effect, fortune.level) * 4 * rank.multiplier;
            break
        case 3:
            money += Math.pow(fortune.effect, fortune.level) * 8 * rank.multiplier;
            break
        case 4:
            money += Math.pow(fortune.effect, fortune.level) * 16 * rank.multiplier;
            break
        case 5:
            money += Math.pow(fortune.effect, fortune.level) * 32 * rank.multiplier;
            break
        case 6:
            money += Math.pow(fortune.effect, fortune.level) * 64 * rank.multiplier;
            break
        case 7:
            money += Math.pow(fortune.effect, fortune.level) * 128 * rank.multiplier;
            break
    }
    chance = Math.random() * 100;
    if (chance < 0.25) { currentBlock = 7 }
    else if (chance < 0.75) { currentBlock = 6 }
    else if (chance < 1.75) { currentBlock = 5 }
    else if (chance < 4.25) { currentBlock = 4 }
    else if (chance < 9.25) { currentBlock = 3 }
    else if (chance < 19.25) { currentBlock = 2 }
    else if (chance < 49.25) { currentBlock = 1 }
    else {  currentBlock = 0 }
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
}

function automine() {
    if (autominer.level > 0) {
        if (Math.random()*100 < Math.pow(cooldown-maxCooldown, autominer.level/4)) { mine() }
    }
    if (Math.pow(cooldown-maxCooldown, autominer.level/4)-1 > 0 && document.URL.includes("autominer")) {
        document.querySelector("#autominerChance").innerHTML = Math.round(Math.pow(cooldown-maxCooldown, autominer.level/4)*100)/100 + "%";
    } else if (document.URL.includes("autominer")) {
        document.querySelector("#autominerChance").innerHTML = 0 + "%";
    }
}

function update() {
    // MAIN PAGE //
    if (document.URL.includes("index")) {
        if (cooldown > maxCooldown) { 
            document.querySelector("#progressBar").style.width = 100 + "%"; 
            document.querySelector("#cooldownTimer").innerHTML = convert(maxCooldown);
        }
        else { 
            document.querySelector("#progressBar").style.width =  cooldown/maxCooldown*100 + "%"; 
            document.querySelector("#cooldownTimer").innerHTML = convert(cooldown);
        }
    }
    // UPGRADES PAGE //
    if (document.URL.includes("upgrades")) {
        if (buyAmount == 1) {
            efficiency.cost = 10*Math.pow(efficiency.increase, efficiency.level);
            fortune.cost = 20*Math.pow(fortune.increase, fortune.level)
        } else if (buyAmount == 10 || buyAmount == 100) {
            efficiency.cost = 0;
            fortune.cost = 0;
            for (i = 0; i < buyAmount; i++) {
                efficiency.cost += 10*Math.pow(efficiency.increase, efficiency.level + i);
                fortune.cost += 20*Math.pow(fortune.increase, fortune.level + i);
            }
        } else if (buyAmount == 0) {
            efficiency.cost = 10*Math.pow(efficiency.increase, efficiency.level);
            fortune.cost = 20*Math.pow(fortune.increase, fortune.level);
            i = 0;
            while(money > efficiency.cost + 10*Math.pow(efficiency.increase, efficiency.level + i)) {
                i += 1;
                efficiency.cost += 10*Math.pow(efficiency.increase, efficiency.level + i);
            }
            efficiency.max = i;
            i = 0;
            while(money > fortune.cost + 20*Math.pow(fortune.increase, fortune.level + i)) {
                i += 1;
                fortune.cost += 20*Math.pow(fortune.increase, fortune.level + i)
            }
            fortune.max = i;
            i = 0;
        }

        if (money >= efficiency.cost) { document.querySelector("#efficiencyButton").classList.replace("unavailable", "available");
        } else { document.querySelector("#efficiencyButton").classList.replace("available", "unavailable"); }
        if (money >= fortune.cost) { document.querySelector("#fortuneButton").classList.replace("unavailable", "available");
        } else { document.querySelector("#fortuneButton").classList.replace("available", "unavailable"); }
        
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

        document.querySelector("#efficiencyButton").innerHTML = "€" + convert(efficiency.cost);
        document.querySelector("#efficiencyLevel").innerHTML = "Lvl " + convert(efficiency.level);
        document.querySelector("#fortuneButton").innerHTML = "€" + convert(fortune.cost);
        document.querySelector("#fortuneLevel").innerHTML = "Lvl " + convert(fortune.level);
        document.querySelector("#fortuneDescription").innerHTML = "Fortune will increase the amount of money you get by 1% per level! ("+convert(Math.pow(fortune.effect, fortune.level))+"x)";
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
        document.querySelector("#rank").innerHTML = rank.letter;
        document.querySelector("#currentMultiplier").innerHTML = "Current Multiplier: <br />" + convert(rank.multiplier);
        document.querySelector("#rankButton").innerHTML = "Get next rank for: <br />" + convert(rank.cost);
    }
    
    
    switch (rank.level) {
        case 1: rank = { level: 1, letter: "A", cost: 100, multiplier: 1, }; break;
        case 2: rank = { level: 2, letter: "B", cost: 100*Math.pow(5, 1), multiplier: 2, }; break;
        case 3: rank = { level: 3, letter: "C", cost: 100*Math.pow(5, 2), multiplier: 5, }; break;
        case 4: rank = { level: 4, letter: "D", cost: 100*Math.pow(5, 3), multiplier: 10, }; break;
        case 5: rank = { level: 5, letter: "E", cost: 100*Math.pow(5, 4), multiplier: 20, }; break;
        case 6: rank = { level: 6, letter: "F", cost: 100*Math.pow(5, 5), multiplier: 50, }; break;
        case 7: rank = { level: 7, letter: "G", cost: 100*Math.pow(5, 6), multiplier: 1e2, }; break;
        case 8: rank = { level: 8, letter: "H", cost: 100*Math.pow(5, 7), multiplier: 2e2, }; break;
        case 9: rank = { level: 9, letter: "I", cost: 100*Math.pow(5, 8), multiplier: 5e2, }; break;
        case 10: rank = { level: 10, letter: "J", cost: 100*Math.pow(5, 9), multiplier: 1e3, }; break;
        case 11: rank = { level: 11, letter: "K", cost: 100*Math.pow(5, 10), multiplier: 2e3, }; break;
        case 12: rank = { level: 12, letter: "L", cost: 100*Math.pow(5, 11), multiplier: 5e3, }; break;
        case 13: rank = { level: 13, letter: "M", cost: 100*Math.pow(5, 12), multiplier: 1e4, }; break;
        case 14: rank = { level: 14, letter: "N", cost: 100*Math.pow(5, 13), multiplier: 2e4, }; break;
        case 15: rank = { level: 15, letter: "O", cost: 100*Math.pow(5, 14), multiplier: 5e4, }; break;
        case 16: rank = { level: 16, letter: "P", cost: 100*Math.pow(5, 15), multiplier: 1e5, }; break;
        case 17: rank = { level: 17, letter: "Q", cost: 100*Math.pow(5, 16), multiplier: 2e5, }; break;
        case 18: rank = { level: 18, letter: "R", cost: 100*Math.pow(5, 17), multiplier: 5e5, }; break;
        case 19: rank = { level: 19, letter: "S", cost: 100*Math.pow(5, 18), multiplier: 1e6, }; break;
        case 20: rank = { level: 20, letter: "T", cost: 100*Math.pow(5, 19), multiplier: 2e6, }; break;
        case 21: rank = { level: 21, letter: "U", cost: 100*Math.pow(5, 20), multiplier: 5e6, }; break;
        case 22: rank = { level: 22, letter: "V", cost: 100*Math.pow(5, 21), multiplier: 1e7, }; break;
        case 23: rank = { level: 23, letter: "W", cost: 100*Math.pow(5, 22), multiplier: 2e7, }; break;
        case 24: rank = { level: 24, letter: "X", cost: 100*Math.pow(5, 23), multiplier: 5e7, }; break;
        case 25: rank = { level: 25, letter: "Y", cost: 100*Math.pow(5, 24), multiplier: 1e8, }; break;
        case 26: rank = { level: 26, letter: "Z", cost: "MAX RANK!", multiplier: 2e8, }; break;
    } 

    localStorage.setItem("cooldown", cooldown);
    document.querySelector("#moneyCounter").innerHTML = "€" + convert(money);
    cooldown += 0.01;
    maxCooldown = 10 * Math.pow(0.9, efficiency.level);
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
    localStorage.setItem("autominerLevel", autominer.level);
    localStorage.setItem("rank", rank.level);
    localStorage.setItem("currentBlock", currentBlock);
    localStorage.setItem("buyAmount", buyAmount);
}

function reset() {
    localStorage.clear();
    window.location.href = "index.html";
    localStorage.clear();
}

function convert(number) {
    if (number >= 1e18) { number = Math.round(number/1e16)/100 + " Qu"}
    else if (number >= 1e15) { number = Math.round(number/1e13)/100 + " Qa"}
    else if (number >= 1e12) { number = Math.round(number/1e10)/100 + " T"}
    else if (number >= 1e9) { number = Math.round(number/1e7)/100 + " B"}
    else if (number >= 1e6) { number = Math.round(number/1e4)/100 + " M"}
    else if (number >= 1e3) { number = Math.round(number/1e1)/100 + " K"}
    else if (number < 1e3) { number = Math.round(number*10)/10}
    return number;
}

load();
window.setInterval(update, 10);
window.setInterval(automine, 100);
window.setInterval(save, 1000);