const cvs 						= document.getElementById("canvas");
const ctx 						= cvs.getContext("2d");

ctx.font 						= "40px Minecraft-Regular";
ctx.fillStyle 					= "white";

const freeCeil 					= new Image();
const cowCeil 					= new Image();
const chickenCeil 				= new Image();
const youngWheatCeil 			= new Image();

const cowFedCeil 				= new Image();
const chickenFedCeil 			= new Image();

const oldWheatCeil 				= new Image();
const chickenReadyCeil 			= new Image();
const cowReadyCeil 				= new Image();

const buyChickenButton 			= new Image();
const buyCowButton 				= new Image();
const buySeedButton 			= new Image();

const buyChickenButtonActive 	= new Image();
const buyCowButtonActive 		= new Image();
const buySeedButtonActive 		= new Image();

const price10 					= new Image();
const price30 					= new Image();
const price60 					= new Image();

const harvestButton 			= new Image();
const harvestButtonActive 		= new Image();

const feedButton 				= new Image();
const feedButtonActive 			= new Image();

const deleteButton 				= new Image();
const deleteButtonActive 		= new Image();

const emeraldIcon 				= new Image();
const wheatIcon 				= new Image();
const eggIcon 					= new Image();
const milkIcon 					= new Image();

const tradeButton 				= new Image();

const helpButton 				= new Image();
const helpWindow 				= new Image();


freeCeil.src 					= "assets/grass.png";
cowCeil.src 					= "assets/cow.png";
chickenCeil.src 				= "assets/chicken.png";
youngWheatCeil.src 				= "assets/young_wheat.png";

cowFedCeil.src 					= "assets/cow_fed.png";
chickenFedCeil.src 				= "assets/chicken_fed.png";

oldWheatCeil.src 				= "assets/old_wheat.png";
cowReadyCeil.src 				= "assets/cow_ready.png";
chickenReadyCeil.src 			= "assets/chicken_ready.png";

buyChickenButton.src 			= "assets/buy_chicken.png";
buyCowButton.src 				= "assets/buy_cow.png";
buySeedButton.src 				= "assets/buy_seed.png";

buyChickenButtonActive.src 		= "assets/buy_chicken_active.png";
buyCowButtonActive.src 			= "assets/buy_cow_active.png";
buySeedButtonActive.src 		= "assets/buy_seed_active.png";

price10.src 					= "assets/10.png";
price30.src 					= "assets/30.png";
price60.src 					= "assets/60.png";

deleteButton.src 				= "assets/delete_button.png";
deleteButtonActive.src 			= "assets/delete_button_active.png";

harvestButton.src 				= "assets/harvest.png";
harvestButtonActive.src 		= "assets/harvest_active.png";

feedButton.src 					= "assets/feed.png";
feedButtonActive.src 			= "assets/feed_active.png";

emeraldIcon.src 				= "assets/emerald.png";
wheatIcon.src 					= "assets/wheat.png";
eggIcon.src 					= "assets/egg.png";
milkIcon.src 					= "assets/milk.png";

tradeButton.src 				= "assets/sell_button.png";

helpButton.src 					= "assets/help_button.png";
helpWindow.src					= "assets/help.png";



function Action(type) {
	this.type = type;
}



function Cell(type) {
	this.type = type;
	this.date = new Date();
	this.food = 0;
	this.ready = false;
}



function Field(size) {

	var tmp = new Array(size);
	for (var i = 0; i < size; i++) {
		tmp[i] = new Array(size);
	}
	for (var i = 0; i < size; i++) {
		for (var j = 0; j < size; j++) {
			tmp[i][j] = new Cell('free');
		}
	}

	this.fld = tmp;
	this.size = size;

	this.money = 100;
	this.milk = 0;
	this.eggs = 0;
	this.wheat = 0;

	this.help = false;


	this.sellEgg = function() {
		if (this.eggs > 0) {
			this.eggs--;
			this.money += 5;
		}
	}


	this.sellMilk = function() {
		if (this.milk > 0) {
			this.milk--;
			this.money += 20;
		}
	}


	this.clickOnField = function(x, y, action) {

		if (action == 'feed') {
			if (this.fld[x][y].type == 'cow' && this.fld[x][y].food == 0 && this.wheat > 0) {
				this.fld[x][y].food = 1;
				this.fld[x][y].date = new Date();
				this.fld[x][y].ready = false;
				this.wheat--;
			}
			if (this.fld[x][y].type == 'chicken' && this.fld[x][y].food == 0 && this.wheat > 0) {
				this.fld[x][y].food = 3;
				this.fld[x][y].date = new Date();
				this.fld[x][y].ready = false;
				this.wheat--;
			}

		}
		else if (action == 'harvest') {
			if (this.fld[x][y].type == 'seed' && this.fld[x][y].ready == true) {
				this.wheat++;
				this.fld[x][y].date = new Date();
				this.fld[x][y].ready = false;
			}
			if (this.fld[x][y].type == 'cow' && this.fld[x][y].ready == true) {
				this.fld[x][y].food--;
				this.milk++;
				this.fld[x][y].date = new Date();
				this.fld[x][y].ready = false;
			}
			if (this.fld[x][y].type == 'chicken' && this.fld[x][y].ready == true) {
				this.fld[x][y].food--;
				this.eggs++;
				this.fld[x][y].date = new Date();
				this.fld[x][y].ready = false;
			}
		}
		else {
			if (this.fld[x][y].type == 'free') {
				if (action == 'seed' && this.money >= 10) {
					this.money -= 10;
					this.fld[x][y].type = action;
					this.fld[x][y].date = new Date();
					this.fld[x][y].ready = false;
				}
				if (action == 'chicken' && this.money >= 30) {
					this.money -= 30;
					this.fld[x][y].type = action;
					this.fld[x][y].date = new Date();
					this.fld[x][y].ready = false;
				}
				if (action == 'cow' && this.money >= 60) {
					this.money -= 60;
					this.fld[x][y].type = action;
					this.fld[x][y].date = new Date();
					this.fld[x][y].ready = false;
				}
			}
			if (action == 'free') {
				if (this.fld[x][y].type == 'chicken') {
					this.money += 15;
				}
				if (this.fld[x][y].type == 'cow') {
					this.money += 30;
				}
				this.fld[x][y].type = action;
				this.fld[x][y].date = new Date();
				this.fld[x][y].ready = false;
				this.fld[x][y].food = 0;
			}
		}
	}


	this.readinessCheck = function() {

		const curDate = new Date();

		for (var i = 0; i < this.size; i++) {
			for (var j = 0; j < this.size; j++) {

				var age = curDate.getSeconds() - this.fld[i][j].date.getSeconds();
				if (age < 0) {
					age += 60;
				}

				if (this.fld[i][j].type == 'seed' && age == 10) {
					this.fld[i][j].ready = true;
				}
				if (this.fld[i][j].type == 'chicken' && this.fld[i][j].food > 0 && age == 10) {
					this.fld[i][j].ready = true;
				}
				if (this.fld[i][j].type == 'cow' && this.fld[i][j].food > 0 && age == 20) {
					this.fld[i][j].ready = true;
				}
			}
		}
	}
}



function draw() {

	ctx.clearRect(0, 0, 1100, 640);

	field.readinessCheck();

	for (var i = 0; i < field.size; i++) {
		for (var j = 0; j < field.size; j++) {

			switch(field.fld[i][j].type) {
				case 'free':
					ctx.drawImage(freeCeil, 80*i, 80*j);
					break;

				case 'chicken':
					if (field.fld[i][j].ready) {
						ctx.drawImage(chickenReadyCeil, 80*i, 80*j);
					}
					else if (field.fld[i][j].food > 0) {
						ctx.drawImage(chickenFedCeil, 80*i, 80*j);
					}
					else {
						ctx.drawImage(chickenCeil, 80*i, 80*j);
					}
					break;

				case 'cow':
					if (field.fld[i][j].ready) {
						ctx.drawImage(cowReadyCeil, 80*i, 80*j);
					}
					else if (field.fld[i][j].food > 0) {
						ctx.drawImage(cowFedCeil, 80*i, 80*j);
					}
					else {
						ctx.drawImage(cowCeil, 80*i, 80*j);
					}
					break;

				case 'seed':
					if (field.fld[i][j].ready) {
						ctx.drawImage(oldWheatCeil, 80*i, 80*j);
					}
					else {
						ctx.drawImage(youngWheatCeil, 80*i, 80*j);
					}
					break;
			}

		}
	}

	switch(action.type) {
		case 'cow': 
			ctx.drawImage(buySeedButton, 660, 30);
			ctx.drawImage(buyChickenButton, 780, 30);
			ctx.drawImage(buyCowButtonActive, 900, 30);
			ctx.drawImage(harvestButton, 660, 200);
			ctx.drawImage(feedButton, 780, 200);
			ctx.drawImage(deleteButton, 900, 200);
			break;

		case 'chicken':
			ctx.drawImage(buySeedButton, 660, 30);
			ctx.drawImage(buyChickenButtonActive, 780, 30);
			ctx.drawImage(buyCowButton, 900, 30);
			ctx.drawImage(harvestButton, 660, 200);
			ctx.drawImage(feedButton, 780, 200);
			ctx.drawImage(deleteButton, 900, 200);
			break;

		case 'seed':
			ctx.drawImage(buySeedButtonActive, 660, 30);
			ctx.drawImage(buyChickenButton, 780, 30);
			ctx.drawImage(buyCowButton, 900, 30);
			ctx.drawImage(harvestButton, 660, 200);
			ctx.drawImage(feedButton, 780, 200);
			ctx.drawImage(deleteButton, 900, 200);
			break;

		case 'free':
			ctx.drawImage(buySeedButton, 660, 30);
			ctx.drawImage(buyChickenButton, 780, 30);
			ctx.drawImage(buyCowButton, 900, 30);
			ctx.drawImage(harvestButton, 660, 200);
			ctx.drawImage(feedButton, 780, 200);
			ctx.drawImage(deleteButtonActive, 900, 200);
			break;

		case 'harvest':
			ctx.drawImage(buySeedButton, 660, 30);
			ctx.drawImage(buyChickenButton, 780, 30);
			ctx.drawImage(buyCowButton, 900, 30);
			ctx.drawImage(harvestButtonActive, 660, 200);
			ctx.drawImage(feedButton, 780, 200);
			ctx.drawImage(deleteButton, 900, 200);
			break;

		case 'feed':
			ctx.drawImage(buySeedButton, 660, 30);
			ctx.drawImage(buyChickenButton, 780, 30);
			ctx.drawImage(buyCowButton, 900, 30);
			ctx.drawImage(harvestButton, 660, 200);
			ctx.drawImage(feedButtonActive, 780, 200);
			ctx.drawImage(deleteButton, 900, 200);
			break;

		case 'nothing':
			ctx.drawImage(buySeedButton, 660, 30);
			ctx.drawImage(buyChickenButton, 780, 30);
			ctx.drawImage(buyCowButton, 900, 30);
			ctx.drawImage(harvestButton, 660, 200);
			ctx.drawImage(feedButton, 780, 200);
			ctx.drawImage(deleteButton, 900, 200);
			break;
	}

	ctx.drawImage(price10, 670, 130);
	ctx.drawImage(price30, 790, 130);
	ctx.drawImage(price60, 910, 130);

	ctx.drawImage(emeraldIcon, 660, 350, 50, 50);
	ctx.fillText(": " + field.money, 720, 390);

	ctx.drawImage(wheatIcon, 660, 420, 50, 50);
	ctx.fillText(": " + field.wheat, 720, 460);

	ctx.drawImage(eggIcon, 660, 490, 50, 50);
	ctx.fillText(": " + field.eggs, 720, 530);

	ctx.drawImage(milkIcon, 660, 560, 50, 50);
	ctx.fillText(": " + field.milk, 720, 600);

	ctx.drawImage(tradeButton, 850, 495);
	ctx.drawImage(tradeButton, 850, 565);

	ctx.drawImage(helpButton, 1040, 580, 50, 50);

	if (field.help) {
		ctx.drawImage(helpWindow, 0, 0);
	}

	requestAnimationFrame(draw);
}





var field 	= new Field(8);
var action 	= new Action('nothing');

cvs.addEventListener("mousedown", function(e) {
	if ((e.clientX >= 1040) && (e.clientX <= 1090) && (e.clientY >= 580) && (e.clientY <= 630)) {
		field.help = true;
	}
});

cvs.addEventListener("mouseup", function(e) {
	field.help = false;
});

cvs.addEventListener("click", function(e) {

	if ((e.clientX >= 0) && (e.clientX <= 640) && (e.clientY >= 0) && (e.clientY <= 640)) {
		if (action.type != 'nothing') {
			field.clickOnField(Math.floor(e.clientX / 80), Math.floor(e.clientY / 80), action.type);
		}
	}
	else if ((e.clientX >= 660) && (e.clientX <= 760) && (e.clientY >= 30) && (e.clientY <= 130)) {
		action.type = 'seed';
	}
	else if ((e.clientX >= 780) && (e.clientX <= 880) && (e.clientY >= 30) && (e.clientY <= 130)) {
		action.type = 'chicken';
	}
	else if ((e.clientX >= 900) && (e.clientX <= 1000) && (e.clientY >= 30) && (e.clientY <= 130)) {
		action.type = 'cow';
	}
	else if ((e.clientX >= 660) && (e.clientX <= 760) && (e.clientY >= 200) && (e.clientY <= 300)) {
		action.type = 'harvest';
	}
	else if ((e.clientX >= 780) && (e.clientX <= 880) && (e.clientY >= 200) && (e.clientY <= 300)) {
		action.type = 'feed';
	}
	else if ((e.clientX >= 900) && (e.clientX <= 1000) && (e.clientY >= 200) && (e.clientY <= 300)) {
		action.type = 'free';
	}
	else if ((e.clientX >= 850) && (e.clientX <= 945) && (e.clientY >= 495) && (e.clientY <= 545)) {
		field.sellEgg();
	}
	else if ((e.clientX >= 850) && (e.clientX <= 945) && (e.clientY >= 565) && (e.clientY <= 605)) {
		field.sellMilk();
	}
	else {
		action.type = 'nothing';
	}
});

draw();