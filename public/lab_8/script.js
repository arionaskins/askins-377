function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

function databaseInitialize() {
  let db = new sqlite3.Database('dbSettings', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });

function convertRestaurantsToCategories(restaurantList) {
  // process your restaurants here!
  const rlist = range(restaurantList.length);
  console.log(rlist);
  const newlist = rlist.map((item) => restaurantList[item]); // we
  console.log(newlist.length ,'len list cats');
  console.log(newlist);

  const newDataShape = newlist.reduce((collection, item, i) => {
    const findCat = collection.find((Item) => Item.label === item.category);
    
    if (!findCat) {
      collection.push({
        label: item.category,
        y: 1
      });
    } else {
      const pos = collection.findIndex((el) => el.label === item.category);
      collection[pos].y += 1;
    }
    return collection;
  }, []);

  return newDataShape;
}

function makeYourOptionsObject(datapointsFromRestaurantsList) {
  // set your chart configuration here!
  CanvasJS.addColorSet('customColorSet1', [
    '#003f5c',
    '#58508d',
    '#ff6361',
    '#ffa600'// add an array of colors here https://canvasjs.com/docs/charts/chart-options/colorset/
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
      gridColor: 'rgba(1,77,101,.1)',
      title: 'Restaurants By Category',
      labelFontSize: 12,
      maximum: 200,
      scaleBreaks: {
        customBreaks: [{
          startValue: 40,
          endValue: 50,
          color: 'maroon',
          type: 'zigzag'
        },
        {
          startValue: 85,
          endValue: 100,
          color: 'maroon',
          type: 'zigzag'
        },
        {
          startValue: 140,
          endValue: 175,
          color: 'maroon',
          type: 'zigzag'
        }]
      } 
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
//  console.table('jsonFromServer', jsonFromServer);
  sessionStorage.setItem('restaurantList', JSON.stringify(jsonFromServer)); // don't mess with this, we need it to provide unit testing support
  // Process your restaurants list
  // Make a configuration object for your chart
  // Instantiate your chart
  const reorganizedData = convertRestaurantsToCategories(jsonFromServer);
  const options = makeYourOptionsObject(reorganizedData);
  const chart = new CanvasJS.Chart('chartContainer', options);
  chart.render();
}

// Leave lines 52-67 alone; do your work in the functions above
document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray(); // here we're using jQuery to serialize the form
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