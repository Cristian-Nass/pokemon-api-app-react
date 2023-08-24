import React from "react";
import useApi from "../../hooks/useApi";
import { useNavigate } from "react-router-dom";

interface PokemonPropsType {
  name: string;
  url: string;
}

const Pokemon = (props: PokemonPropsType) => {
  const navigate = useNavigate();
  const { data } = useApi(props.url);
  const imageUrlTest = data?.sprites.front_default;

  const goToDetails = (name: string) => {
    navigate(`/details/${name}`);
  };

  return (
    <div
      onClick={() => goToDetails(props.name)}
      className='list-table-container'
    >
      <div>{props.name}</div>
      <img height='90px' src={imageUrlTest} alt={props.name} />
    </div>
  );
};

export default Pokemon;
