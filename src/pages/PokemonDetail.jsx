import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function PokemonDetail() {
    const { name } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then((res) => res.json())
            .then((data) => {
                setPokemon(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(true);
                setLoading(false);
            });
    }, [name]);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        return <h2>Something went wrong</h2>;
    }

    return (
        <div>
            <Link to="/pokemon">Back</Link>
            <h1>Pokemon Details</h1>
            <h2>{pokemon.name}</h2>
            <img src={pokemon.sprites.other["official-artwork"].front_default} width="200" />
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>

            <h3>Types</h3>
            {pokemon.types.map((t) => (
                <p key={t.type.name}>{t.type.name}</p>
            ))}

            <h3>Base Stats</h3>
            {pokemon.stats.map((s) => (
                <p key={s.stat.name}>{s.stat.name}: {s.base_stat}</p>
            ))}
        </div>
    );
}

export default PokemonDetail;