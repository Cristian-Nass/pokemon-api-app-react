import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { DetailsType } from "../../types/types";
import Spinner from "../Spinner";
import { bookmarkHandler, isAlreadyBookmarked } from "../../services/bookmark";

const PokemonDetails = () => {
  const { name } = useParams();
  const { data, isLoading, error } = useApi(
    `https://pokeapi.co/api/v2/pokemon/${name}/`
  );

  const [pokemonDetails, setPokemonDetails] = useState<DetailsType>();
  const [bookmarkItems, setBookmarkItems] = useState<boolean>();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setPokemonDetails(data);
  }, [data]);

  useEffect(() => {
    setBookmarkItems(isAlreadyBookmarked(data?.id));
  }, [data?.id]);

  const goToEvolution = (id: number) => {
    navigate(`${location.pathname}/evolution/${id}`);
  };
  const goBackPage = () => {
    navigate(-1);
  };

  if (isLoading) return <Spinner />;
  if (error) return <>something went wrong check the internet...</>;

  const addToBookmark = () => {
    bookmarkHandler(data?.id);
    setBookmarkItems(isAlreadyBookmarked(data?.id));
  };

  return (
    <div
      className='pokemon-details-container'
      style={{ fontStyle: bookmarkItems ? "italic" : "normal" }}
    >
      Bookmark
      <input
        type='checkbox'
        checked={bookmarkItems}
        style={{ cursor: "pointer" }}
        onChange={() => addToBookmark()}
      />
      <div>
        <img src={pokemonDetails?.sprites.front_default} alt='front' />
        <img src={pokemonDetails?.sprites.back_default} alt='back' />
      </div>
      <div className='details-text-container'>
        <div style={{ flex: 1 }}>Name : </div>
        <div style={{ flex: 1 }}>{name}</div>
      </div>
      <div>
        <div className='details-text-container'>
          <div style={{ flex: 1 }}>Experience : </div>
          <div style={{ flex: 1 }}>{pokemonDetails?.base_experience}</div>
        </div>
      </div>
      <div>
        <div className='details-text-container'>
          <div style={{ flex: 1 }}>Abilities :</div>
          <div style={{ flex: 1 }}>
            {pokemonDetails?.abilities.map((ability) => (
              <div key={ability.ability.url}>{ability.ability.name}</div>
            ))}
          </div>
        </div>
      </div>
      <div className='details-text-container' style={{ marginTop: "4px" }}>
        <div style={{ flex: 1, margin: "auto", textAlign: "center" }}>
          <button className='button-for-evolution' onClick={() => goBackPage()}>
            Back
          </button>
        </div>
        <div style={{ flex: 1, margin: "auto", textAlign: "center" }}>
          <button
            className='button-for-evolution'
            onClick={() => goToEvolution(pokemonDetails?.id || 0)}
          >
            Evolution
          </button>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
