import {reducer, ActionCreator} from "./reducer.js";
import {Genres} from "./components/utils/constants.js";

it(`Reducer without additional parameters should return initial state genre`, () => {
  expect(reducer(void 0, {}).genre).toEqual(Genres.ALL);
});

it(`Reducer should change genre if action creator is changeGenre`, ()=>{
  expect(reducer({}, ActionCreator.changeGenre(Genres.COMEDIES))).toEqual({
    genre: Genres.COMEDIES,
  });
});

it(`Reducer should return filtered movie list by genre if action creator is filteredMovies`, () => {
  expect(reducer({}, ActionCreator.filteredMovies(Genres.DRAMA)).filteredMovies.every((movie) => movie.genre === Genres.DRAMA)).toEqual(true);
});

