import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPokemon, getPokemonDetails } from "../Api";

const initialState = {
    pokemons : [],
}

export const fetchPokemonsWithDetails = createAsyncThunk(
    'data/fetchPokemonsWithDetails',
    async (_ ,{dispatch}) => {
        const pokemonsRes = await getPokemon();
        const pokemonsDetailed = await Promise.all(
                pokemonsRes.map(pokemon => getPokemonDetails(pokemon))
            );
     dispatch(setPokemons(pokemonsDetailed)); 
    }
);

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers : {
        setPokemons: (state, action) => {
            state.pokemons = action.payload;
        },
        setFavorite : (state, action) => {
            const currentPokemonsIndex = state.pokemons.findIndex((pokemon) =>
            {
                return pokemon.id === action.payload.pokemonId;
            });

            if(currentPokemonsIndex >= 0){
                const isFavorite = state.pokemons[currentPokemonsIndex].favorite;

                state.pokemons[currentPokemonsIndex].favorite = !isFavorite;
            };

        },
    },
});

export const {setFavorite, setPokemons} = dataSlice.actions;
console.log(dataSlice);
export default dataSlice.reducer;