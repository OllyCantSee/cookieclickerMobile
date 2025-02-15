let cookieCountNum = 0;
let totalCookieCountNum = 0;
let currentCookieIncrease = 1;

let currentCookieIncreasePerSecond = 0;
let currentCursorUprgradeAddition = 0.1;
let currentGrandmaUprgradeAddition = 1;
let currentFarmUprgradeAddition = 8;
let numberOfCursors = 0;
let cursorLevelUpCount = 0;
let numberOfGrandmas = 0;
let numberOfFarms = 0;

checkIfSavedCookies()
checkIfSavedIncreasePerSecond()
checkUnlock()
checkPrice("cursor")
checkPrice("grandma")
checkPrice("farm")

console.log(totalCookieCountNum)

function checkPrice(type) {
    let itemPrice =  document.getElementById(type + "_price").innerHTML;

    if (cookieCountNum >= itemPrice) {
        document.getElementById(type + "_price").classList.add("green_text")
        document.getElementById(type + "_price").classList.remove("red_text")
    } else {
        document.getElementById(type + "_price").classList.add("red_text")
        document.getElementById(type + "_price").classList.remove("green_text")
    }
}

function checkUnlock() {
    if (totalCookieCountNum >= 15) {
        document.getElementById("cursor_button_name").innerHTML = "Cursor"
        document.getElementById("cursor_button_image").classList.remove("cursor_button_image")
        document.getElementById("cursor_price").classList.remove("cursor_price")
        document.getElementById("cursor_dark_cover").classList.remove("cursor_dark_cover")
    }
}

function getCurrentPrice(type) {
    return document.getElementById(type + "_price").innerHTML;
}

// Add cookie FROM CLICKING
function addCookie() {
    cookieCountNum = cookieCountNum + currentCookieIncrease;
    totalCookieCountNum = totalCookieCountNum + currentCookieIncrease;
    saveTotalCookieCount()
    checkUnlock()
    updateCookieCount()
    saveCookieCount()
    checkPrice("cursor")
    checkPrice("grandma")
    checkPrice("farm")
}

// add cookie FROM TIMER
function addCookieFromIncrease() {
    cookieCountNum = cookieCountNum + currentCookieIncreasePerSecond
    saveTotalCookieCount()
    updateCookieCount()
    checkPrice("cursor")
    checkPrice("grandma")
    checkPrice("farm")
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
    saveTotalCookieCount()
    addCookieFromIncrease()
    saveCookieCount()
    checkPrice("cursor")
    checkPrice("grandma")
    checkPrice("farm")
}

function addItem(type) {
    if (type === "cursor") {
        numberOfCursors = numberOfCursors + 1;
        saveCursorCount()
        saveCookieCount()
        saveCurrentCursorAddition()
        checkPrice("grandma")
        checkPrice("farm")
        checkPrice("cursor")
    }
    if (type === "grandma") {
        numberOfGrandmas = numberOfGrandmas + 1;
        saveCookieCount()
        checkPrice("cursor")
        checkPrice("grandma")
        checkPrice("farm")
    }
    if (type === "farm") {
        numberOfFarms = numberOfFarms + 1;
        saveCookieCount()
        checkPrice("cursor")
        checkPrice("grandma")
        checkPrice("farm")
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
            saveCurrentCursorAddition()
            addItem("cursor");
            updateItem("cursor");
            checkPrice("grandma")
            checkPrice("farm")
            checkPrice("cursor")
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
            checkPrice("grandma")
            checkPrice("farm")
            checkPrice("cursor")
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
            checkPrice("grandma")
            checkPrice("farm")
            checkPrice("cursor")
        }
    }
}

function updateItem(type) {
    if (type === "cursor") {
        let UpgradePrice = getCurrentPrice("cursor")
        UpgradePrice = parseInt(UpgradePrice) * 1.15;
        document.getElementById(type + "_price").innerHTML = Math.round(parseInt(UpgradePrice), 1);

        document.getElementById(type + "_count").innerHTML = numberOfCursors;
        
        return UpgradePrice;
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
            cursorLevelUpCount = cursorLevelUpCount + 1

            saveCurorLevelUpCount()

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

    // Dropper Effect

    const cookieSection = document.getElementById('cookie_section');
    const style = window.getComputedStyle(cookieSection);
    const width = parseFloat(style.width);

    let randomWidth = Math.random() * (width - 10) + 10;

    const cookieBackgroundDropper = document.createElement("div");
    const cookieBackgroundDropperImage = document.createElement("img");
    cookieBackgroundDropperImage.src = "Cookie Image.png";
    cookieBackgroundDropper.appendChild(cookieBackgroundDropperImage);
    cookieBackgroundDropper.classList.add("falling_cookie")

    cookieBackgroundDropper.style.left = randomWidth + "px";

    cookieSection.appendChild(cookieBackgroundDropper)

    setTimeout(() => {
        cookieBackgroundDropper.remove();
    }, 2000);



    // Cookie Effect
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
});


// SAVE COOKIES FUNCTION 

function saveCookieCount() {
    localStorage.setItem("cookie_count", cookieCountNum)
}
function saveCursorCount() {
    localStorage.setItem("cursor_count", numberOfCursors)
}
function saveCurrentCursorAddition() {
    localStorage.setItem("cursor_addition", currentCursorUprgradeAddition)
}
function saveCurrentCursorUpgradePrice(UpgradePrice) {
    localStorage.setItem("cursor_upgrade_price", UpgradePrice)
}
function saveCurorLevelUpCount() {
    localStorage.setItem("cursor_level_up_count", cursorLevelUpCount)
}
function saveTotalCookieCount() {
    localStorage.setItem("total_cookie_count", totalCookieCountNum)
}


function checkIfSavedIncreasePerSecond() {
    let executed = false
    if (localStorage.getItem("cursor_addition") != null && !executed) {

        let numberOfCursorsStorage = localStorage.getItem("cursor_count");
        let numberOfCursorsParsed = JSON.parse(numberOfCursorsStorage);

        numberOfCursors = numberOfCursorsParsed;

        let currentCursorAdditionStorage = localStorage.getItem("cursor_addition");
        let currentSavedCursorAdditionParsed = JSON.parse(currentCursorAdditionStorage);

        let currentCursorCountStorage = localStorage.getItem("cursor_count");
        let currentCursorCountParsed = JSON.parse(currentCursorCountStorage);

        let StorageUpdatedCursorIncrease = currentSavedCursorAdditionParsed * currentCursorCountParsed;


        if (localStorage.getItem("cursor_level_up_count") != null) { 

            let currentCursorLevelUpStorage = localStorage.getItem("cursor_level_up_count");
            let currentCursorLevelUpParsed = JSON.parse(currentCursorLevelUpStorage);

            console.log(currentCursorLevelUpParsed)

            if (currentCursorLevelUpParsed == 1) {
                StorageUpdatedCursorIncrease = StorageUpdatedCursorIncrease * 2
                currentCookieIncreasePerSecond = currentCookieIncreasePerSecond + StorageUpdatedCursorIncrease;
                document.getElementById("level_up_button").remove();
                currentCookieIncrease = currentCookieIncrease * 2;
                currentCursorUprgradeAddition = currentCursorUprgradeAddition * 2
            }
        } else {
            currentCookieIncreasePerSecond = currentCookieIncreasePerSecond + StorageUpdatedCursorIncrease;
        }

        updateCookieIncrease()
        let UpgradePrice = updateItem("cursor")

        saveCurrentCursorUpgradePrice(UpgradePrice)



        executed = true
    }
}

function checkIfSavedCookies() {
    let executed = false
    if (localStorage.getItem("cookie_count") != null && !executed && localStorage.getItem("total_cookie_count") != null) {
        let cookiesFromStorage = localStorage.getItem("cookie_count")
        let cookieCountNumParsed = JSON.parse(cookiesFromStorage);
        cookieCountNum = cookieCountNumParsed
        executed = true
        updateCookieCount()

        let totalCookiesFromStorage = localStorage.getItem("total_cookie_count")
        let totalCookieCountNumParsed = JSON.parse(totalCookiesFromStorage);
        totalCookieCountNum = totalCookieCountNumParsed
    }
}

function resetGame() {
    localStorage.removeItem("cookie_count", cookieCountNum)
    localStorage.removeItem("cursor_count", numberOfCursors)
    localStorage.removeItem("cursor_addition", currentCursorUprgradeAddition)
    localStorage.removeItem("cursor_upgrade_price", UpgradePrice)
    localStorage.removeItem("cursor_level_up_count", cursorLevelUpCount)
}
