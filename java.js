let size = 0;
let sps = 0;
let extraspsps = 0;
let clickbonus = 0;
let spc = 1;
let scoredisp = 0;
let newcost = 0;
let newdisp = 0;
let shownsize = 0;
let newerdisp = 0;
let clickcount = 0;
let playedseconds = 0;
let clicksbonus = 0;
let addedclicks = 1;
let files = 0;
let folders = 0;
let harddrives = 0;
let ismobile = 0;
let isloading = 1;

// * Important Functions *

// Detects if you are using a mobile device. Taken from https://stackoverflow.com/questions/11013778/a-check-in-javascript-that-returns-whether-i-am-on-a-smartphone?noredirect=1&lq=1
if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 ){
	// Enables mobile mode if you are using a mobile device
	ismobile = 1;
	var entiredocument = document.body;
	entiredocument.classList.toggle("mobile-mode");
	document.getElementById("clickuphead").innerHTML = "Tapping Upgrades";
	document.getElementById("clickuptext").innerHTML = "These upgrades increase your file size even more per tap";
}
console.log(ismobile);
// To make the game run faster, allows quicker access to some commonly used elements
const scorel = document.getElementById("score");
const bpscount = document.getElementById("bpscounter");
const bpcount = document.getElementById("bpcounter");
// When using the sleep command in a function you must use async or else it won't work!
function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms));}
// Generates a random integer from a minimum and maximum value
function randInt(min, max) {return Math.floor(Math.random() * (max - min + 1) ) + min;}
// Rounds a number into a file size format. Has different priority modes, can also add zeroes (to prevent motion)
function roundSizeDisp(currentDisp, priorityMode, addZeroes) {
	function ifAddZeroes() {
		newerdisp = Math.round(newerdisp);
		newerdisp = newerdisp / 1000;
		if (addZeroes === 1) {newerdisp = addTheZeroes(newerdisp);}
	}
	if (currentDisp === 1) {newerdisp = '1 byte';}
	else {
		if (currentDisp >= 1000) {
			if (currentDisp >= 1000000) {
				if (currentDisp >= 1000000000) {
					if (currentDisp >= 1000000000000) {
						// TB
						newerdisp = currentDisp / 1000000000;
						ifAddZeroes();
						// @ts-ignore
						newerdisp = `${newerdisp} TB`;
					} else {
						// GB
						newerdisp = currentDisp / 1000000;
						ifAddZeroes();
						// @ts-ignore
						newerdisp = `${newerdisp} GB`;
					}
				} else {
					// MB
					newerdisp = currentDisp / 1000;
					ifAddZeroes();
					// @ts-ignore
					newerdisp = `${newerdisp} MB`;
				}
			} else {
				// KB
				newerdisp = Math.round(currentDisp);
				newerdisp = newerdisp / 1000;
				if (addZeroes === 1) {newerdisp = addTheZeroes(newerdisp);}
				// @ts-ignore
				newerdisp = `${newerdisp} KB`;
			}
		} else {
			// Bytes
			newerdisp = Math.round(currentDisp);
			// @ts-ignore
			newerdisp = `${newerdisp} bytes`;
		}
	} if (priorityMode === 'n') {newdisp = newerdisp;}
	else if (priorityMode === 's') {
		bpscount.innerHTML = newerdisp + " per second";
		document.getElementById("ontopsps").innerHTML = newerdisp + " per second";
	} else if (priorityMode === 'm') {
		// @ts-ignore
		scorel.innerHTML = newerdisp;
		// @ts-ignore
		document.getElementById("ontopsize").innerHTML = newerdisp;
	} else if (priorityMode === "title") {document.querySelector("title").textContent = `${newerdisp} - idle file`;}
	else {return newerdisp;}
}
// Rounds variables to different non byte displays (like thousands, millions)
function roundDisp(currentDisp, priorityMode, addZeroes) {
	if (currentDisp >= 1000) {
		if (currentDisp >= 1000000) {
			if (currentDisp >= 1000000000) {
				if (currentDisp >= 1000000000000) {
					// Trillions
					newerdisp = currentDisp / 1000000000;
					newerdisp = Math.round(newerdisp);
					newerdisp = newerdisp / 1000;
					if (addZeroes === 1) {newerdisp = addTheZeroes(newerdisp);}
					// @ts-ignore
					newerdisp = `${newerdisp} T`;
				} else {
					// Billions
					newerdisp = currentDisp / 1000000;
					newerdisp = Math.round(newerdisp);
					newerdisp = newerdisp / 1000;
					if (addZeroes === 1) {newerdisp = addTheZeroes(newerdisp);}
					// @ts-ignore
					newerdisp = `${newerdisp} B`;
				}
			} else {
				// Millions
				newerdisp = currentDisp / 1000;
				newerdisp = Math.round(newerdisp);
				newerdisp = newerdisp / 1000;
				if (addZeroes === 1) {newerdisp = addTheZeroes(newerdisp);}
				// @ts-ignore
				newerdisp = `${newerdisp} M`;
			}
		} else {
			// Thousands
			newerdisp = Math.round(currentDisp);
			newerdisp = addCommasToNumber(newerdisp);
		}
	} else {
		// Ones
		newerdisp = currentDisp
	}
	if (priorityMode === 'n') {newdisp = newerdisp;}
	else if (priorityMode === 's') {
		bpscount.innerHTML = newerdisp + " per second";
		document.getElementById("ontopsps").innerHTML = newerdisp + " per second";
	} else if (priorityMode === 'm') {
		// @ts-ignore
		scorel.innerHTML = newerdisp;
		// @ts-ignore
		document.getElementById("ontopsize").innerHTML = newerdisp;
	} else if (priorityMode === "title") {document.querySelector("title").textContent = `${newerdisp} - idle file`;}
	else {return newerdisp;}
}
// Adds zeroes to the end of rounded displays (if requested) to prevent motion
function addTheZeroes(addingVariable) {return parseFloat(addingVariable).toFixed(3);}
// Adds commas to a number to make it more readable. Taken from StackOverflow (https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript)
function addCommasToNumber(addingVariable) {return addingVariable.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}

// * Displays *

let doRoundDisplay = 1;
// Updates the size counter and title of the page
function refreshSize() {
	if (doRoundDisplay === 1) {
		shownsize = Math.round(size);
		roundSizeDisp(shownsize, 'm', 1);
		const showncommas = addCommasToNumber(shownsize);
		scorel.title = `${showncommas} bytes`;
	} else {
		shownsize = Math.round(size);
		shownsize = addCommasToNumber(shownsize);
		scorel.title = "";
		scorel.innerHTML = `${shownsize} bytes`;
		document.getElementById("ontopsize").innerHTML = `${shownsize} bytes`;
	}
}
// Updates the bytes per second display
function refreshBPS() {
	if (doRoundDisplay === 1) {
		roundSizeDisp(sps, 's', 1);
		const shownsps = addCommasToNumber(sps);
		bpscount.title = `${shownsps} bytes per second`;
		const shownbpc = addCommasToNumber(spc);
		const roundedbpc = roundSizeDisp(spc, 'return', 1);
		bpcount.innerHTML = `${roundedbpc} per click`;
		bpcount.title = `${shownbpc} bytes per click`;
		document.getElementById("ontopspc").innerHTML = `${roundedbpc} per click`;
	} else {
		const shownsps = addCommasToNumber(sps);
		// If the bytes per second count is 1, show "byte" instead of "bytes"
		if (shownsps === 1) {
			bpscount.innerHTML = "1 byte per second";
			bpscount.title = "1 byte per second";
		} else {
			bpscount.innerHTML = `${shownsps} bytes per second`;
			bpscount.title = `${shownsps} bytes per second`;
		}
		const shownbpc = addCommasToNumber(spc);
		// If the bytes per click count is 1, show "byte" instead of "bytes"
		if (shownbpc === 1) {
			bpcount.innerHTML = "1 byte per click";
			bpcount.title = "1 byte per click";
			document.getElementById("ontopspc").innerHTML = `1 byte per click`;
		} else {
			bpcount.innerHTML = `${shownbpc} bytes per click`;
			bpcount.title = `${shownbpc} bytes per click`;
			document.getElementById("ontopspc").innerHTML = `${shownbpc} bytes per click`;
		}
	}
	checkBuildLevel();
}
// A base for refreshing displays on special buttons
function refreshSpecialModel(pointVariable, pointReq, ElementIdent, lockedend, unlockedtext, doRound) {
	const elmchang = document.getElementById(ElementIdent);
	// shows the text when its uplocked i guess
	if (pointVariable >= pointReq) {elmchang.innerHTML = unlockedtext;}
	else {
		const subtractending = pointReq - pointVariable;
		if (doRound === 1) {
			roundSizeDisp(subtractending, 'n', 1);
			elmchang.innerHTML = newdisp + lockedend;
		} else {elmchang.innerHTML = subtractending + lockedend;}
	}
}
// Checks to see if something was unlocked, and displays a snackbar if it was
function checkSpecial(pointVariable, pointReq, isUnlockedVar, unlockMessage, displayTime) {
	if (isUnlockedVar === 0) {
		if (pointVariable >= pointReq) {
			displaySnackbar(displayTime, unlockMessage);
			return 1;
		} else {return 0;}
	} else {return 1;}
}
let sizefromclicking = 0;
let selfsusunlocked = 0;
let badaiunlocked = 0;
let plasticcursorunlocked = 0;
// Refreshes the display for special buttons
function refreshSpecial() {
	refreshSpecialModel(clickcount, 1500, "selfsusmachine", " clicks remaining!", "Self Sustained Machine (10 MB)");
	selfsusunlocked = checkSpecial(clickcount, 1500, selfsusunlocked, "Self sustained machine unlocked!", 10000);
	refreshSpecialModel(playedseconds, 600, "aiupgradebutton", " seconds remaining!", "Bad AI (10 MB)");
	badaiunlocked = checkSpecial(playedseconds, 600, badaiunlocked, "Bad AI unlocked!", 10000);
	refreshSpecialModel(sizefromclicking, 100000, "purchaseplasticursor", " from clicking remaining!", "Plastic Cursor (1 MB)", 1);
	plasticcursorunlocked = checkSpecial(sizefromclicking, 100000, plasticcursorunlocked, "Unlocked plastic cursor!", 10000);
}
// Refreshes all displays
function refreshAll() {
	refreshSize();
	refreshBPS();
	refreshSpecial();
}
// Allows you to change the color of an object
function changeObjectColor(coloredObject, theColor, theTextColor) {
	const colob = document.getElementById(coloredObject);
	colob.style.backgroundColor = theColor;
	colob.style.color = theTextColor;
}
// ! The snackbar currently glitches out when a snackbar is called while one is already on the screen
async function displaySnackbar(snackTime, snackMessage) {
	const snackbar = document.getElementById("snackbar");
	snackbar.innerHTML = snackMessage;
	snackbar.className = "show";
	await sleep(snackTime);
	snackbar.className = "hide";
}

// * Awards *

let clickawardlevel = 1;
let clicklevelreq = 100;
// TODO: Try and optimize this code block, it relies on if chains too much and is not well optimized
function checkClickLevel() {
	if (clickawardlevel === 1) {
		if (clickcount >= 100) {
			clickawardlevel = 2;
			clicklevelreq = 1000;
			document.getElementById("clickerawardtitle").innerHTML = "Clicker: Level 1";
			document.getElementById("clickerawardtext").innerHTML = "Click 1000 times";
		}
	}
	if (clickawardlevel === 2) {
		if (clickcount >= 1000) {
			clickawardlevel = 3;
			clicklevelreq = 10000;
			document.getElementById("clickerawardtitle").innerHTML = "Clicker: Level 2";
			document.getElementById("clickerawardtext").innerHTML = "Click 10000 times";
		}
	}
}
let buildawardlevel = 0;
let buildawardlevelreq = 1;
// TODO: Try and optimize this code block, it relies on if chains too much and is not well optimized
function checkBuildLevel() {
	if (buildawardlevel === 0) {
		if (sps >= 1) {
			buildawardlevel = 1;
			buildawardlevelreq = 10;
			document.getElementById("factoryawardtitle").innerHTML = `Builder: Level ${buildawardlevel}`
			document.getElementById("factoryawardtext").innerHTML = `Reach ${buildawardlevelreq} bytes per second`;
		}
	}
	if (buildawardlevel === 1) {
		if (sps >= 10) {
			buildawardlevel = 2;
			buildawardlevelreq = 100;
			document.getElementById("factoryawardtitle").innerHTML = `Builder: Level ${buildawardlevel}`
			document.getElementById("factoryawardtext").innerHTML = `Reach ${buildawardlevelreq} bytes per second`;
		}
	}
	if (buildawardlevel === 2) {
		if (sps >= 100) {
			buildawardlevel = 2;
			buildawardlevelreq = 1000;
			document.getElementById("factoryawardtitle").innerHTML = `Builder: Level ${buildawardlevel}`
			document.getElementById("factoryawardtext").innerHTML = `Reach ${buildawardlevelreq} bytes per second`;
		}
	}
}
// Adds file size to the score. Use this instead of directly adding onto the variable
function addFileSize(addingVariable) {
	const addedsize = size + addingVariable;
	if (addedsize >= 256000000000000) {size = 256000000000000;}
	else {size = size + addingVariable;}
}
// Used to create a typing effect
async function typingEffect(typingText, typingSpeed, typingElement) {
	let i = 0;
	while (i < typingText.length) {
		document.getElementById(typingElement).innerHTML += typingText.charAt(i);
		i++;
		const typingspeedmin = typingSpeed - 10;
		const typingspeedmax = typingSpeed + 10;
		const selectedtypingspeed = randInt(typingspeedmin, typingspeedmax);
		await sleep(selectedtypingspeed);
	}
}
// Gives you points every second
async function secondlyPoints() {
	const throwaway1 = -10;
	const throwaway2 = 10;
	while (throwaway1 < throwaway2) {
		const tempsps = sps / 50;
		addFileSize(tempsps);
		refreshAll();
		await sleep(20);
	}
}
// Gives you extra size per second if you have anything giving you an upgrade
async function giveSpsBonus() {
	const throwaway1 = -10;
	const throwaway2 = 10;
	while (throwaway1 < throwaway2) {
		sps = sps + extraspsps;
		playedseconds++;
		refreshAll();
		await sleep(1000);
	}
}

// * Upgrades *

let upgradesbought = 0;
let autoupgradesbought = 0;
let clickupgradesbought = 0;
let spentonupgrades = 0;
let spentonautoupgrades = 0;
let spentonclickupgrades = 0;
// Base for upgrades that automatically give you points
function autoUpgrade(upincrease, sizevar) {
	sps = sps + upincrease;
	size = size - sizevar;
	spentonupgrades = spentonupgrades + sizevar;
	spentonautoupgrades = spentonautoupgrades + sizevar;
	newcost = sizevar * 1.15;
	newcost = Math.round(newcost);
	upgradesbought++;
	autoupgradesbought++;
	return newcost;
}
// Base for upgrades that give you more points every time you click
function clickUpgrade(upincrease, sizevar) {
	spc = spc + upincrease;
	size = size - sizevar;
	spentonupgrades = spentonupgrades + sizevar;
	spentonclickupgrades = spentonclickupgrades + sizevar;
	newcost = sizevar * 1.15;
	newcost = Math.round(newcost);
	upgradesbought++;
	clickupgradesbought++;
	return newcost;
}
// Base for upgrades that are of other types
function specialUpgrade(cost, req, reqvar, varToIncrease, increaseValue, elementIden) {
	if ((reqvar >= req) && (size >= cost)) {
		size = size - cost;
		refreshAll();
		upgradesbought++;
		spentonupgrades = spentonupgrades + cost;
		document.getElementById(elementIden).style.display = "none";
		return varToIncrease + increaseValue;
	}
}
// Automatic upgrades
let spscost = 15;
let boughtpressers = 0;
function upgradeSPS() {
	if (size >= spscost) {
		spscost = autoUpgrade(1, spscost);
		boughtpressers++;
		updateAllDisplays();
		refreshAll();
	}
}
let catcost = 150;
let boughtcats = 0;
function buyCat() {
	if (size >= catcost) {
		catcost = autoUpgrade(5, catcost);
		boughtcats++;
		updateAllDisplays();
		refreshAll();
	}
}
let holdcost = 1000;
let boughtholders = 0;
function buyHold() {
	if (size >= holdcost) {
		holdcost = autoUpgrade(30, holdcost);
		boughtholders++;
		updateAllDisplays();
		refreshAll();
	}
}
let macrocost = 50000;
let boughtmacros = 0;
function buyWordMacro() {
	if (size >= macrocost) {
		macrocost = autoUpgrade(250, macrocost);
		boughtmacros++;
		updateAllDisplays();
		refreshAll();
	}
}
let colabcost = 1000000;
let boughtcolabs = 0;
function buyCollab() {
	if (size >= colabcost) {
		colabcost = autoUpgrade(5000, colabcost);
		boughtcolabs++;
		updateAllDisplays();
		refreshAll();
	}
}
// Clicking upgrades
let fingercost = 250;
let boughtfingers = 0;
function buyFinger() {
	if (size >= fingercost) {
		fingercost = clickUpgrade(1, fingercost);
		boughtfingers++;
		updateAllDisplays();
		refreshAll();
	}
}
let keycost = 10000;
let boughtkeys = 0;
function buyKeyboard() {
	if (size >= keycost) {
		keycost = clickUpgrade(40, keycost);
		boughtkeys++;
		updateAllDisplays();
		refreshAll();
	}
}
let macrobuttoncost = 150000;
let boughtmacrobuts = 0;
function buyMacroButton() {
	if (size >= macrobuttoncost) {
		macrobuttoncost = clickUpgrade(500, macrobuttoncost);
		boughtmacros++;
		updateAllDisplays();
		refreshAll();
	}
}
let copypastecost = 10000000;
let boughtcopys = 0;
function buyCopyPaste() {
	if (size >= copypastecost) {
		copypastecost = clickUpgrade(30000, copypastecost);
		boughtcopys++;
		updateAllDisplays();
		refreshAll();
	}
}
// Other upgrades
function buyBadAi() {extraspsps = specialUpgrade(10000000, 600, playedseconds, extraspsps, 1, "aiupgradediv");}
function buySelfSustainedMachine() {clickbonus = specialUpgrade(10000000, 1500, clickcount, clickbonus, 1, "selfsusmach");}
function buyPlasticCursor() {clickbonus = specialUpgrade(1000000, 100000, sizefromclicking, clickbonus, 0.01, "plasticursor");}
// Changes the color of the buttons to green if you can afford to buy something
async function updateButtons() {
	const throwaway1 = -10;
	const throwaway2 = 10;
	while (throwaway1 < throwaway2) {
		buttonColor("keypresser", spscost, 'n', 'n');
		buttonColor("catbuy", catcost, 'n', 'n');
		buttonColor("holdbuy", holdcost, 'n', 'n');
		buttonColor("fingerpurchase", fingercost, 'n', 'n');
		buttonColor("aiupgradebutton", 10000000, 600, playedseconds);
		buttonColor("selfsusmachine", 10000000, 1500, clickcount);
		buttonColor("keyboardpurchase", keycost, 'n', 'n');
		buttonColor("purchaseplasticursor", 1000000, 100000, sizefromclicking);
		buttonColor("macrobuy", macrocost, 'n', 'n');
		buttonColor("collabuy", colabcost, 'n', 'n');
		buttonColor("macrobutpurchase", macrobuttoncost, 'n', 'n');
		buttonColor("copypastepurchase", copypastecost, 'n', 'n');
		await sleep(100);
	}
}
// Used whenever the "type" button is clicked
function oneByte() {
	const tempaddclicks = sps * clicksbonus;
	addedclicks = spc + tempaddclicks;
	addFileSize(addedclicks);
	sps = sps + clickbonus;
	sizefromclicking = sizefromclicking + addedclicks;
	clickcount++;
	checkClickLevel();
	refreshAll();
}

// * Cookies *

// Sets a cookie
function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;Secure";
}
// Gets a cookie
function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {c = c.substring(1);}
		if (c.indexOf(name) == 0) {return c.substring(name.length, c.length);}
	}
	return "";
}
let seencookies = 0;
// Loads a varaible from the cookies and then converts it to a number. Sets the variable to 0 if there is nothing there.
function loadCvar(cookieLoad) {
	const loadedcount = getCookie(cookieLoad);
	if (loadedcount != "") {return Number(loadedcount);}
	else {return 0;}
}

// * Settings/Others *

let isDarkModeEnabled = 0;
let savedarkmodenabled = 0;
// Used to toggle the dark theme option
function toggleDarkMode() {
	var entiredocument = document.body;
	entiredocument.classList.toggle("dark-mode");
	const dmb = document.getElementById("darkmodebutton");
	if (isDarkModeEnabled === 0) {
		isDarkModeEnabled = 1;
		changeObjectColor("darkmodebutton", "white", "black");
		dmb.innerHTML = "Disable Dark Mode";
		changeObjectColor("snackbar", "white", "black");
		displaySnackbar(3000, "Dark mode enabled!");
	} else {
		isDarkModeEnabled = 0;
		changeObjectColor("darkmodebutton", "black", "white");
		dmb.innerHTML = "Enable Dark Mode";
		changeObjectColor("snackbar", "black", "white");
		displaySnackbar(3000, "Dark mode disabled!");
	}
	setCookie("darkthemesaved", isDarkModeEnabled, 2000);
}
// Updates the title of the page to display a rounded byte count every second
async function updatePageTitleOnStart() {
	const throwaway1 = -10;
	const throwaway2 = 10;
	while (throwaway1 < throwaway2) {
		await sleep(1000);
		roundSizeDisp(size, "title", 0);
	}
}
// If there is no special variable use 'n' for the specialReq and specialVar
function buttonColor(objectId, varnumber, specialReq, specialVar) {
	if (specialReq === 'n') {
		// used when there is no special variable
		if (size >= varnumber) {changeObjectColor(objectId, "greenyellow", "black");}
		else {changeObjectColor(objectId, "red", "black");}
	} else if (specialVar >= specialReq) {
		// used when there is a special variable
		if (size >= varnumber) {changeObjectColor(objectId, "greenyellow", "black");}
		else {changeObjectColor(objectId, "red", "black");}
	}
	else if (isDarkModeEnabled === 0) {changeObjectColor(objectId, "black", "white");}
	else {changeObjectColor(objectId, "white", "black");}
}
// Uses cookies to automatically enable dark theme if it has been previously enabled
function loadDarkTheme() {
	savedarkmodenabled = loadCvar("darkthemesaved");
	if (savedarkmodenabled === 1) {toggleDarkMode();}
}
// Updates all of the button displays
function updateAllDisplays() {
	function ifGreaterThanShow(showvar, elementToShow) {
		if (showvar >= 1) {document.getElementById(elementToShow).style.display = "inline";}
	}
	roundSizeDisp(spscost, 'n', 1);
	document.getElementById("keypresser").innerHTML = "Keypresser (" + newdisp + ", +1 byte per second)";
	ifGreaterThanShow(boughtpressers, "catbuy");
	ifGreaterThanShow(boughtpressers, "fingerpurchase");
	roundSizeDisp(catcost, 'n', 1);
	document.getElementById("catbuy").innerHTML = "Cat (" + newdisp + ", +5 bytes per second)";
	ifGreaterThanShow(boughtcats, "holdbuy");
	roundSizeDisp(holdcost, 'n', 1);
	document.getElementById("holdbuy").innerHTML = "Key Holder (" + newdisp + ", +30 bytes per second)";
	ifGreaterThanShow(boughtholders, "macrobuy");
	roundSizeDisp(macrocost, 'n', 1);
	document.getElementById("macrobuy").innerHTML = "Word Macro (" + newdisp +", +250 bytes per second)";
	ifGreaterThanShow(boughtmacros, "collabuy");
	roundSizeDisp(colabcost, 'n', 1);
	document.getElementById("collabuy").innerHTML = "Collab Document (" + newdisp + ", +5 KB per second)";
	roundSizeDisp(fingercost, 'n', 1);
	document.getElementById("fingerpurchase").innerHTML = "Extra Finger (" + newdisp + ", +1 byte per click)";
	ifGreaterThanShow(boughtfingers, "keyboardpurchase");
	roundSizeDisp(keycost, 'n', 1);
	document.getElementById("keyboardpurchase").innerHTML = `Extra Keyboard (${newdisp}, +40 bytes per click)`;
	ifGreaterThanShow(boughtkeys, "macrobutpurchase");
	roundSizeDisp(macrobuttoncost, 'n', 1);
	document.getElementById("macrobutpurchase").innerHTML = `Macro Button (${newdisp}, +500 bytes per click)`;
	ifGreaterThanShow(boughtmacrobuts, "copypastepurchase");
	roundSizeDisp(copypastecost, 'n', 1);
	document.getElementById("copypastepurchase").innerHTML = `Copy Paste (${newdisp}, +10 KB per click)`;
}
// Allows you to toggle a variable on or off
function toggleVariable(varToToggle, elementToColor, color1, color2, textcolor1, textcolor2, text1, text2) {
	if (varToToggle === 0) {
		// When enabled (all 1 objects)
		changeObjectColor(elementToColor, color1, textcolor1);
		document.getElementById(elementToColor).innerHTML = text1;
		return 1;
	} else {
		// When disabled (all 2 objects)
		changeObjectColor(elementToColor, color2, textcolor2);
		document.getElementById(elementToColor).innerHTML = text2;
		return 0;
	}
}
// Toggles showing the bytes per click display under the bytes per second display
let showbpc = 0;
function toggleBytesPerClick() {
	const showbpcbutton = document.getElementById("showbpcbut");
	if (showbpc === 0) {
		showbpc = 1;
		bpcount.style.display = "block";
		if (ismobile === 0) {document.getElementById("ontopspc").style.display = "block";}
		bpscount.style.marginBottom = "5px";
		showbpcbutton.innerHTML = "Disable Bytes Per Click Counter";
		showbpcbutton.style.backgroundColor = "greenyellow";
	} else {
		showbpc = 0;
		bpcount.style.display = "none";
		if (ismobile === 0) {document.getElementById("ontopspc").style.display = "none";}
		bpscount.style.marginBottom = "10px";
		showbpcbutton.innerHTML = "Enable Bytes Per Click Counter";
		showbpcbutton.style.backgroundColor = "red";
	}
}
// Opens a page from the navigation
function openPage(pageName) {
	if (isloading === 0) {
		var i, tabcontent;
		tabcontent = document.getElementsByClassName("tabcontent");
		for (i = 0; i < tabcontent.length; i++) {tabcontent[i].style.display = "none";}
		document.getElementById(pageName).style.display = "block";
	}
}
function modeToggle(modeToToggle) {
	if (modeToToggle === 'roundmaindisp') {doRoundDisplay = toggleVariable(doRoundDisplay, 'doroundisplay', 'greenyellow', 'red', 'black', 'black', 'Disable Score Rounding', 'Enable score rounding');}
}
let hoursplayed = 0;
let hoursplayedremainder = 0;
let minutesplayed = 0;
let minutesplayedremainder = 0;
// Turns a seconds count into an hour variable, a minute variable, and a seconds variable
function roundTimeDisplay(timeVariable) {
	// Calculating hours
	if (timeVariable >= 3600) {
		hoursplayed = timeVariable / 3600;
		hoursplayed = Math.floor(hoursplayed);
		hoursplayedremainder = timeVariable % 3600;
	} else {
		hoursplayed = 0;
		hoursplayedremainder = timeVariable;
	}
	// Calculating minutes
	if (hoursplayedremainder >= 60) {
		minutesplayed = hoursplayedremainder / 60;
		minutesplayed = Math.floor(minutesplayed);
		minutesplayedremainder = hoursplayedremainder % 60;
	} else {
		minutesplayed = 0;
		minutesplayedremainder = hoursplayedremainder;
	}
}
// Checks if an element is hidden, and if it is, unhide it, and if it is not, hide it
function toggleHidingElement(elementToToggle) {
	const thelement = document.getElementById(elementToToggle);
	if (window.getComputedStyle(thelement).display === "none") {thelement.style.display = "inline";}
	else {thelement.style.display = "none";}
}
// Updates the statistics page and then opens it
function openStatsPage() {
	roundTimeDisplay(playedseconds);
	document.getElementById("timeplayedcounter").innerHTML = `Time played: ${hoursplayed} hours ${minutesplayed} minutes and ${minutesplayedremainder} seconds`;
	document.getElementById("clickcountstat").innerHTML = `Total clicks: ${clickcount}`;
	const newsizeperclick1 = sps * clicksbonus;
	const truesizeperclick = spc + newsizeperclick1;
	addCommasToNumber(truesizeperclick);
	// If the size per click is 1, don't add an s to the end of the stat
	if (spc === 1) {document.getElementById("sizeperclickstat").innerHTML = `Size per click: ${spc} byte`;}
	else {document.getElementById("sizeperclickstat").innerHTML = `Size per click: ${newdisp}`;}
	// update the displays
	roundSizeDisp(sizefromclicking, 'n', 1);
	const newsizefromclicks = addCommasToNumber(sizefromclicking);
	document.getElementById("sizefromclicking").innerHTML = `Size from clicking: ${newdisp}`;
	document.getElementById("sizefromclicking").title = newsizefromclicks;
	document.getElementById("upgradesboughtcount").innerHTML = `Upgrades bought: ${upgradesbought}`;
	document.getElementById("autoupgradesboughtcount").innerHTML = `Automatic upgrades bought: ${autoupgradesbought}`;
	document.getElementById("clickingupgradesboughtcount").innerHTML = `Clicking upgrades bought: ${clickupgradesbought}`;
	roundSizeDisp(spentonupgrades, 'n', 1);
	const newspentonups = addCommasToNumber(spentonupgrades);
	document.getElementById("spentonupscount").innerHTML = `Spent on upgrades: ${newdisp}`;
	document.getElementById("spentonupscount").title = newspentonups;
	roundSizeDisp(spentonautoupgrades, 'n', 1);
	const newspentonautoups = addCommasToNumber(spentonautoupgrades);
	document.getElementById("spentonautoupscount").innerHTML = `Spent on automatic upgrades: ${newdisp}`;
	document.getElementById("spentonautoupscount").title = newspentonautoups;
	roundSizeDisp(spentonclickupgrades, 'n', 1);
	const newspentonclickups = addCommasToNumber(spentonclickupgrades);
	document.getElementById("spentonclickupscount").innerHTML = `Spent on click upgrades: ${newdisp}`;
	document.getElementById("spentonclickupscount").title = newspentonclickups;
	// Used for creating the progress bars that are seen on the awards page
	progressBar("clickrewardbar", clickcount, clicklevelreq);
	progressBar("factoryawardbar", sps, buildawardlevelreq);
	openPage("statistics");
}
// Changes the favicon, and allows you to set a wait period
async function editFaviconAndWait(newFavicon, waitTime) {
	var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
	link.type = 'image/x-icon';
	link.rel = 'shortcut icon';
	link.href = newFavicon;
	document.getElementsByTagName('head')[0].appendChild(link);
	await sleep(waitTime);
}
// Gives the favicon a blinking effect
async function faviconBlink() {
	const throwaway1 = -10;
	const throwaway2 = 10;
	while (throwaway1 < throwaway2) {
		await sleep(5000);
		await editFaviconAndWait('https://cdn.discordapp.com/attachments/611631252251869333/779834772226310164/favicon1.ico', 100);
		await editFaviconAndWait('https://cdn.discordapp.com/attachments/611631252251869333/779834772137836574/favicon2.ico', 100);
		await editFaviconAndWait('https://cdn.discordapp.com/attachments/611631252251869333/779834774125674526/favicon3.ico', 100);
		await editFaviconAndWait('https://cdn.discordapp.com/attachments/611631252251869333/779834772137836574/favicon2.ico', 100);
		await editFaviconAndWait('https://cdn.discordapp.com/attachments/611631252251869333/779834772226310164/favicon1.ico', 100);
	}
}
// Opens the confirmation for enabling experimental features
function confirmExper() {
	document.getElementById("expphase1").style.display = "none";
	document.getElementById("experimentsconfirm").style.display = "block";
}
// Enables any experimental features that may not be ready quite yet for the full game.
let expenabled = 0;
function enableExpFeats() {
	const exp1 = document.getElementById("expphase1");
	if (expenabled === 0) {
		displaySnackbar(5000, "Experimental features enabled!");
		document.getElementById("savedatabuttons").style.display = "block";
		exp1.style.cursor = "not-allowed";
		exp1.style.opacity = "0.6";
		exp1.onclick = "sleep(1)";
		document.getElementById("experimentsconfirm").style.display = "none";
		exp1.style.display = "inline-block";
		exp1.innerHTML = "Experimental Features Enabled";
		expenabled = 1;
	}
}
// Cancels enabling experimental features
function cancelExper() {
	document.getElementById("expphase1").style.display = "inline-block";
	document.getElementById("experimentsconfirm").style.display = "none";
}
let monospacenabled = 0;
// Toggles the monospace font
function toggleMonospaceFont() {
	monospacenabled = toggleVariable(monospacenabled, "iscoremonospaced", "greenyellow", "red", "black", "black", "Disable Monospaced Font", "Enable Monospaced Font");
	if (monospacenabled === 1) {
		scorel.style.fontFamily = "'Ubuntu Mono', monospace";
		displaySnackbar(3000, "Monospaced font enabled!");
	} else {
		scorel.style.fontFamily = "'Arvo', serif";
		displaySnackbar(3000, "Monospaced font disabled!");
	}
}
// This is the secret
function thisIsTheSecret(secretKey) {
	if (secretKey === 'babybubby') {
		document.write("<h1>AHHHH! YOU FOUND THE SECRET WAZE PAGE!</h1>");
		document.write('<iframe src="https://embed.waze.com/iframe?zoom=13&lat=40.78247&lon=-73.97105&pin=1" width="100%" height="520"></iframe>');
	} else {console.log("haha noob you dont have da secret key so u cant use da secret page");}
}
// Gives the tutorial a typing effect
async function welcomeTypingEffect() {
	document.getElementById("welcometext").innerHTML = "";
	document.getElementById("clickonbuttontext").innerHTML = "";
	document.getElementById("howtospendtext").innerHTML = "";
	document.getElementById("viewupgradestext").innerHTML = "";
	document.getElementById("changesettingstext").innerHTML = "";
	document.getElementById("viewtutorialagaintext").innerHTML = "";
	document.getElementById("havefuntext").innerHTML = "";
	await typingEffect("Welcome to Idle File!", 50, "welcometext");
	await typingEffect("Click on the large \"Type\" button to get bytes.", 10, "clickonbuttontext");
	await typingEffect("You can spend your bytes on different upgrades to help you earn bytes faster.", 10, "howtospendtext");
	await typingEffect("You can view different upgrade types by using the menus.", 10, "viewupgradestext");
	await typingEffect("Change your settings in the settings menu to customize your experience.", 10, 
	"changesettingstext");
	await typingEffect("You can view this tutorial again from the settings menu.", 10, "viewtutorialagaintext");
	await typingEffect("Have fun playing!", 25, "havefuntext");
}
// Used to close the pop-up warning about cookies, as well as prevents it from showing again
function closeCookiesPopup() {
	document.getElementById("cookiespopup").style.visibility = "hidden";
	setCookie("seencookiesaved", 1, 2000);
}
// Checks to see if the cookies pop-up has already been shown before
function loadCookiesPopup() {
	seencookies = loadCvar("seencookiesaved");
	// If the cookies pop-up has already been shown, don't show it
	if (seencookies === 1) {document.getElementById("cookiespopup").style.visibility = "hidden";}
	// If the cookies pop-up has not been shown yet, show it
	else {document.getElementById("cookiespopup").style.visibility = "visible";}
}
let doautoload = 0;
let doautosave = 0;
// Automatically loads save data if enabled from the experiments
// ! There is currently a glitch that makes it so whenever this setting is enabled you can't play the game if your score is 0
function autoLoadSaveData() {
	// Sees if auto load is enabled
	doautoload = loadCvar("autoloadsaved");
	if (doautoload === 1) {
		loadGame();
		enableExpFeats();
		const toglal = document.getElementById("toglal");
		toglal.style.backgroundColor = "greenyellow";
		toglal.innerHTML = "Disable Auto Load";
	}
	// Sees if auto save is enabled
	doautosave = loadCvar("autosavesaved");
	if (doautosave === 1) {
		enableExpFeats();
		const togas = document.getElementById("togas");
		togas.style.backgroundColor = "greenyellow";
		togas.innerHTML = "Disable Auto Save";
	}
}
// Auto saves the game every minute if enabled
// ! I don't think this actually works, probably should fix that
async function autoSaveGame() {
	const throwaway1 = -10;
	const throwaway2 = 10;
	while (throwaway1 < throwaway2) {
		await sleep(60000);
		if (doautosave === 1) {saveGame(1);}
	}
}
// Toggles automatically loading game data
function toggleAutoLoad() {
	const toglal = document.getElementById("toglal");
	if (doautoload === 1) {
		doautoload = 0;
		setCookie("autoloadsaved", doautoload, 2000);
		toglal.style.backgroundColor = "red";
		toglal.innerHTML = "Enable Auto Load";
	} else {
		doautoload = 1;
		setCookie("autoloadsaved", doautoload, 2000);
		toglal.style.backgroundColor = "greenyellow";
		toglal.innerHTML = "Disable Auto Load";
	}
}
// Toggles automatically saving game data
function toggleAutoSave() {
	const togas = document.getElementById("togas");
	if (doautosave === 1) {
		doautosave = 0;
		setCookie("autosavesaved", doautosave, 2000);
		togas.style.backgroundColor = "red";
		togas.innerHTML = "Enable Auto Save";
	} else {
		doautosave = 1;
		setCookie("autosavesaved", doautosave, 2000);
		togas.style.backgroundColor = "greenyellow";
		togas.innerHTML = "Disable Auto Save";
	}
}
// Calculates a percentage
function percentCalc(number1, number2) {
	let tempequation = number1 / number2;
	tempequation = tempequation * 100;
	return Math.round(tempequation);
}
// Makes a progress bar
function progressBar(cardElementId, number1, number2) {
	var elem = document.getElementById(cardElementId);
	var width = percentCalc(number1, number2);
	if (width >= 100) {elem.style.width = "100%";}
	else {elem.style.width = width + "%";}
}
// To prevent lag, creates a fake page loading page (technically it is loading stuff)
// TODO: Work on improving the code for the random color
async function pageFakeLoad() {
	isloading = 0;
	// Gives the glow of the loading spinner a random color
	const randomspinnerselection = randInt(1, 4);
	const firl = document.getElementById("firstloader");
	if (randomspinnerselection === 1) {firl.style.boxShadow = "0 0px 30px 0 red";}
	else if (randomspinnerselection === 2) {firl.style.boxShadow = "0 0px 30px 0 yellow";}
	else if (randomspinnerselection === 3) {firl.style.boxShadow = "0 0px 30px 0 green";}
	else {firl.style.boxShadow = "0 0px 30px 0 cyan";}
	// Opens the loading page and then waits a random amount of time
	openPage('loaderpage');
	isloading = 1;
	const randomloadtime = randInt(800, 1200);
	await sleep(randomloadtime);
	// Works on starting the actual game
	isloading = 0;
	openPage('tutorial');
	welcomeTypingEffect();
}
// Opens the mobile navigation menu
function openMobileNavigation() {document.getElementById("mobilenavdropdown").classList.toggle("show");}

// * Saving and Loading *

// Used to save the game to the browsers cookies
function saveGame(showSnackbar) {
	setCookie("sizec", size, 2000);
	setCookie("spsaved", sps, 2000);
	setCookie("extraspspersecond", extraspsps, 2000);
	setCookie("clickbonusaved", clickbonus, 2000);
	setCookie("sizeperclicksaved", spc, 2000);
	setCookie("clickcountsaved", clickcount, 2000);
	setCookie("playedsecondsaved", playedseconds, 2000);
	setCookie("clicksbonusaved", clicksbonus, 2000);
	setCookie("addedclicksaved", addedclicks, 2000);
	setCookie("spscostsaved", spscost, 2000);
	setCookie("catcostsaved", catcost, 2000);
	setCookie("holdcostsaved", holdcost, 2000);
	setCookie("macrocostsaved", macrocost, 2000);
	setCookie("fingercostsaved", fingercost, 2000);
	setCookie("keycostsaved", keycost, 2000);
	setCookie("collabcostsaved", colabcost, 2000);
	setCookie("macrobutcostsaved", macrobuttoncost, 2000);
	setCookie("upsboughtsaved", upgradesbought, 2000);
	setCookie("autoupsaved", autoupgradesbought, 2000);
	setCookie("clicksboughtsaved", clickupgradesbought, 2000);
	setCookie("spentupsaved", spentonupgrades, 2000);
	setCookie("spentautosaved", spentonautoupgrades, 2000);
	setCookie("spentclicksaved", spentonclickupgrades, 2000);
	setCookie("copypastecostsaved", copypastecost, 2000);
	setCookie("sizefromclickingsaved", sizefromclicking, 2000);
	if (showSnackbar === 1) {displaySnackbar(1000, 'Game data saved!');}
	const tempdate = Date();
	document.getElementById("lastsavedtext").innerHTML = `Last saved at: ${tempdate}`;
}
// Used to load the game from the browsers cookies
function loadGame() {
	// Calculates the prices of everything
	function calculateSizes(numberBought, cost) {
		let newsize = cost;
		for (let count = 0; count < numberBought;) {
			newsize = newsize * 1.15;
			count++;
		}
		return newsize;
	}
	// Loads all of the variables
	sizefromclicking = loadCvar("sizefromclickingsaved");
	size = loadCvar("sizec");
	sps = loadCvar("spsaved");
	extraspsps = loadCvar("extraspspersecond");
	clickbonus = loadCvar("clickbonusaved");
	spc = loadCvar("sizeperclicksaved");
	clickcount = loadCvar("clickcountsaved");
	playedseconds = loadCvar("playedsecondsaved");
	clicksbonus = loadCvar("clicksbonusaved");
	addedclicks = loadCvar("addedclicksaved");
	spscost = loadCvar("spscostsaved");
	catcost = loadCvar("catcostsaved");
	holdcost = loadCvar("holdcostsaved");
	macrocost = loadCvar("macrocostsaved");
	fingercost = loadCvar("fingercostsaved");
	keycost = loadCvar("keycostsaved");
	seencookies = loadCvar("seencookiesaved");
	colabcost = loadCvar("collabcostsaved");
	macrobuttoncost = loadCvar("macrobutcostsaved");
	upgradesbought = loadCvar("upsboughtsaved");
	autoupgradesbought = loadCvar("autoupsaved");
	clickupgradesbought = loadCvar("clicksboughtsaved");
	spentonupgrades = loadCvar("spentupsaved");
	spentonautoupgrades = loadCvar("spentautosaved");
	spentonclickupgrades = loadCvar("spentclicksaved");
	copypastecost = loadCvar("copypastecostsaved");
	// Updates all of the displays
	refreshAll();
	updateAllDisplays();
	// Shows a snackbar confirming that the data has successfully been loaded.
	displaySnackbar(3000, 'Game data loaded!');
}

// * Extra Stuff *

// Hide the mobile navigation menu when an object is selected or when it is clicked off of
window.onclick = function(event) {
	if (!event.target.matches('.dropbtn')) {
		var dropdowns = document.getElementsByClassName("dropdown-content");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show')) {openDropdown.classList.remove('show');}
		}
	}
}
// Shows the bar at the top of the screen when scrolled
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {document.getElementById("topbar").style.top = "0";}
	else {document.getElementById("topbar").style.top = "-60px";}
}
// Commands to be run when the document is run
secondlyPoints();
updateButtons();
giveSpsBonus();
updatePageTitleOnStart();
faviconBlink();
loadCookiesPopup();
pageFakeLoad();
loadDarkTheme();
autoLoadSaveData();
autoSaveGame();