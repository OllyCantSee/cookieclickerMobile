let cookieCountNum = 0;
let currentCookieIncrease = 1;

let currentCookieIncreasePerSecond = 0;
let currentCursorUprgradeAddition = 0.1;
let numberOfCursors = 0;

function getCurrentCursorPrice() {
    return document.getElementById("cursor_price").innerHTML;
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
}

function cursorUpgrade() {
    let cursorUpgradePrice = getCurrentCursorPrice()
    if (cookieCountNum >= cursorUpgradePrice) {
        cookieCountNum = cookieCountNum - cursorUpgradePrice;
        currentCookieIncreasePerSecond = currentCookieIncreasePerSecond + currentCursorUprgradeAddition;
        updateCookieCount();
        updateCookieIncrease();
        addItem("cursor");
        updateItem("cursor");
    } else {
        
    }
}

function updateItem(type) {
    let cursorUpgradePrice = getCurrentCursorPrice()
    if (type === "cursor") {
        cursorUpgradePrice = parseInt(cursorUpgradePrice) * 1.15;
        document.getElementById(type + "_price").innerHTML = Math.round(parseInt(cursorUpgradePrice), 1);

        document.getElementById(type + "_count").innerHTML = numberOfCursors;
    }
}




document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, { passive: false });
