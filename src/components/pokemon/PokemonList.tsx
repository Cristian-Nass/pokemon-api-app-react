import React, { useState, useEffect } from "react";
import useApi from "../../hooks/useApi";
import Pokemon from "./Pokemon";
import Spinner from "../Spinner";

interface PokemonType {
  name: string;
  url: string;
}

interface PokemonListType {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonType[];
}

const PokemonList = () => {
  const [offset, setOffset] = useState(0);

  const { data, isLoading, error } = useApi(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=10`
  );
  const [pokemonListData, setPokemonListData] = useState<PokemonListType>(data);

  useEffect(() => {
    setPokemonListData(data);
  }, [data]);

  if (isLoading) return <Spinner />;
  if (error) return <div>something went wrong</div>;
  return (
    <>
      {pokemonListData?.results.map((pokemon) => (
        <Pokemon key={pokemon.url} name={pokemon.name} url={pokemon.url} />
      ))}
      <div style={{ display: "flex", maxWidth: "400px", margin: "10px auto" }}>
        <div style={{ flex: 1, margin: "auto", textAlign: "center" }}>
          <button
            disabled={!pokemonListData?.previous}
            className='button-for-evolution'
            onClick={() => setOffset(offset - 10)}
          >
            Back
          </button>
        </div>
        <div style={{ flex: 1, margin: "auto", textAlign: "center" }}>
          <button
            disabled={!pokemonListData?.next}
            className='button-for-evolution'
            onClick={() => setOffset(offset + 10)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default PokemonList;
