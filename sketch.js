var dog, dogImg, happyDog, database, foodS, feed, FoodStock, addfood, milk, milkImg;
var fedTime, lastFed, foodObj;

function preload() {
dogImg = loadImage("images/dogImg.png");
happyDog = loadImage("images/dogImg1.png");
milkImg = loadImage("images/Milk.png");
}

function setup() {
createCanvas(600, 500);
database = firebase.database();  

dog = createSprite(500, 400, 10, 10);
dog.addImage(dogImg);

foodObj = new Food();

feed = createButton("FEED RAGE MILK");
feed.position(580, 85);
feed.mousePressed(feedDog); 

addFood = createButton("ADD FOOD");
addFood.position(720, 85);
addFood.mousePressed(addFoods);

fedTime = database.ref('FeedTime');
fedTime.on("value", function(data){
lastFed = data.val();
});
}

function draw() { 
background(46, 139, 87);

fill(255, 255, 254);
textSize(15);
if(lastFed >= 12) {
text("Last Feed : "+ lastFed % 12 + "PM", 100, 50);
} else if(lastFed == 0) {
text("last Feed : 12 AM", 100, 50);
} else {
text("last Feed : "+ lastFed + "AM", 100, 50);
}

foodObj.display();

drawSprites();
}

function readStock(data) {
foodS = data.val();
}

function showError() {

}   

function feedDog() {
dog.addImage(happyDog);

foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
Food: foodObj.getFoodStock(),
FeedTime: hour()
})
}

function addFoods() {
foodS++;
database.ref('/').update({
Food: foodS
})
}