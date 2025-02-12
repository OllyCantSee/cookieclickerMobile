let cookieCountNum = 0;
let currentCookieIncrease = 1;

let currentCookieIncreasePerSecond = 0;
let currentCursorUprgradeAddition = 0.1;
let currentGrandmaUprgradeAddition = 1;
let currentFarmUprgradeAddition = 8;
let numberOfCursors = 0;
let numberOfGrandmas = 0;
let numberOfFarms = 0;

function getCurrentPrice(type) {
    return document.getElementById(type + "_price").innerHTML;
}

// Add cookie FROM CLICKING
function addCookie() {
    cookieCountNum = cookieCountNum + currentCookieIncrease;
    updateCookieCount()
}

// add cookie FROM TIMER
function addCookieFromIncrease() {
    cookieCountNum = cookieCountNum + currentCookieIncreasePerSecond
    updateCookieCount()
}

// update cookie COUNT
function updateCookieCount() {
    let cookieCount = document.getElementById("cookie_count");
    cookieCount.innerHTML = Math.round(cookieCountNum, 1) + " Cookies";
}

function updateCookieIncrease() {
    let cookieCount = document.getElementById("cookie_increase");
    cookieCount.innerHTML = "per second: " + Number(currentCookieIncreasePerSecond.toFixed(1));
}

let cookieIncreaseTimer = setInterval(cookiesUpdatePerSecond, 1000)

function cookiesUpdatePerSecond() {
    addCookieFromIncrease()

}

function addItem(type) {
    if (type === "cursor") {
        numberOfCursors = numberOfCursors + 1;
    }
    if (type === "grandma") {
        numberOfGrandmas = numberOfGrandmas + 1;
    }
    if (type === "farm") {
        numberOfFarms = numberOfFarms + 1;
    }
}

function buttonUpgrade(type) {
    if (type === "cursor") {
        let UpgradePrice = getCurrentPrice("cursor")

        if (cookieCountNum >= UpgradePrice) {
            cookieCountNum = cookieCountNum - UpgradePrice;
            currentCookieIncreasePerSecond = currentCookieIncreasePerSecond + currentCursorUprgradeAddition;
            updateCookieCount();
            updateCookieIncrease();
            addItem("cursor");
            updateItem("cursor");
        }
    } else if (type === "grandma") {
        let UpgradePrice = getCurrentPrice("grandma")
        if (cookieCountNum >= UpgradePrice) {
            cookieCountNum = cookieCountNum - UpgradePrice;
            currentCookieIncreasePerSecond = currentCookieIncreasePerSecond + currentGrandmaUprgradeAddition;
            updateCookieCount();
            updateCookieIncrease();
            addItem("grandma");
            updateItem("grandma");
        }
    } else if (type === "farm") {
        let UpgradePrice = getCurrentPrice("farm")
        if (cookieCountNum >= UpgradePrice) {
            cookieCountNum = cookieCountNum - UpgradePrice;
            currentCookieIncreasePerSecond = currentCookieIncreasePerSecond + currentFarmUprgradeAddition;
            updateCookieCount();
            updateCookieIncrease();
            addItem("farm");
            updateItem("farm");
        }
    }
}

function updateItem(type) {
    if (type === "cursor") {
        let UpgradePrice = getCurrentPrice("cursor")
        UpgradePrice = parseInt(UpgradePrice) * 1.15;
        document.getElementById(type + "_price").innerHTML = Math.round(parseInt(UpgradePrice), 1);

        document.getElementById(type + "_count").innerHTML = numberOfCursors;
    }
    if (type === "grandma") {
        let UpgradePrice = getCurrentPrice("grandma")
        UpgradePrice = parseInt(UpgradePrice) * 1.25;
        document.getElementById(type + "_price").innerHTML = Math.round(parseInt(UpgradePrice), 1);

        document.getElementById(type + "_count").innerHTML = numberOfGrandmas;
    }
    if (type === "farm") {
        let UpgradePrice = getCurrentPrice("farm")
        UpgradePrice = parseInt(UpgradePrice) * 1.25;
        document.getElementById(type + "_price").innerHTML = Math.round(parseInt(UpgradePrice), 1);

        document.getElementById(type + "_count").innerHTML = numberOfFarms;
    }
}




document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, { passive: false });







