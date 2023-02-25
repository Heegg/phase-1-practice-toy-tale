let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const form = document.querySelector(".add-toy-form");
  form.addEventListener("submit", addNewToy)

  document.addEventListener("click", (e) => {
    if(e.target.matches(".like-btn")) {
      updateLikes(e)
    }
  })

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  getToys()
});

function getToys() {
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(data => data.forEach(toy => showToy(toy)))
}

function showToy(toy) {
  const toyCollection = document.getElementById("toy-collection")
  const div = document.createElement("div")
  div.classList.add("card")

  div.id = toy.id

  const h2 = document.createElement("h2")
  h2.textContent = toy.name

  const img = document.createElement("img")
  img.src = toy.image
  img.classList.add("toy-avatar")

  const p = document.createElement("p")
  p.textContent = `${toy.likes} likes`
  p.id = toy.id

  const button = document.createElement("button")
  button.classList.add("like-btn")
  button.textContent = "like"
  button.id = toy.id
  button.addEventListener("click", (e) => {

  })
  div.append(h2, img, p, button)
  toyCollection.append(div)
}



function addNewToy(e) {
  e.preventDefault()
  const [name, image] = e.target

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      name: name.value,
      image: image.value,
      likes: 0
    })
  })
  .then(res => res.json())
  .then(res => showToy(res))
  name.value = ""
  image.value = ""
}



function updateLikes(e) {
  e.preventDefault()
  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      likes: parseInt(e.target.parentElement.children[2].textContent.split(" ")[0], 10) + 1
    })
  })
  .then(res => res.json())
  .then(res => {
    // e.target.parentElement.children[2].textContent = `${res.likes} likes` 
    const p = document.getElementById(res.id)
    p.textContent = `${res.likes} likes`
  })
}


// cat project
// function getImg() {
//     fetch('https://api.thecatapi.com/v1/breeds')
//     .then(res => res.json())
//     .then(data => 
// `https://cdn2.thecatapi.com/images/${}.jpg`

// console.log(data))
// }

// function getBreeds() {
//     fetch('https://api.thecatapi.com/v1/breeds')
//     .then(res => res.json())
//     .then(data => data.forEach(breeds => showBreeds(breeds)))
// }

// function showBreeds(breeds){
//     const breedCollection = document.getElementById("breed-collection")
//     const div = document.createElement("div")
//     div.classList.add("card")
//     // div.classList.add("card card-shadow")

//     div.id = breeds.id

//     // const img = document.createElement("img")
//     // img.src = breeds.image
//     // img.classList.add("card-img")

//     const h3 = document.createElement("h3")
//     h3.textContent = breeds.name

//     // const li = document.createElement("li")
//     // li.textContent = 

//     // const li = document.createElement("li")
//     // li.textContent = 

//     // const li = document.createElement("li")
//     // li.textContent = 

//     // const li = document.createElement("li")
//     // li.textContent = 

//     const button = document.createElement("button")
//     button.classList.add("delete-btn")
//     button.textContent = "Delete"
//     button.id = breeds.id
//     button.addEventListener("click", () => {

//     })
//     div.append(h3, button)
//     breedCollection.append(div)
// }

{/* <div class="card card-shadow">
<div class="card-img">
    <img src="https://cdn2.thecatapi.com/images/0XYvRd7oD.jpg">
</div>
   <h3 class="cat-breed">Abyssinian</h3>
   <ul class="cat-info">
    <li class="description"><b>Description:</b> The Abyssinian is easy to care for, and a joy to have in your home. They’re affectionate cats and love both people and other animals.</li>
    <li class="temperament"><b>Temperament:</b> Active, Energetic, Independent, Intelligent, Gentle</li>
    <li class="lifespan"><b>Life_span:</b> 14 - 15</li>
    <li class="origin"><b>Origin:</b> Egypt</li>
   </ul>
   <button class="delete-btn">Delete</button>
</div> */}