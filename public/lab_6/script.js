// You may wish to find an effective randomizer function on MDN.
function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

function sortFunction(a, b, key) {
  if (a[key] < b[key]) {
    return -1;
  } if (a[key] > b[key]) {
    return 1;
  }
  return 0;
}

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
    .then((fromServer) => {
      // You're going to do your lab work in here. Replace this comment.
      var tempCountries = countries.map(countries.name);
      var randomCountries = range(9);
      var randomIndex = 0;

      for(i = 0; i < randomCountries.length; i++){
        randomIndex = Math.floor((Math.random() * (tempCountries.length - 1)));
        randomCountries[i] = tempCountries[randomIndex];
      }
      
      randomCountries.sort();
      randomCountries.reverse();

    for(i = 0; i < randomCountries.length; i++){

      var country = randomCountries[i];
      var checkBox = '<li>' +
                      '<input type = "checkbox" id =' + country + '>' +
                      '<label for =' + country +'>' + country + '</label>' +
                    '</li>';
    
      document.querySelector(".flex-inner").innerHTML += checkBox;
    }

      console.log('fromServer', fromServer);
    })
    .catch((err) => console.log(err));
});