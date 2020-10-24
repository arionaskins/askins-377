// You may wish to find an effective randomizer function on MDN.

function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    let item = Math.floor(Math.random()*(243-0)+0);
    if (arr.includes(item)) {
      item = Math.floor(Math.random()*(243-0)+0);
    }
    arr.push(item);
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
  }) // fromserver is countries json from server
    .then((fromServer) => fromServer.json())
    .then((fromServer) => {
      // You're going to do your lab work in here. Replace this comment.
      const formm = document.querySelector('form');
      const lst = range(10); // get 10 random number btwn 0-243 list
      const newList = lst.map((obj) => fromServer[obj]); // return 10-country object
      const revLst = newList.sort((a, b) => sortFunction(b, a, 'name')); // sort and return object with 10 countries

      if (document.querySelector('.flex-inner')) {
        $('ul').remove();
      }

      // create list 
      const ul = document.createElement('ul');
      ul.className = 'flex-inner';

      // inject ul into form
      $('form').prepend(ul);

      // for each
      revLst.forEach((cntr, i) => {
        const li = document.createElement('li');
        $(li).append(`<input type="checkbox" value=${cntr.code} id=${cntr.code} />`);
        $(li).append(`<label for=${cntr.code}> ${cntr.name} </input>`);
        $(ul).append(li);

      // <input type="checkbox" name="eighteen-thirtyfive" id="eighteen-thirtyfive">
      //                  <label for="eighteen-thirtyfive"
      });
      console.log('fromServer', revLst);
      console.log(newList);
      console.log('fromServer', ul);
      console.log('fromServer', formm);
      //       console.table(fromServer);
      console.log(lst);
    })
    .catch((err) => console.log(err));
});