var eBlock = document.querySelector("#block");
var money = 0;
var currentBlock = 0;
var cooldown = 0;
var maxCooldown = 10;
var efficiency = {
    cost: 10,
    level: 0,
};
var fortune = {
    cost: 20,
    level: 0,
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
    }
}

function mine() {
if (cooldown > maxCooldown) {
    cooldown = 0;
    switch(currentBlock) {
        case 0: 
            money += Math.pow(1.1, fortune.level);
            break
        case 1:
            money += Math.pow(1.1, fortune.level) * 2;
            break
        case 2:
            money += Math.pow(1.1, fortune.level) * 4;
            break
        case 3:
            money += Math.pow(1.1, fortune.level) * 8;
            break
        case 4:
            money += Math.pow(1.1, fortune.level) * 16;
            break
        case 5:
            money += Math.pow(1.1, fortune.level) * 32;
            break
        case 6:
            money += Math.pow(1.1, fortune.level) * 64;
            break
        case 7:
            money += Math.pow(1.1, fortune.level) * 128;
            break
    }

    chance = Math.random() * 100;
    if (chance < 0.25) { eBlock.style.backgroundImage = "url(Images/Emerald_Ore.png)";
                         currentBlock = 7 }
    else if (chance < 0.75) { eBlock.style.backgroundImage = "url(Images/Diamond_Ore.png)" ;
                              currentBlock = 6 }
    else if (chance < 1.75) { eBlock.style.backgroundImage = "url(Images/Gold_Ore.png)" ;
                              currentBlock = 5 }
    else if (chance < 4.25) { eBlock.style.backgroundImage = "url(Images/Lapis_Lazuli_Ore.png)" ;
                              currentBlock = 4 }
    else if (chance < 9.25) { eBlock.style.backgroundImage = "url(Images/Redstone_Ore.png)"; 
                              currentBlock = 3 }
    else if (chance < 19.25) { eBlock.style.backgroundImage = "url(Images/Iron_Ore.png)";
                               currentBlock = 2 }
    else if (chance < 49.25) { eBlock.style.backgroundImage = "url(Images/Coal_Ore.png)"; 
                               currentBlock = 1 }
    else { eBlock.style.backgroundImage = "url(Images/Stone.png)";
           currentBlock = 0 }
    console.log(chance);
}
}

function update() {
    if (document.URL.includes("index")) {
        if (cooldown > maxCooldown) { 
            document.querySelector("#progressBar").style.width = 100 + "%"; 
            document.querySelector("#cooldownTimer").innerHTML = convert(maxCooldown);
        }
        else { 
            document.querySelector("#progressBar").style.width =  cooldown/maxCooldown*100 + "%"; 
            document.querySelector("#cooldownTimer").innerHTML = convert(cooldown);
        }
        maxCooldown = 10 * Math.pow(0.9, efficiency.level);
    }
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
        document.querySelector("#efficiencyLevel").innerHTML = "Level " + convert(efficiency.level);
        //FORTUNE
        if (money >= fortune.cost) {
            document.querySelector("#fortuneButton").classList.add("available");
            document.querySelector("#fortuneButton").classList.remove("unavailable");
        } else {
            document.querySelector("#fortuneButton").classList.add("unavailable");
            document.querySelector("#fortuneButton").classList.remove("available");
        }
        document.querySelector("#fortuneButton").innerHTML = "€" + convert(fortune.cost);
        document.querySelector("#fortuneLevel").innerHTML = "Level " + convert(fortune.level);
        document.querySelector("#fortuneDescription").innerHTML = "Fortune will increase the amount of money you get by 10% per level! ("+convert(Math.pow(1.1, fortune.level))+"x)";
    }
    document.querySelector("#moneyCounter").innerHTML = "€" + convert(money);
    cooldown += 0.01;
    save();
}

function buyUpgrade(upgrade) {
    if (upgrade == "efficiency" && money >= efficiency.cost) {
        money -= efficiency.cost;
        efficiency.level += 1;
        efficiency.cost = 10 * Math.pow(1.5, efficiency.level);
    }
    if (upgrade == "fortune" && money >= fortune.cost) {
        money -= fortune.cost;
        fortune.level += 1;
        fortune.cost = 20 * Math.pow(1.15, fortune.level);
    }
}

function save() {
    localStorage.setItem("money", money);
    localStorage.setItem("cooldown", cooldown);
    localStorage.setItem("efficiencyCost", efficiency.cost);
    localStorage.setItem("efficiencyLevel", efficiency.level);
    localStorage.setItem("fortuneCost", fortune.cost);
    localStorage.setItem("fortuneLevel", fortune.level);
}

function reset() {
    localStorage.clear();
    window.location.href = "index.html";
    localStorage.clear();
}

function convert(number) {
    if (number >= 1e18) { number = Math.round(number/1e16)/100 + "Qu"}
    else if (number >= 1e15) { number = Math.round(number/1e13)/100 + "Qa"}
    else if (number >= 1e12) { number = Math.round(number/1e10)/100 + "T"}
    else if (number >= 1e9) { number = Math.round(number/1e7)/100 + "B"}
    else if (number >= 1e6) { number = Math.round(number/1e4)/100 + "M"}
    else if (number >= 1e3) { number = Math.round(number/1e1)/100 + "K"}
    else if (number < 1e3) { number = Math.round(number*10)/10}
    return number;
}

load();
window.setInterval(update, 10);