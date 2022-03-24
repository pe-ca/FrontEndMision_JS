var idPrincipal = 0;

const getNombrePokemon = () => document.getElementById("nombrePokemon").value.toLowerCase();

const getApiUrl = (nombre) => `https://pokeapi.co/api/v2/pokemon/${nombre}`;

const setSrc = (Id, Url) => document.getElementById(Id).src = Url;

const setInnerHTML = (Id, Valor) => document.getElementById(Id).innerHTML = Valor;

const getTipos = (element) => element.type.name + " ";

const getEstadisticas = (element) => element.stat.name + ": " + element.base_stat + "<br>";

const getMovimientos = (element) => element.move.name + ", ";

const getIdNombre = (element) => "#" + element.id + "    " + element.name.toUpperCase();

function delay(time){
    return new Promise(resolve => setTimeout(resolve, time))
}

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

const asignaValoresPrincipales = (imgId, IdNombre, data) =>{
    if(data){
        setSrc(imgId, data.sprites.front_default);
        setInnerHTML(IdNombre, getIdNombre(data));
        setInnerHTML("Tipo", concatenaTextos(data.types, getTipos));
        setInnerHTML("Estadisticas", concatenaTextos(data.stats, getEstadisticas));
        setInnerHTML("Movimientos", concatenaTextos(data.moves, getMovimientos));
        getPokemonAnteriorSiguiente(data.id);
    }
}

const asignaValoresSecundarios = (Id, IdNombre, data) =>{
    if(data){
        setSrc(Id, data.sprites.front_default);
        setInnerHTML(IdNombre, getIdNombre(data));
    }
}

const fetchPokemon = (imgId, IdNombre, Valor, Consulta, Evalua, Asigna) => {
    fetch(Consulta(Valor))
        .then((res) => Evalua(res))
        .then((data) => Asigna(imgId, IdNombre, data));
}

const getPokemonAnteriorSiguiente = (idPrincipal) => {
    fetchPokemon("imgPokemonAnt", "NombreAnt", idPrincipal - 1, getApiUrl, evaluaRespuesta, asignaValoresSecundarios);
    fetchPokemon("imgPokemonSig", "NombreSig", idPrincipal + 1, getApiUrl, evaluaRespuesta, asignaValoresSecundarios);
}

const getPokemon = () => {
    fetchPokemon("imgPokemon", "Nombre", getNombrePokemon(), getApiUrl, evaluaRespuesta, asignaValoresPrincipales);
}
