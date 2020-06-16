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
var maxClicks = 25;

//=================randomizer========================
function chooseRandom(min,max){
  return Math.floor(Math.random() * (max-min) + min);
}

//================Product Constructor=================

function Product (name, imgSource) {
  this.clicked = 0;
  this.shown = 0;
  this.percentage = 0;
  this.imageCaption = name;
  this.imageSrc = imgSource;
  // push new products to array
  productAssortment.push(this);
}

//=====================Products======================

new Product('R2D2 carry-on bag','images/bag.jpg');
new Product('Banana slicer','images/banana.jpg');
new Product('Bathroom iPad stand','images/bathroom.jpg');
new Product('Toeless boots','images/boots.jpg');
new Product('Breakfast machine','images/breakfast.jpg');
new Product('Meatball bubblegum','images/bubblegum.jpg');
new Product('Comfy chair','images/chair.jpg');
new Product('Cthulhu','images/cthulhu.jpg');
new Product('Dog ducklips','images/dog-duck.jpg');
new Product('Dragon meat','images/dragon.jpg');
new Product('Pen flatware','images/pen.jpg');
new Product('Pet sweep shoes','images/pet-sweep.jpg');
new Product('Pizza scissors','images/scissors.jpg');
new Product('Shark cozy','images/shark.jpg');
new Product('Baby sweeper','images/sweep.png');
new Product('Taun taun sleeping bag','images/tauntaun.jpg');
new Product('Unicorn meat','images/unicorn.jpg');
new Product('USB tentacle','images/usb.gif');
new Product('Escher watering can','images/water-can.jpg');
new Product('Enclosed Wine Glass','images/wine-glass.jpg');

//================Event Listener=================

//target
var productSection = document.getElementById('products');
//add listener
productSection.addEventListener('click', processClickOnAProduct);

// function to replace images with thank you banner after max clicks with help from https://www.geeksforgeeks.org/replace-a-dom-element-with-another-dom-element-in-place/

function replaceImages() {
  var productSection = document.getElementById('products');
  var newBanner = document.createElement('h4');
  newBanner.textContent = 'Good choices - well done!';
  productSection.parentNode.replaceChild(newBanner, productSection);
}

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
    // console.log('check', totalClicks, maxClicks);
    if (totalClicks === maxClicks) {
      //https://stackoverflow.com/questions/17012157/remove-clicked-li-onclick showed me how to remove placeholder text
      var placeholder = document.getElementById('tally');
      var text = document.getElementById('placeholder');
      placeholder.removeChild(text);

      // ===replace images with thank you from function replaceImages (created above)!
      replaceImages();
      // display tally results
      displayResults();
    }
  }
}

//============rendering images===================

function renderProductImages() {
  var firstRandom= chooseRandom(0, productAssortment.length);
  var secondRandom = chooseRandom(0, productAssortment.length);
  var thirdRandom = chooseRandom(0, productAssortment.length);
  //check if left is same as middle or right, or if middle and right are same... if so, choose a new one
  while(firstRandom=== secondRandom || firstRandom=== thirdRandom || secondRandom === thirdRandom){
    firstRandom= chooseRandom(0, productAssortment.length);
    secondRandom = chooseRandom(0, productAssortment.length);
  }

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

function displayResults() {
  for(var i = 0; i < productAssortment.length; i++){
    //target ul named 'tally'
    var resultsList = document.getElementById('tally');
    //create new li element
    var listItem = document.createElement('li');
    //give it content
    listItem.textContent = productAssortment[i].imageCaption + '- shown: ' + productAssortment[i].shown + ', clicked: ' + productAssortment[i].clicked;
    //append to parent
    resultsList.appendChild(listItem);
  }
}

// attempt to calculate percentage

// Product.prototype.calculatePercentage = function () {
//   var calculation = parseFloat(this.clicked/this.shown);
//   var percentCalc = Math.round(calculation * 100);
//   this.percentage = percentCalc;
// };

// for (var k = 0; k < productAssortment.length; k++){
//   productAssortment[k].calculatePercentage();
// }

// function calculatePercentage(clicked, shown) {
//   var calculation = parseFloat(clicked/shown);
//   return Math.round(calculation * 100);
// }

// for (var k = 0; k < productAssortment.length; k++){
//   var percentCalc = calculatePercentage(productAssortment[k].clicked, productAssortment[k].shown);
//   productAssortment[k].percentage = percentCalc;
// }




