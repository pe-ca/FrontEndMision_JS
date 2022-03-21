const getNombrePokemon = () => document.getElementById("nombrePokemon").value.toLowerCase();

const getApiUrl = (nombre) => `https://pokeapi.co/api/v2/pokemon/${nombre}`;

const setSrc = (Id, Url) => document.getElementById(Id).src = Url;

const setInnerHTML = (Id, Valor) => document.getElementById(Id).innerHTML = Valor;

const getTipos = (element) => element.type.name + " ";

const getEstadisticas = (element) => element.stat.name + ": " + element.base_stat + "<br>";

const getMovimientos = (element) => element.move.name + ", ";

const concatenaTextos = (array, funcionBusqueda) =>{
    let cadenaConcatenada = "";
    array.forEach(
        element => {
            cadenaConcatenada += funcionBusqueda(element)
        });
    return cadenaConcatenada;
}

const evaluaRespuesta = (res) =>{
    if(res.status != "200"){
        console.log(res);
        setSrc("imgPokemon", "./Img/pokeball.png")
        setInnerHTML("Nombre", "Nombre")
        setInnerHTML("Tipo", "")
        setInnerHTML("Estadisticas", "")
        setInnerHTML("Movimientos", "")
    }
    else{
        return res.json();
    }
}

const asignaValores = (data) =>{
    if(data){
        // console.log(data);
        setSrc("imgPokemon", data.sprites.front_default);
        setInnerHTML("Nombre", setInnerHTML("Nombre", data.name.toUpperCase()))
        setInnerHTML("Tipo", concatenaTextos(data.types, getTipos))
        setInnerHTML("Estadisticas", concatenaTextos(data.stats, getEstadisticas))
        setInnerHTML("Movimientos", concatenaTextos(data.moves, getMovimientos))
        console.log(data.stats[0].base_stat)
        console.log(data.stats[0].stat.name)
    }
}

const fetchPokemon = () =>{
    fetch(getApiUrl(getNombrePokemon()))
        .then((res) => evaluaRespuesta(res))
        .then((data) => asignaValores(data))
}

//rayquaza