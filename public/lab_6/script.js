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

        



        var tempCountries = fromServer.map(fromServer => fromServer.name + " " + fromServer.code);
        var tempCountry;
        var randomCountries = range(10);
        var randomCode = range(10);
        var randomIndex = 0;

        

        for(i = 0; i < randomCountries.length; i++){
          randomIndex = Math.floor((Math.random() * (tempCountries.length - 1)));
          tempCountry = tempCountries[randomIndex].split(" ");

          countryName = tempCountry[0];
          countryCode = tempCountry[1];

          randomCountries[i] = countryName;
          randomCode[i] = countryCode;

        }
        

        randomCountries.sort();
        randomCountries.reverse();
        randomCode.sort();
        randomCode.reverse();
        //Everything stops working after this line
      
      var list = document.querySelector(".hack");
      list.setAttribute("class", "flex-inner");

      for(i = 0; i < randomCountries.length; i++){
        var country = randomCountries[i];
        var code = randomCode;

        var checkBox = '<li>' +
                        '<input type = "checkbox" id =' + country + 'value = ' + code + '>' +
                        '<label for =' + country +'>' + country + '</label>' +
                      '</li>';
      
        var element = document.querySelector(".flex-inner");
        element.innerHTML += checkBox;
              
      }
    
        console.log('fromServer', fromServer);
    })
    .catch((err) => console.log(err));
});