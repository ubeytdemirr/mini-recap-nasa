function searchNASA(query) {
    fetch(`https://images-api.nasa.gov/search?q=${query}`)
        .then(response => response.json())
        .then(renderData)
        .catch(console.log)
}

function renderData(data) {
    const collection = data.collection
    const items = collection.items;
    const container = document.querySelector(".main-content")
    container.innerHTML=""
    items.forEach(item => {
        const image = item.links[0].href
        const data = item.data[0]
        const title = data.title;
        const description = data.description;
        const nasa_id = data.nasa_id;
    
        container.innerHTML+=SearchResultComponent(image, title, description, nasa_id )
    })
}

function SearchResultComponent(image, title, description, nasa_id) {
    return `
    <div class="col-md-4">
    <div class="card" style="width: 18rem;">
    <img src="${image}" class="card-img-top" alt="${title}">
    <div class="card-body">
   <a href = "/details.html?nasa_id=${nasa_id}">  <h5>${title}</h5> </a>
      <p class="card-text">${description}</p>
    </div>
    </div>
  </div>`
}

function onLoad() {
    const params = new URLSearchParams(window.location.search)
    const query = params.get("query")
    if(query){
        const title = document.getElementById("search-results-text")
        title.innerText=`Search results for ${query}`
        searchNASA(query)
    }
    else{
        window.location.replace("/")
    }
}

window.onload = onLoad