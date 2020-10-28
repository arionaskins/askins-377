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

        var tempCountries = fromServer.map(fromServer => fromServer.name);
        var tempCountry;    
        var tempCode = fromServer.map(fromServer => fromServer.code);
    
        var randomCountries = range(10);
        var randomCode = range(10);
        var randomIndex = 0;

    
        for(i = 0; i < randomCountries.length; i++){
          randomIndex = Math.floor((Math.random() * (tempCountries.length - 1)));
          tempCountry = tempCountries[randomIndex].split(",");
          
          if(tempCountry[1] != null){
            countryName = tempCountry[1] + " " + tempCountry[0];
          }else{
            countryName = tempCountry;
          }

          countryCode = tempCode[randomIndex];

          randomCountries[i] = countryName;
          randomCode[i] = countryCode;

        }
        
        randomCountries.sort();
        randomCountries.reverse();
      
        randomCode.sort();
        randomCode.reverse();

        console.log("Countries", randomCountries);
        console.log("Codes", randomCode);

      var list = document.querySelector("form > ul");
      list.setAttribute("class", "flex-inner");
      list.innerHTML = "";

      for(i = 0; i < randomCountries.length; i++){
        var country = randomCountries[i];
        var code = randomCode;

        var checkBox = '<li>' +
                        '<input type = "checkbox" name = "data" id =' + country + 'value = ' + code + '>' +
                        '<label for =' + country +'>' + country + '</label>' +
                      '</li>';
      
        var element = document.querySelector("form > ul");
        element.innerHTML += checkBox;
              
      }
    
        console.log('fromServer', fromServer);
    })
    .catch((err) => console.log(err));
});