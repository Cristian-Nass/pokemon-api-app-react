import { useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import Spinner from "../Spinner";
import { PokemonEvolutionType } from "../../types/types";
import { useNavigate } from "react-router-dom";

export function PokemonEvolution() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useApi(
    `https://pokeapi.co/api/v2/evolution-chain/${id}`
  );
  if (isLoading) return <Spinner />;
  if (error) return <>something went wrong check the internet...</>;

  const pockemonEvolution: PokemonEvolutionType = data;

  const goBackPage = () => {
    navigate(-1);
  };

  return (
    <>
      <div style={{ width: "100%", textAlign: "center" }}>
        <div className='pokemon-evolution-title'>Pokemon Evolution !</div>
        <div className='evolution-details-container'>
          <div>Evolution ID</div>
          <div className='evolution-details-font'>{pockemonEvolution.id}</div>
        </div>
        <div className='evolution-details-container'>
          <div>Minimum Level</div>
          <div className='evolution-details-font'>
            {
              pockemonEvolution.chain.evolves_to[0].evolution_details[0]
                .min_level
            }
          </div>
        </div>
        <div className='evolution-details-container'>
          <div>Evolution Species Name</div>
          <div className='evolution-details-font'>
            {pockemonEvolution.chain.species.name}
          </div>
        </div>
        <button className='back-button' onClick={() => goBackPage()}>
          &lt;
        </button>
      </div>
    </>
  );
}
