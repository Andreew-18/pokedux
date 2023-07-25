import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPokemon, getPokemonDetails } from "../Api";
import { setLoading } from "./uiSlice";


const initialState = {
    pokemons : [],  
    pokemonsFiltered : [],
}

export const fetchPokemonsWithDetails = createAsyncThunk(
    'data/fetchPokemonsWithDetails',
    async (_ ,{dispatch}) => {
        dispatch(setLoading(true));
        const pokemonsRes = await getPokemon();
        const pokemonsDetailed = await Promise.all(
                pokemonsRes.map(pokemon => getPokemonDetails(pokemon))
            );
     dispatch(setPokemons(pokemonsDetailed)); 
     dispatch(setLoading(false));

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
        setFilter : (state,action) => {
            const pokemonsFiltered = state.pokemons.filter(pokemon => 
                pokemon.name.includes(action.payload))  
                state.pokemonsFiltered = pokemonsFiltered;
        }
    },
});

export const {setFavorite, setPokemons, setFilter} = dataSlice.actions;
export default dataSlice.reducer;