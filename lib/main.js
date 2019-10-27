//let url = `https://pokeapi.co/api/v2/pokemon/${id}`; 

let fluidContainer = document.getElementsByClassName("container-fluid")[0]; 

function callPokemonAPI(name) { 
    let url = `https://pokeapi.co/api/v2/pokemon/${name}`; 
    fetch(url) 
    .then((response) => response.json()) 
    .then(function(data) { 
        console.log(data);   
        let name = data.name; 
        let number = data.id;
        let types = getTypes(data);  
        let moves = getMoves(data); 
        let abilities = getAbilities(data);  
        let image = data.sprites.front_default; 
        let pokemon = new Pokemon(name, number, types, moves, abilities, image);  
        console.log(pokemon); 
        //createPokemonElement(chimchar);  
        createCarouselItem(pokemon); 
    }) 
    .catch(function(error)  {
    console.log(error);
    })
}

function getTypes(pokemonJson)  {
    let types = []; 
    for(let type of pokemonJson.types) { 
        types.push(type.type.name); 
    } 
    return types; 
 } 

function getMoves(pokemonJson) { 
    let moves = []; 
    for(let move of pokemonJson.moves)  {
        moves.push(move.move.name); 
    } 
    return moves; 
} 

function getAbilities(pokemonJson) { 
    let abilities = []; 
    for(let ability of pokemonJson.abilities)  {
        abilities.push(ability.ability.name); 
    } 
    return abilities; 
}

function createCarouselItem(pokemon) { 
    //div 
    let carouselItem = document.createElement("div"); 
    carouselItem.setAttribute("class", "carousel-item"); 
    let carouselImg = document.createElement("img"); 
    carouselImg.setAttribute("class", "d-block w-50"); 
    carouselImg.src = pokemon.image; 

    carouselItem.appendChild(carouselImg);  
    let carouselInner = document.getElementsByClassName("carousel-inner")[0]; 
    document.getElementsByClassName("carousel-inner")[0].appendChild(carouselItem);  
    carouselInner.appendChild(carouselItem); 
    for( let i = 1; i < carouselInner.length; i++)  { 
        carouselInner.childNodes[i].classlist.remove("active");
    } 
    carouselInner.childNodes[1].classList.add("active"); 
}

function createPokemonElement(pokemon){ 
    //h1 tag for name  
    let h1 = document.createElement("h1");  
    h1.innerText = pokemon.name;
    //h2 tag fo number  
    let h2 = document.createElement("h2"); 
    h2.innerHTML = pokemon.number; 
    //p tag for types 
    let p = document.createElement("p"); 
    for(let type of pokemon.types) { 
        p.innerText += `${type}`; 
    }
    //ul tag for moves  
    let moveUl = document.createElement("ul"); 
    for(let move of pokemon.moves) { 
        moveUl.innerHTML += `<li>${move}</li>`; 
    }
    //ul tag for abilities  
    let abilityUl = document.createElement("ul"); 
    for(let ability of pokemon.abilities) { 
        abilityUl.innerHTML += `<li>${ability}</li>`; 
    } 
    //h1 tag for image 
    let img = document.createElement("img"); 
    img.src = pokemon.image; 
    //div container for pokemon element 
    let div = document.createElement("div"); 
    div.append(h1, h2, p, moveUl, abilityUl, img); 
    fluidContainer.appendChild(div); 
}

let search = document.getElementById("search");  
let find = document.getElementById("find");  

search.addEventListener('click', searchAPI) 

function searchAPI() {  
     
    callPokemonAPI(find.value); 
}