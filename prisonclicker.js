var eBlock = document.querySelector("#block");
var money = 0;
var currentBlock = 0;
var cooldown = 0;
var maxCooldown = 10;
var rank = {
    cost: 100, 
    level: 1,
    letter: "A",
    multiplier: 1,
}
var efficiency = {
    cost: 10,
    level: 0,
};
var fortune = {
    cost: 20,
    level: 0,
}
var autominer = {
    level: 0,
    cost: 100,
}

function load() {
    if(localStorage.getItem("money") != null){
        money = Number(localStorage.getItem("money"));
        cooldown = Number(localStorage.getItem("cooldown"));
        efficiency = {
            cost: Number(localStorage.getItem("efficiencyCost")),
            level: Number(localStorage.getItem("efficiencyLevel")),
        };
        fortune = {
            cost: Number(localStorage.getItem("fortuneCost")),
            level: Number(localStorage.getItem("fortuneLevel")),
        }
        autominer = {
            cost: Number(localStorage.getItem("autominerCost")),
            level: Number(localStorage.getItem("autominerLevel")),
        }
        rank.level = Number(localStorage.getItem("rank"));
        currentBlock = Number(localStorage.getItem("currentBlock"));
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
            money += Math.pow(1.1, fortune.level) * rank.multiplier;
            break
        case 1:
            money += Math.pow(1.1, fortune.level) * 2 * rank.multiplier;
            break
        case 2:
            money += Math.pow(1.1, fortune.level) * 4 * rank.multiplier;
            break
        case 3:
            money += Math.pow(1.1, fortune.level) * 8 * rank.multiplier;
            break
        case 4:
            money += Math.pow(1.1, fortune.level) * 16 * rank.multiplier;
            break
        case 5:
            money += Math.pow(1.1, fortune.level) * 32 * rank.multiplier;
            break
        case 6:
            money += Math.pow(1.1, fortune.level) * 64 * rank.multiplier;
            break
        case 7:
            money += Math.pow(1.1, fortune.level) * 128 * rank.multiplier;
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
        //EFFICIENCY
        if (money >= efficiency.cost) {
            document.querySelector("#efficiencyButton").classList.add("available");
            document.querySelector("#efficiencyButton").classList.remove("unavailable");
        } else {
            document.querySelector("#efficiencyButton").classList.add("unavailable");
            document.querySelector("#efficiencyButton").classList.remove("available");
        }
        document.querySelector("#efficiencyButton").innerHTML = "€" + convert(efficiency.cost);
        document.querySelector("#efficiencyLevel").innerHTML = "Lvl " + convert(efficiency.level);
        //FORTUNE
        if (money >= fortune.cost) {
            document.querySelector("#fortuneButton").classList.add("available");
            document.querySelector("#fortuneButton").classList.remove("unavailable");
        } else {
            document.querySelector("#fortuneButton").classList.add("unavailable");
            document.querySelector("#fortuneButton").classList.remove("available");
        }
        document.querySelector("#fortuneButton").innerHTML = "€" + convert(fortune.cost);
        document.querySelector("#fortuneLevel").innerHTML = "Lvl " + convert(fortune.level);
        document.querySelector("#fortuneDescription").innerHTML = "Fortune will increase the amount of money you get by 10% per level! ("+convert(Math.pow(1.1, fortune.level))+"x)";
    }
    // AUTOMINER PAGE //
    if (document.URL.includes("autominer")) {
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
        case 1: rank = { level: 1, letter: "A", cost: 1e2, multiplier: 1, }; break;
        case 2: rank = { level: 2, letter: "B", cost: 5e2, multiplier: 2, }; break;
        case 3: rank = { level: 3, letter: "C", cost: 1e3, multiplier: 5, }; break;
        case 4: rank = { level: 4, letter: "D", cost: 5e3, multiplier: 10, }; break;
        case 5: rank = { level: 5, letter: "E", cost: 1e4, multiplier: 20, }; break;
        case 6: rank = { level: 6, letter: "F", cost: 5e4, multiplier: 50, }; break;
        case 7: rank = { level: 7, letter: "G", cost: 1e5, multiplier: 1e2, }; break;
        case 8: rank = { level: 8, letter: "H", cost: 5e5, multiplier: 2e2, }; break;
        case 9: rank = { level: 9, letter: "I", cost: 1e6, multiplier: 5e2, }; break;
        case 10: rank = { level: 10, letter: "J", cost: 5e6, multiplier: 1e3, }; break;
        case 11: rank = { level: 11, letter: "K", cost: 1e7, multiplier: 2e3, }; break;
        case 12: rank = { level: 12, letter: "L", cost: 5e7, multiplier: 5e3, }; break;
        case 13: rank = { level: 13, letter: "M", cost: 1e8, multiplier: 1e4, }; break;
        case 14: rank = { level: 14, letter: "N", cost: 5e8, multiplier: 2e4, }; break;
        case 15: rank = { level: 15, letter: "O", cost: 1e9, multiplier: 5e4, }; break;
        case 16: rank = { level: 16, letter: "P", cost: 5e9, multiplier: 1e5, }; break;
        case 17: rank = { level: 17, letter: "Q", cost: 1e10, multiplier: 2e5, }; break;
        case 18: rank = { level: 18, letter: "R", cost: 5e10, multiplier: 5e5, }; break;
        case 19: rank = { level: 19, letter: "S", cost: 1e11, multiplier: 1e6, }; break;
        case 20: rank = { level: 20, letter: "T", cost: 5e11, multiplier: 2e6, }; break;
        case 21: rank = { level: 21, letter: "U", cost: 1e12, multiplier: 5e6, }; break;
        case 22: rank = { level: 22, letter: "V", cost: 5e12, multiplier: 1e7, }; break;
        case 23: rank = { level: 23, letter: "W", cost: 1e13, multiplier: 2e7, }; break;
        case 24: rank = { level: 24, letter: "X", cost: 5e13, multiplier: 5e7, }; break;
        case 25: rank = { level: 25, letter: "Y", cost: 1e14, multiplier: 1e8, }; break;
        case 26: rank = { level: 26, letter: "Z", cost: 5e14, multiplier: 2e8, }; break;
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
        efficiency.level += 1;
        efficiency.cost = 10 * Math.pow(1.5, efficiency.level);
    }
    if (upgrade == "fortune" && money >= fortune.cost) {
        money -= fortune.cost;
        fortune.level += 1;
        fortune.cost = 20 * Math.pow(1.25, fortune.level);
    }
}

function save() {
    localStorage.setItem("money", money);
    localStorage.setItem("cooldown", cooldown);
    localStorage.setItem("efficiencyCost", efficiency.cost);
    localStorage.setItem("efficiencyLevel", efficiency.level);
    localStorage.setItem("fortuneCost", fortune.cost);
    localStorage.setItem("fortuneLevel", fortune.level);
    localStorage.setItem("autominerCost", autominer.cost);
    localStorage.setItem("autominerLevel", autominer.level);
    localStorage.setItem("rank", rank.level);
    localStorage.setItem("currentBlock", currentBlock);
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