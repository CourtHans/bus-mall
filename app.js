'use strict';

// 1. Convert array of Products (w/ their associated info/data), convert to string, store on LocalStorage
// 2. Retrieve stored info from local storage and convert back to Object IF there is local storage in existence (i.e not on first page view or with a reset button)
// 3. try a reset button for user to reset/clear local storage, if desired

//================global variables===================

var totalClicks = 0;
var maxClicks = 25;

//=================randomizer========================
function chooseRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

//<===========<>==============CHART FUNCTION==============<>=================>
function renderAChart() {

  //create and fill array of label names
  var chartLabels = [];
  var productClicked = [];
  var productShown = [];
  var productPercentage = [];

  for (var i = 0; i < Product.assortment.length; i++) {
    chartLabels.push(Product.assortment[i].imageCaption);
    productClicked.push(Product.assortment[i].clicked);
    productShown.push(Product.assortment[i].shown);
    productPercentage.push(Product.assortment[i].percentage);
  }

  //**********CHART 1 (clicks & shown)**********
  var ctx = document.getElementById('myChart').getContext('2d');
  Chart.defaults.global.defaultFontColor = 'rgb(9, 1, 18)';
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: chartLabels,
      datasets: [{
        label: 'Clicked on',
        data: productClicked,
        backgroundColor: [
          'rgba(192, 67, 14, 0.1)'
        ],
        borderColor: [
          'rgba(192, 67, 14, 1)'
        ],
        borderWidth: 2
      },
      {
        type: 'bar',
        hoverBackgroundColor: 'rgba(192, 67, 14, 0.5)',
        hoverBorderWidth: '1',
        label: 'Times shown',
        data: productShown,
        backgroundColor: [
          'rgba(16, 25, 123, 0.4)',
          'rgba(16, 25, 123, 0.4)',
          'rgba(16, 25, 123, 0.4)',
          'rgba(16, 25, 123, 0.4)',
          'rgba(16, 25, 123, 0.4)',
          'rgba(16, 25, 123, 0.4)',
          'rgba(16, 25, 123, 0.4)',
          'rgba(16, 25, 123, 0.4)',
          'rgba(16, 25, 123, 0.4)',
          'rgba(16, 25, 123, 0.4)',
          'rgba(16, 25, 123, 0.4)',
          'rgba(16, 25, 123, 0.4)',
          'rgba(16, 25, 123, 0.4)',
          'rgba(16, 25, 123, 0.4)',
          'rgba(16, 25, 123, 0.4)',
          'rgba(16, 25, 123, 0.4)',
          'rgba(16, 25, 123, 0.4)',
          'rgba(16, 25, 123, 0.4)',
          'rgba(16, 25, 123, 0.4)',
          'rgba(16, 25, 123, 0.4)'
        ],
        borderColor: [
          'rgba(16, 25, 123, 0.6)'
        ],
        borderWidth: 3
      }]
    }
  });

  //**********CHART 2 (percentage)**********
  var secondChart = document.getElementById('myPercentageChart').getContext('2d');
  var myPercentageChart = new Chart(secondChart, {
    type: 'horizontalBar',
    data: {
      labels: chartLabels,
      datasets: [{
        hoverBackgroundColor: 'rgb(9, 1, 18)',//testing
        hoverBorderWidth: '2',
        hoverBorderColor: 'rgba(109, 67, 155, 0.8)',
        label: 'Percentage clicked/shown',
        data: productPercentage,
        backgroundColor: [
          'rgba(109, 67, 155, 0.2)',
          'rgba(38, 9, 71, 0.3)',
          'rgba(26, 6, 49, 0.5)',
          'rgba(15, 2, 29, 0.7)',
          'rgba(109, 67, 155, 0.2)',
          'rgba(38, 9, 71, 0.3)',
          'rgba(26, 6, 49, 0.5)',
          'rgba(15, 2, 29, 0.7)',
          'rgba(109, 67, 155, 0.2)',
          'rgba(38, 9, 71, 0.3)',
          'rgba(26, 6, 49, 0.5)',
          'rgba(15, 2, 29, 0.7)',
          'rgba(109, 67, 155, 0.2)',
          'rgba(38, 9, 71, 0.3)',
          'rgba(26, 6, 49, 0.5)',
          'rgba(15, 2, 29, 0.7)',
          'rgba(109, 67, 155, 0.2)',
          'rgba(38, 9, 71, 0.3)',
          'rgba(26, 6, 49, 0.5)',
          'rgba(15, 2, 29, 0.7)'
        ],
        borderColor: [
          'rgba(38, 9, 71, 0.2)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      legend: {
        labels: {
          fontColor: 'rgba(109, 67, 155, 0.8)',
        }
      }
      // scales: {
      //   yAxes: [{
      //     ticks: {
      //       beginAtZero: true
      //     }
      //   }]
      // }
    }
  });

}
//<===========<>====END CHART FUNCTION====<>===========>

//================Product Constructor=================

function Product(name, imgSource) {
  this.clicked = 0;
  this.shown = 0;
  this.percentage = 0;
  this.imageCaption = name;
  this.imageSrc = imgSource;
  // push new products to array
  Product.assortment.push(this);
}

Product.assortment = [];

//=====================Products (20)======================


//retrieve
var stringifiedProductsFromStorage = localStorage.getItem('storedProductInfo');
// parse
var productInfoFromStorage = JSON.parse(stringifiedProductsFromStorage);
//conditional statement so storage only retrieved IF it contains info
if (productInfoFromStorage !== null) {
  // Product.assortment = productInfoFromStorage; <--Nich's example, but because i had prototype, had to do different way, hence this if/else statement
  reconstituteProduct();
} else {
  new Product('R2D2 carry-on bag', 'images/bag.jpg');
  new Product('Banana slicer', 'images/banana.jpg');
  new Product('Bathroom iPad stand', 'images/bathroom.jpg');
  new Product('Toeless boots', 'images/boots.jpg');
  new Product('Breakfast machine', 'images/breakfast.jpg');
  new Product('Meatball bubblegum', 'images/bubblegum.jpg');
  new Product('Comfy chair', 'images/chair.jpg');
  new Product('Cthulhu', 'images/cthulhu.jpg');
  new Product('Dog ducklips', 'images/dog-duck.jpg');
  new Product('Dragon meat', 'images/dragon.jpg');
  new Product('Pen flatware', 'images/pen.jpg');
  new Product('Pet sweep shoes', 'images/pet-sweep.jpg');
  new Product('Pizza scissors', 'images/scissors.jpg');
  new Product('Shark cozy', 'images/shark.jpg');
  new Product('Baby sweeper', 'images/sweep.png');
  new Product('Taun taun sleeping bag', 'images/tauntaun.jpg');
  new Product('Unicorn meat', 'images/unicorn.jpg');
  new Product('USB tentacle', 'images/usb.gif');
  new Product('Escher watering can', 'images/water-can.jpg');
  new Product('Enclosed Wine Glass', 'images/wine-glass.jpg');
}

//====================Event Listener/Handler=======================

//target
var productSection = document.getElementById('products');
//add listener
productSection.addEventListener('click', processClickOnAProduct);

// function to replace images with thank you banner after max clicks with help from https://www.geeksforgeeks.org/replace-a-dom-element-with-another-dom-element-in-place/

function replaceImages() {
  document.getElementById('instructions').style.display = 'none'; //inspired by Claudio's code in code review on 6/16
  var productSection = document.getElementById('products');
  var newBanner = document.createElement('h4');
  newBanner.textContent = 'Good choices! See the results below.';
  productSection.parentNode.replaceChild(newBanner, productSection);
}

function processClickOnAProduct(userClick) {
  if (userClick.target.tagName === 'IMG') {
    totalClicks++;

    var targetSrc = userClick.target.getAttribute('src');
    for (var i = 0; i < Product.assortment.length; i++) {
      if (Product.assortment[i].imageSrc === targetSrc) {
        Product.assortment[i].clicked++;
      }
    }

    renderProductImages();
    if (totalClicks === maxClicks) {
      // ===replace images with thank you from function replaceImages (created above)and then render chart
      productSection.removeEventListener('click', processClickOnAProduct);
      replaceImages();
      renderAChart();
    }
  }
  updatePercentages();

  //stringify
  var arrayOfProductObjects = JSON.stringify(Product.assortment);
  //save/set it
  localStorage.setItem('storedProductInfo', arrayOfProductObjects);
}

//================RENDERING IMAGES===================

var imageDisplaySet = []; //array to hold selection of images

function renderProductImages() {
  var firstRandom = chooseRandom(0, Product.assortment.length);
  var secondRandom = chooseRandom(0, Product.assortment.length);
  var thirdRandom = chooseRandom(0, Product.assortment.length);

  // check 1st image against anything in imageDisplaySet array
  while (firstRandom === imageDisplaySet[0] ||
    firstRandom === imageDisplaySet[1] ||
    firstRandom === imageDisplaySet[2]) {
    firstRandom = chooseRandom(0, Product.assortment.length);
  }
  // check 2nd image against 1st as well as anything in imageDisplaySet array
  while (secondRandom === firstRandom ||
    secondRandom === imageDisplaySet[0] ||
    secondRandom === imageDisplaySet[1] ||
    secondRandom === imageDisplaySet[2]) {
    secondRandom = chooseRandom(0, Product.assortment.length);
  }
  // check 3nd image against 1st and 2nd as well as anything in imageDisplaySet array
  while (thirdRandom === firstRandom ||
    thirdRandom === secondRandom ||
    thirdRandom === imageDisplaySet[0] ||
    thirdRandom === imageDisplaySet[1] ||
    thirdRandom === imageDisplaySet[2]) {
    thirdRandom = chooseRandom(0, Product.assortment.length);
  }

  //push these selections to array
  imageDisplaySet = [firstRandom, secondRandom, thirdRandom];

  //render images and their captions/names
  var firstProduct = document.getElementById('first-image');
  var firstCaption = document.getElementById('first-text');
  var secondProduct = document.getElementById('second-image');
  var secondCaption = document.getElementById('second-text');
  var thirdProduct = document.getElementById('third-image');
  var thirdCaption = document.getElementById('third-text');

  var firstOption = Product.assortment[firstRandom];
  firstProduct.src = firstOption.imageSrc;
  firstCaption.textContent = firstOption.imageCaption;
  firstOption.shown++;

  var secondOption = Product.assortment[secondRandom];
  secondProduct.src = secondOption.imageSrc;
  secondCaption.textContent = secondOption.imageCaption;
  secondOption.shown++;

  var thirdOption = Product.assortment[thirdRandom];
  thirdProduct.src = thirdOption.imageSrc;
  thirdCaption.textContent = thirdOption.imageCaption;
  thirdOption.shown++;

}

// ===============calculate percentage================
Product.prototype.calculatePercentage = function () {
  //if statement means will only run if shown isn't 0, to avoid invalid result
  if (this.shown !== 0) {
    var calculation = parseFloat(this.clicked / this.shown);
    var percentCalc = Math.round(calculation * 100);
    this.percentage = percentCalc;
  }
};
// function to update percentages (called in event listener)
function updatePercentages() {
  for (var k = 0; k < Product.assortment.length; k++) {
    Product.assortment[k].calculatePercentage();
  }
}

// ===============Call initial image render================!!
renderProductImages();

function reconstituteProduct (){
  for (var i = 0; i < productInfoFromStorage.length; i++) {
    var caption = productInfoFromStorage[i].imageCaption;
    var picture = productInfoFromStorage[i].imageSrc;
    var incompleteProduct = new Product(caption, picture);
    incompleteProduct.clicked = productInfoFromStorage[i].clicked;
    incompleteProduct.shown = productInfoFromStorage[i].shown;
    incompleteProduct.percentage = productInfoFromStorage[i].percentage;
  }
}
