// variables

// score
let score = 0;
let clickQuantity = 0;
const clickButton = document.getElementById('clickButton');
const scoreDisplay = document.getElementById('score');

// click power
let clickPower = 1;
const clickPowerDisplay = document.getElementById('clickPowerDisplay');

// per second power
let scorePerSecondPower = 0;
const scorePerSecondPowerDisplay = document.getElementById('scorePerSecondDisplay');

// auto click
let autoClickPower = 1000;
let autoClickEnabled = false;
const autoClickButton = document.getElementById('autoClick');

// click effect
const clickEffect = document.getElementById('clickEffect');

// upgrades
const toggleMenuBtn = document.getElementById('toggleMenuBtn');
const menu = document.getElementById('menu');
const upgradesContainer = document.getElementById('upgrades');

// show achievements
const achievementDiv = document.getElementById('achievements');
const achievementTxt = document.getElementById('achievementTxt');

// achievements menu
const achievementsMenu = document.getElementById('achievementsMenu');
const openAchievementsIcon = document.getElementById("openAchievementsIcon");

// events
const eventDisplay = document.getElementById('eventDisplay');
// events buff control
let currentClickPower = 1;
let currentScorePerSecondPower = 0;


// score for click
function UpdateScore() {
    scoreDisplay.innerText = 'score: ' + score;
}

function HandleClick() {
    score += clickPower;
    clickQuantity += 1;
}
clickButton.addEventListener('click', HandleClick);

// score for secund
function ScorePerSecond() {
    score += scorePerSecondPower;
    UpdateScore();
}

function ScorePerSecondInterval() {
    scorePerSecondInterval = setInterval(ScorePerSecond, 1000);
}

ScorePerSecondInterval();

// show points power
function UpdateScorePerClick() {
    clickPowerDisplay.innerText = clickPower;
}

function UpdateScorePerSecond() {
    scorePerSecondPowerDisplay.innerText = scorePerSecondPower;
}

// prevent image interaction
function DisableDrag(event) {
    event.preventDefault();
}
document.addEventListener('dragstart', DisableDrag);

// image effect
clickButton.addEventListener('click', function () {
    const clickedImage = this;
    clickedImage.classList.add('clicked');

    setTimeout(function () {
        clickedImage.classList.remove('clicked');
    }, 100);
});

// auto click
function AutoClickFunc() {
    if (autoClickEnabled) {
        autoClickButton.classList.remove("activated");
        clearInterval(autoClickInterval);
        autoClickEnabled = false;
    } else {
        autoClickButton.classList.add("activated");
        autoClickInterval = setInterval(HandleClick, autoClickPower);
        autoClickEnabled = true;
    }
}
autoClickButton.addEventListener('click', AutoClickFunc);

// click effect
document.addEventListener('DOMContentLoaded', function () {
    clickButton.addEventListener('click', function (event) {
        aplicarEfeito(event);
    });
});

function aplicarEfeito(event) {
    var effect = document.createElement('div');
    effect.classList.add('clickEffect');

    effect.style.left = (event.clientX - 25) + 'px';
    effect.style.top = (event.clientY - 25) + 'px';

    document.body.appendChild(effect);

    setTimeout(function () {
        document.body.removeChild(effect);
    }, 50);
}

// aside menu
toggleMenuBtn.addEventListener('click', function () {
    menu.style.right = (menu.style.right === '0px') ? '-250px' : '0px';
    toggleMenuBtn.classList.toggle('openMenu');
    openAchievementsIcon.classList.toggle('openMenu');
    achievementDiv.classList.toggle('openMenu');
});

// upgrades
const upgrades = [
    { name: 'Bonne', cost: 100, increase: 1, type: 'click', count: 0 },
    { name: 'Meat', cost: 1000, increase: 10, type: 'perSecond', count: 0 },
    { name: 'Roice with Mincedmeat', cost: 5000, increase: 50, type: 'click', count: 0 },
    { name: 'Bread', cost: 10000, increase: 100, type: 'perSecond', count: 0 },
    { name: 'Bread with Cream', cost: 50000, increase: 500, type: 'click', count: 0 },
    { name: 'Meat Bucket', cost: 100000, increase: 1000, type: 'perSecond', count: 0 },
    { name: 'Chicken', cost: 500000, increase: 5000, type: 'click', count: 0 },
    { name: 'Barbecue', cost: 1000000, increase: 10000, type: 'perSecond', count: 0 },
    { name: 'Half Snack', cost: 5000000, increase: 50000, type: 'click', count: 0 },
    { name: 'Snack', cost: 10000000, increase: 100000, type: 'perSecond', count: 0 }

];

function BuyUpgrade(upgradeIndex) {
    const upgrade = upgrades[upgradeIndex];

    if (score >= upgrade.cost) {
        score -= upgrade.cost;
        if (upgrade.type === 'click') {
            clickPower += upgrade.increase;
            currentClickPower += upgrade.increase;
        } else if (upgrade.type === 'perSecond') {
            scorePerSecondPower += upgrade.increase;
            currentScorePerSecondPower += upgrade.increase;
        }
        upgrade.count++;
        UpdateScore();
        UpdateScorePerClick();
        UpdateScorePerSecond();
    } else {
        const upgradeButton = document.querySelector(`button[data-index="${upgradeIndex}"]`);
        upgradeButton.classList.add('unavailable');
        alert('You do not have enough points to purchase this upgrade.');
    }
}

function UpdateUpgradeCounts() {
    upgrades.forEach((upgrade, index) => {
        const upgradeCountElement = document.getElementById(`upgradeCount${index}`);
        if (upgradeCountElement) {
            upgradeCountElement.textContent = `${upgrade.count}`;

            const upgradeButton = document.querySelector(`button[data-index="${index}"]`);
            if (upgradeButton) {
                if (score >= upgrade.cost) {
                    upgradeButton.classList.remove('unavailable');
                } else {
                    upgradeButton.classList.add('unavailable');
                }
            }
        }
    });
}

upgradesContainer.addEventListener('click', function (event) {
    const target = event.target;
    if (target.tagName === 'BUTTON') {
        const upgradeIndex = parseInt(target.dataset.index);
        BuyUpgrade(upgradeIndex);
    }
});

window.addEventListener('DOMContentLoaded', function () {
    upgrades.forEach((upgrade, index) => {
        const upgradeCountElement = document.createElement('span');
        upgradeCountElement.id = `upgradeCount${index}`;
        upgradeCountElement.textContent = `${upgrade.count}`;
        document.getElementById('upgrade' + (index + 1)).appendChild(upgradeCountElement);
    });
});

// achievements

// achievements menu
function OpenAchievementsMenu() {
    achievementsMenu.showModal();
}

function CloseAchievementsMenu() {
    achievementsMenu.close();
}

// unlocking achievements
let unlock = {
    autoClickLvls: {
        up1: false,
        up2: false,
        up3: false
    }
};

function AchievementsUnlock() {
    if (unlock.autoClickLvls.up1 == true) {
        var backGround = document.getElementById('unlockAutoClickLvl1');
        backGround.style.backgroundColor = "green";
    }

    if (unlock.autoClickLvls.up2 == true) {
        var backGround = document.getElementById('unlockAutoClickLvl2');
        backGround.style.backgroundColor = "green";
    }

    if (unlock.autoClickLvls.up3 == true) {
        var backGround = document.getElementById('unlockAutoClickLvl3');
        backGround.style.backgroundColor = "green";
    }
}

// show achievements
let achievementsShown = {
    autoClickLvls: {
        up1: false,
        up2: false,
        up3: false
    }
};

function ShowAutoClick() {
    if (clickQuantity >= 100 && !achievementsShown.autoClickLvls.up1) {
        autoClickButton.hidden = false;
        unlock.autoClickLvls.up1 = true;

        achievementDiv.classList.add("showAchievement");
        achievementTxt.innerText = "Achievement complete: Click 100 times on Kiko";

        setTimeout(function () {
            achievementDiv.classList.remove("showAchievement");
            achievementTxt.innerText = "";
        }, 10000);

        achievementsShown.autoClickLvls.up1 = true;
    }

    if (clickQuantity >= 1000 && !achievementsShown.autoClickLvls.up2) {
        autoClickPower = 100;
        unlock.autoClickLvls.up2 = true;

        achievementDiv.classList.add("showAchievement");
        achievementTxt.innerText = "Achievement complete: Click 1000 times on Kiko";
        setTimeout(function () {
            achievementDiv.classList.remove("showAchievement");
            achievementTxt.innerText = "";
        }, 10000);

        achievementsShown.autoClickLvls.up2 = true;
    }

    if (clickQuantity >= 10000 && !achievementsShown.autoClickLvls.up3) {
        autoClickPower = 10;
        unlock.autoClickLvls.up3 = true;

        achievementDiv.classList.add("showAchievement");
        achievementTxt.innerText = "Achievement complete: Click 10000 times on Kiko";
        setTimeout(function () {
            achievementDiv.classList.remove("showAchievement");
            achievementTxt.innerText = "";
        }, 10000);

        achievementsShown.autoClickLvls.up3 = true;
    }
}

// random events

// rain variables
let createRainInterval;
let rains = [];

// create rain
function createRain() {
    const rain = document.createElement('div');
    rain.classList.add('rain');
    rain.style.left = Math.random() * window.innerWidth + 'px';
    document.getElementById('eventContainer').appendChild(rain);

    rains.push(rain);

    const checkRainPositionInterval = setInterval(() => {
        const rainRect = rain.getBoundingClientRect();

        if (rainRect.bottom <= 0) {
            clearInterval(checkRainPositionInterval);
            removeRain(rain);
        }
    }, 100);
}
// remove rain
function removeRain(rainToRemove) {
    rainToRemove.style.transition = 'opacity 1s';
    rainToRemove.style.opacity = '0';
    document.body.style.backdropFilter = 'blur(1)';
    setTimeout(() => {
        rainToRemove.remove();
        rains = rains.filter(rain => rain !== rainToRemove);
    }, 1000);
}

// wind variables
let createWindInterval;
let winds = [];

// create wind
function createWind() {
    const wind = document.createElement('div');
    wind.classList.add('wind');
    wind.style.left = window.innerWidth - 1000 + 'px';
    wind.style.top = Math.random() * window.innerHeight + 'px';
    document.getElementById('eventContainer').appendChild(wind);

    winds.push(wind);
    const checkWindPositionInterval = setInterval(() => {
        const windRect = wind.getBoundingClientRect();

        if (windRect.right <= 0) {
            clearInterval(checkWindPositionInterval);
            removeWind(wind);
        }
    }, 100);
}
// remove wind
function removeWind(windToRemove) {
    setTimeout(() => {
        windToRemove.remove();
        winds = winds.filter(wind => wind !== windToRemove);
    }, 1000);
}

// events chance
let eventInProgress = false;
function createRandomWeatherEvent() {
    if (!eventInProgress) {
        eventInProgress = true;

        const random = Math.random();

        // if: rain with a 10% chance
        // else if: wind with a 2.5% chance
        // else: none events with 75% chance
        if (random < 0.1) {
            createRainInterval = setInterval(createRain, 100);
            document.body.style.backdropFilter = 'blur(2px)';

            eventDisplay.classList.add('rainTxt');
            eventDisplay.innerText = 'It is raining!  X2 click power';
            clickPower *= 2;

            setTimeout(() => {
                eventDisplay.classList.remove('rainTxt');
                eventDisplay.innerText = '';
            }, 10000);

            // stopping the rain
            setTimeout(function () {
                clearInterval(createRainInterval);
                eventInProgress = false;
                document.body.style.backdropFilter = 'blur(0)';

                clickPower = currentClickPower;
            }, 240000); // event duration
        } else if (random < 0.125) {
            createWindInterval = setInterval(createWind, 1000);

            eventDisplay.classList.add('windTxt');
            eventDisplay.innerText = 'it is windy!  X2 score per second';
            scorePerSecondPower *= 2;

            setTimeout(() => {
                eventDisplay.classList.remove('windTxt');
                eventDisplay.innerText = '';
            }, 10000);

            // stopping the wind
            setTimeout(function () {
                clearInterval(createWindInterval);
                eventInProgress = false;

                scorePerSecondPower = currentScorePerSecondPower;
            }, 240000); // event duration
        } else {
            eventInProgress = false;
        }
    }
}

// end code
function GroupSetIntervalFunctions() {
    ShowAutoClick()
    UpdateUpgradeCounts();
    AchievementsUnlock();
    UpdateScorePerClick();
    UpdateScorePerSecond();  
    UpdateScore();
}

// call function
setInterval(GroupSetIntervalFunctions, 100);

// create random events
setInterval(createRandomWeatherEvent, 60000);

// avoid bugs when closing the page
function minimizingScreenBreak() {
    clearInterval(createRainInterval);
    clearInterval(createWindInterval);
    document.body.style.backdropFilter = 'blur(0)';
    clickPower = currentClickPower;
    scorePerSecondPower = currentScorePerSecondPower;
}

document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') {
        minimizingScreenBreak();
    }
});