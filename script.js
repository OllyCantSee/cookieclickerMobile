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




function buttonLevelUp(type, element) {
    if(type === "cursor_upgrade") {
        let UpgradePrice = getCurrentPrice("level_up")
        if (cookieCountNum >= UpgradePrice && numberOfCursors > 0) {
            
            deleteLastLevelUpButton(element)

            cookieCountNum = cookieCountNum - UpgradePrice;

            let previousCursorUpgradeAddition = currentCursorUprgradeAddition
            currentCursorUprgradeAddition = currentCursorUprgradeAddition * 2 // New upgrade addition is 0.2 when you buy a cursor

            let previousIncreasePerSecond = previousCursorUpgradeAddition * numberOfCursors;
            let newCursorIncreasePerSecond = (previousIncreasePerSecond * 2) / 2;
            
            currentCookieIncreasePerSecond = currentCookieIncreasePerSecond + newCursorIncreasePerSecond;

            currentCookieIncrease = currentCookieIncrease * 2;

            updateCookieIncrease();
            updateCookieCount();
        }
    }

    if(type === "grandma_upgrade") {
        let UpgradePrice = getCurrentPrice("level_up")
        if (cookieCountNum >= UpgradePrice && numberOfGrandmas > 0) {

            cookieCountNum = cookieCountNum - UpgradePrice;

            deleteLastLevelUpButton(element)

            let previousGrandmaUpgradeAddition = currentGrandmaUprgradeAddition
            currentGrandmaUprgradeAddition = currentGrandmaUprgradeAddition * 2 // New upgrade addition is 0.2 when you buy a cursor

            let previousIncreasePerSecond = previousGrandmaUpgradeAddition * numberOfGrandmas;
            let newGrandmaIncreasePerSecond = (previousIncreasePerSecond * 2) / 2;
            
            currentCookieIncreasePerSecond = currentCookieIncreasePerSecond + newGrandmaIncreasePerSecond;

            updateCookieIncrease();
            updateCookieCount();
        }
    }
}



document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
}, { passive: false });


function deleteLastLevelUpButton(element) {
    const elements = document.querySelectorAll("#level_up_button");
    if (elements.length > 0) {
        const lastElement = elements[element];
        lastElement.remove();
    }
}




// COOKIE EFFECT FUNCTIONS

let cookieSection = document.getElementById("cookie_button");

cookieSection.addEventListener("mousedown", function(event) {
    let cookieBox = document.getElementById("cookie_container");
    
    let rect = cookieBox.getBoundingClientRect();
    let mouseXCoordinate = event.clientX - rect.left;
    let mouseYCoordinate = event.clientY - rect.top;

    const cookieDropper = document.createElement("div");
    const cookieDropperImage = document.createElement("img");
    cookieDropperImage.src = "Cookie Image.png";
    cookieDropper.appendChild(cookieDropperImage);
    cookieDropper.classList.add("cookie_float");

    const cookieAdditionMessage = document.createElement("h1");
    cookieAdditionMessage.classList.add("cookie_addition_number")
    cookieAdditionMessage.innerHTML = "+" + currentCookieIncrease;

    const randomMovementValueX = [-30, -25, -20, 0, 20, 25, 30];
    let randomMovementX =  Math.floor(Math.random() * randomMovementValueX.length);

    const randomMovementValueY = [-30, -25, -20, 0, 20, 25, 30];
    let randomMovementY =  Math.floor(Math.random() * randomMovementValueY.length);

    const verticalOffset = 10; // Adjust this value as needed
    cookieDropper.style.top = (mouseYCoordinate + verticalOffset - randomMovementY) + "px";
    cookieDropper.style.left = mouseXCoordinate - randomMovementX + "px";

    cookieAdditionMessage.style.top = (mouseYCoordinate + verticalOffset - randomMovementY) + "px";
    cookieAdditionMessage.style.left = mouseXCoordinate - randomMovementX + "px";

    cookieBox.appendChild(cookieDropper);
    cookieBox.appendChild(cookieAdditionMessage);

    setTimeout(() => {
        cookieDropper.remove();
    }, 2000);
    setTimeout(() => {
        cookieAdditionMessage.remove();
    }, 4000);

    console.log(mouseXCoordinate);
    console.log(mouseYCoordinate);
});



