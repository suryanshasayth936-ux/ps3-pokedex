import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Pokedex() {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=50")
            .then((res) => res.json())
            .then((data) => {
                setPokemons(data.results);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    const filteredPokemons = pokemons.filter((poke) =>
        poke.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h1>Pokedex</h1>

            <input 
                type="text" 
                placeholder="Search pokemon..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: "20px", padding: "5px" }}
            />

            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {filteredPokemons.map((poke) => {
                    const num = poke.url.split("/")[6];
                    const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${num}.png`;

                    return (
                        <div key={poke.name} style={{ backgroundColor: "aqua", margin: "10px", padding: "10px" }}>
                            <img src={imgUrl} alt={poke.name} width="100" />
                            <h3>#{num}</h3>
                            <h3>{poke.name}</h3>
                            <Link to={`/pokemon/${poke.name}`}>
                                View Details
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Pokedex;