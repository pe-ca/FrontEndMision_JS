const getNombrePokemon = () => document.getElementById("nombrePokemon").value.toLowerCase();

const getApiUrl = (nombre) => `https://pokeapi.co/api/v2/pokemon/${nombre}`;

const setImgPokemon = (url) => document.getElementById("imgPokemon").src = url;

const fetchPokemon = () =>{
    fetch(getApiUrl(getNombrePokemon()))
        .then(
            (res) => {
                if(res.status != "200"){
                    console.log(res.status);
                    setImgPokemon("./Img/pokeball.png")
                }
                else{
                    return res.json();
                }
            }
        )
        .then(
            (data)=>{
                if(data){
                    console.log(data);
                    setImgPokemon(data.sprites.front_default);
                }
            }
        )
    console.log(getApiUrl(getNombrePokemon()));
}
