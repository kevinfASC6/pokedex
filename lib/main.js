let url = "https://pokeapi.co/api/v2/pokemon/chimchar"; 

let fluidContainer = document.getElementsByClassName("container-fluid")[0]; 

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
    let chimchar = new Pokemon(name, number, types, moves, abilities, image);  
    console.log(chimchar); 
    createPokemonElement(chimchar); 
}) 
.catch(function(error)  {
console.log(error);
})