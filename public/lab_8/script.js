

function convertRestaurantsToCategories(restaurantList) {
  // process your restaurants here!
  var categoryArr = restaurantList.map(restaurantList => restaurantList.category);
  const categories = uniqueCategories(categoryArr);
  var restaurantToCategoryList = [];
  var categoryCount = 0;
  var k = 0;

  console.log("CategoriesFunction", uniqueCategories(categoryArr));

  for(var i = 0; i < categories.length; i++){ 
    for(var j = 0; j < categoryArr.length; j++){
      if(categories[i] == categoryArr[j]){ //Counts the number of unique categories in all the categories given by jsonfromserver
        categoryCount++;
      }
    }

    restaurantToCategoryList[k++] = {y: categoryCount, label: categories[i]}; //Adds count and category to list
    categoryCount = 0;
  }


  return restaurantToCategoryList;
}

 function uniqueCategories(categoriesArr){
  var uniqueCategoryArr = [];
  var tempCategory = "";
  var i = 0;
  var j = 0;
 
  for(i = 0; i < categoriesArr.length; i++){
    tempCategory = categoriesArr[i];

    if(uniqueCategoryArr.includes(tempCategory) == false){
      uniqueCategoryArr[j++] = tempCategory;
    }
  }

  return uniqueCategoryArr;
}

function makeYourOptionsObject(datapointsFromRestaurantsList) {
  // set your chart configuration here!
  CanvasJS.addColorSet('customColorSet1', [
    // add an array of colors here https://canvasjs.com/docs/charts/chart-options/colorset/
  ]);

  return {
    animationEnabled: true,
    colorSet: 'customColorSet1',
    title: {
      text: 'Places To Eat Out In Future'
    },
    axisX: {
      interval: 1,
      labelFontSize: 12
    },
    axisY2: {
      interlacedColor: 'rgba(1,77,101,.2)',
      gridColor: 'rgb(1,77,101,.1)',
      title: 'Resturants by Category',
      labelFontSize: 12,
      scaleBreaks: {customBreaks: [
        {startValue: 40,  endValue: 50, color: "white"}, 
        {startValue: 60,  endValue: 100, color: "white"}, 
        {startValue: 110,  endValue: 200, color: "white"}]} // Add your scale breaks here https://canvasjs.com/docs/charts/chart-options/axisy/scale-breaks/custom-breaks/
    },
    data: [{
      type: 'bar',
      name: 'restaurants',
      axisYType: 'secondary',
      dataPoints: datapointsFromRestaurantsList
    }]
  };
}

function runThisWithResultsFromServer(jsonFromServer) {
  //console.log("categoryTest", uniqueCategories(test))

  console.log('jsonFromServer', jsonFromServer);
  sessionStorage.setItem('restaurantList', JSON.stringify(jsonFromServer)); // don't mess with this, we need it to provide unit testing support
  // Process your restaurants list
  // Make a configuration object for your chart
  // Instantiate your chart
  const reorganizedData = convertRestaurantsToCategories(jsonFromServer);
  console.log("List", convertRestaurantsToCategories(jsonFromServer));
  const options = makeYourOptionsObject(reorganizedData);
  const chart = new CanvasJS.Chart('chartContainer', options);
  chart.render();
}

// Leave lines 52-67 alone; do your work in the functions above
document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray();
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((jsonFromServer) => runThisWithResultsFromServer(jsonFromServer))
    .catch((err) => {
      console.log(err);
    });
});