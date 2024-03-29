import {
  PokemonGrid,
  PokemonsResponse,
  SimplePokemon,
} from "../../../pokemons";

const getPokemons = async (
  limit = 20,
  offset = 0
): Promise<SimplePokemon[]> => {
  const data: PokemonsResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  ).then((res) => res.json());

  const pokemons = data.results.map((pokemon) => ({
    id: pokemon.url.split("/").at(-2)!,
    name: pokemon.name,
  }));

  // throw new Error("Something went wrong!");

  return pokemons;
};

export const metadata = {
  title: "Pokemon List",
  description: "Pokemon List page description",
};

export default async function PokemonsPage() {
  const pokemons = await getPokemons(150);
  return (
    <div className="flex flex-col">
      <h1 className="text-5xl my-2">
        Pokemons List <small className="text-blue-500">static</small>
      </h1>
      <PokemonGrid pokemons={pokemons} />
    </div>
  );
}
