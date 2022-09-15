let search = document.getElementById("btnBuscar");
let searchBar = document.getElementById("inputBuscar");
const NASA_API = 'https://images-api.nasa.gov/search?q='

let itemsArray = [];


search.addEventListener('click', searchSpace)
function searchSpace(){
    window.fetch(`${NASA_API}${searchBar.value.toLowerCase()}`)
    .then(response => {
        if(response.status === 404){
            alert('Intenta de nuevo')
        }else{
            return response.json()
        }
    })
    .then(data => {
        itemsArray = data.collection.items;
       mostrarEnWeb(itemsArray);
       console.log(itemsArray)
    })
}

function mostrarEnWeb(array){
    let htmlContentToAppend = "";
        for (let i = 0; i < array.length; i++) {
            let element = array[i];
            if(element.links === undefined){
              continue
            }
            htmlContentToAppend += `
      <div class="card">
         <div class="card text-center">
          <img class="card-img-top" src="`+element.links[0].href +`" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">`+element.data[0].title+`</h5>
              <p class="card-text">`+element.data[0].description+`</p>
              <p class="card-text"><small class="text-muted">`+element.data[0].date_created+`</small></p>
            </div>
          </div>
        `
      }
        document.getElementById("contenedor").innerHTML = htmlContentToAppend;
}
