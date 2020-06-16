'use strict';

//  1. build a product constructor
//  2. function to make a random algorithm choose 3 products to display
//  3. eventListener to tally clicks and change display
//  4. track selections made 
//  5. after max clicks (25) render a report (ul) to the user
//     5a. report needs clicks, shown, percentage
//  6. remove event listener after max clicks

//================global variables===================

var productAssortment = [];
var totalClicks = 0;
var maxClicks = 4; //TODO: change to 25

//=================randomizer========================
function chooseRandom(min,max){
  return Math.floor(Math.random() * (max-min) + min);
}

//================Product Constructor=================

function Product (name, imgSource) {
  this.clicked = 0;
  this.shown = 0;
  this.imageCaption = name;
  this.imageSrc = imgSource;
  // push new products to array
  productAssortment.push(this);
}

//=====================Products======================
//TODO: uncomment all other products
new Product('R2D2 carryon bag','images/bag.jpg');
new Product('Banana slicer','images/banana.jpg');
new Product('Bathroom iPad stand','images/bathroom.jpg');
new Product('Toeless boots','images/boots.jpg');
new Product('Breakfast machine','images/breakfast.jpg');
// new Product('Meatball bubblegum','images/bubblegum.jpg');
// new Product('Comfy chair','images/chair.jpg');
// new Product('Cthulhu','images/cthulhu.jpg');
// new Product('Dog ducklips','images/dog-duck.jpg');
// new Product('Dragon meat','images/dragon.jpg');
// new Product('Pen flatware','images/pen.jpg');
// new Product('Pet sweep shoes','images/pet-sweep.jpg');
// new Product('Pizza scissors','images/scissors.jpg');
// new Product('Shark cozy','images/shark.jpg');
// new Product('Baby sweeper','images/sweep.jpg');
// new Product('Taun taun sleeping bag','images/tauntaun.jpg');
// new Product('Unicorn meat','images/unicorn.jpg');
// new Product('USB tentacle','images/usb.jpg');
// new Product('Escher watering can','images/water-can.jpg');
// new Product('Enclosed Wine Glass','images/wine-glass.jpg');

//================Event Listener=================

//target
var productSection = document.getElementById('products');
//add listener
productSection.addEventListener('click', processClickOnAProduct);

function processClickOnAProduct(userClick){
  if(userClick.target.tagName === 'IMG'){
    totalClicks++;

    if(totalClicks === maxClicks){
      productSection.removeEventListener('click', processClickOnAProduct);
    }

    var targetSrc = userClick.target.getAttribute('src');
    for(var i = 0; i < productAssortment.length; i++){
      if (productAssortment[i].imageSrc === targetSrc) {
        productAssortment[i].clicked++;
      }
    }

    renderProductImages();

  }
}

//============rendering images===================

function renderProductImages() {
  var firstRandom= chooseRandom(0, productAssortment.length);
  var secondRandom = chooseRandom(0, productAssortment.length);
  var thirdRandom = chooseRandom(0, productAssortment.length);
  //check if left is same as middle or right, if so, choose a new one
  while(firstRandom=== secondRandom || firstRandom=== thirdRandom || secondRandom === thirdRandom){
    firstRandom= chooseRandom(0, productAssortment.length);
    secondRandom = chooseRandom(0, productAssortment.length);
  }
  //check if middle is same as right/or try all in one while loop as above?
  //   while(middleOption === rightOption) {
  //     middleOption = chooseRandom(0, productAssortment.length);
  //   }


  var firstProduct = document.getElementById('first-image');
  var firstCaption = document.getElementById('first-text');
  var secondProduct = document.getElementById('second-image');
  var secondCaption = document.getElementById('second-text');
  var thirdProduct = document.getElementById('third-image');
  var thirdCaption = document.getElementById('third-text');


  var firstOption = productAssortment[firstRandom];
  firstProduct.src = firstOption.imageSrc;
  firstCaption.textContent = firstOption.imageCaption;
  firstOption.shown++;

  var secondOption = productAssortment[secondRandom];
  secondProduct.src = secondOption.imageSrc;
  secondCaption.textContent = secondOption.imageCaption;
  secondOption.shown++;

  var thirdOption = productAssortment[thirdRandom];
  thirdProduct.src = thirdOption.imageSrc;
  thirdCaption.textContent = thirdOption.imageCaption;
  thirdOption.shown++;

}
