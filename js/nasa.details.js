function searchNASA(nasa_id) {
    fetch(`https://images-api.nasa.gov/asset/${nasa_id}`)
        .then(response => response.json())
        .then(renderData)
        .catch(console.log)
}

function renderData(data) {
    const collection = data.collection
    const items = collection.items;
    const container = document.querySelector(".main-content")
    container.innerHTML = ""
    items.forEach(item => {
        const image = item.href
        container.innerHTML += SearchResultComponent(image)
    })
}

function SearchResultComponent(image) {
    return `
    <div class="col-md-4">
    <div class="card" style="width: 18rem;">
    <img src="${image}" class="card-img-top">
    </div>
  </div>`
}

function onLoad() {
    const params = new URLSearchParams(window.location.search)
    const nasa_id = params.get("nasa_id")
    if(nasa_id){
        const title = document.getElementById("search-results-text")
        title.innerText=`${nasa_id}`
        searchNASA(nasa_id)
    }
    else{
        window.location.replace("/")
    }
}

window.onload = onLoad