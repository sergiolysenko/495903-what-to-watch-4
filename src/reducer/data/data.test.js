import {reducer, ActionCreator, ActionType, Operation} from "./data.js";
import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";

const movies = [{
  id: 2,
  title: `Bohemian Rhapsody`,
  cardImg: `../../img/bohemian-rhapsody.jpg`,
  genre: `Drama`,
  year: 2000,
  backgroundImg: `img/bg-the-grand-budapest-hotel.jpg`,
  posterImg: `img/the-grand-budapest-hotel-poster.jpg`,
  rating: 5,
  ratingCount: 240,
  description: `In the 1930s, theher murder.`,
  director: `Wes Andreson`,
  starring: [`Bill Murray`],
  preview: `https://upload.wikimedia.org`,
  videoLink: `https://download.blender4`,
  runTime: 99,
  isFavorite: true,
}, {
  id: 3,
  title: `Macbeth`,
  cardImg: `../../img/macbeth.jpg`,
  genre: `Drama`,
  year: 2002,
  backgroundImg: `img/bg-the-grand-budapest-hotel.jpg`,
  posterImg: `img/the-grand-budapest-hotel-poster.jpg`,
  rating: 2,
  ratingCount: 240,
  description: `In the 1930s`,
  director: `Wes Andreson`,
  starring: [`Bill Murray`, `Edward Norton`],
  preview: `https://480p.mp4`,
  videoLink: `https://480p.mp4`,
  runTime: 200,
  isFavorite: true,
}, {
  id: 4,
  title: `Aviator`,
  cardImg: `../../img/aviator.jpg`,
  genre: `Comedy`,
  year: 1988,
  backgroundImg: `img/bg-the-grand-budapest-hotel.jpg`,
  posterImg: `img/the-grand-budapest-hotel-poster.jpg`,
  rating: 7,
  ratingCount: 188,
  description: `in her murder.`,
  director: `Leo Dicaprio`,
  starring: [`Bill Murray`],
  preview: `400p.ogv.360p.webm`,
  videoLink: `mp4`,
  runTime: 188,
  isFavorite: true,
}];
const comments = [{
  "id": 1,
  "user": {
    "id": 4,
    "name": `Kate Muir`
  },
  "rating": 8.9,
  "comment": `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
  "date": `2019-05-08T14:13:56.569Z`
}, {
  "id": 2,
  "user": {
    "id": 4,
    "name": `Kate Muir`
  },
  "rating": 8.9,
  "comment": `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
  "date": `2019-05-08T14:13:56.569Z`
}];
const newMovie = {
  id: 2,
  title: `Bohemian Rhapsody`,
  cardImg: `../../img/bohemian-rhapsody.jpg`,
  genre: `Drama`,
  year: 2000,
  backgroundImg: `img/bg-the-grand-budapest-hotel.jpg`,
  posterImg: `img/the-grand-budapest-hotel-poster.jpg`,
  rating: 5,
  ratingCount: 240,
  description: `In the 1930s, theher murder.`,
  director: `Wes Andreson`,
  starring: [`Bill Murray`],
  preview: `https://upload.wikimedia.org`,
  videoLink: `https://download.blender4`,
  runTime: 99,
  isFavorite: false,
};
const newMovies = [{
  id: 2,
  title: `Bohemian Rhapsody`,
  cardImg: `../../img/bohemian-rhapsody.jpg`,
  genre: `Drama`,
  year: 2000,
  backgroundImg: `img/bg-the-grand-budapest-hotel.jpg`,
  posterImg: `img/the-grand-budapest-hotel-poster.jpg`,
  rating: 5,
  ratingCount: 240,
  description: `In the 1930s, theher murder.`,
  director: `Wes Andreson`,
  starring: [`Bill Murray`],
  preview: `https://upload.wikimedia.org`,
  videoLink: `https://download.blender4`,
  runTime: 99,
  isFavorite: false,
}, {
  id: 3,
  title: `Macbeth`,
  cardImg: `../../img/macbeth.jpg`,
  genre: `Drama`,
  year: 2002,
  backgroundImg: `img/bg-the-grand-budapest-hotel.jpg`,
  posterImg: `img/the-grand-budapest-hotel-poster.jpg`,
  rating: 2,
  ratingCount: 240,
  description: `In the 1930s`,
  director: `Wes Andreson`,
  starring: [`Bill Murray`, `Edward Norton`],
  preview: `https://480p.mp4`,
  videoLink: `https://480p.mp4`,
  runTime: 200,
  isFavorite: true,
}, {
  id: 4,
  title: `Aviator`,
  cardImg: `../../img/aviator.jpg`,
  genre: `Comedy`,
  year: 1988,
  backgroundImg: `img/bg-the-grand-budapest-hotel.jpg`,
  posterImg: `img/the-grand-budapest-hotel-poster.jpg`,
  rating: 7,
  ratingCount: 188,
  description: `in her murder.`,
  director: `Leo Dicaprio`,
  starring: [`Bill Murray`],
  preview: `400p.ogv.360p.webm`,
  videoLink: `mp4`,
  runTime: 188,
  isFavorite: true,
}];
const recivedMovies = [
  {
    "actors": undefined,
    "backgroundColor": undefined,
    "description": undefined,
    "genre": undefined,
    "id": undefined,
    "isFavorite": undefined,
    "movieCoverSrc": undefined,
    "numberVotes": undefined,
    "posterSrc": undefined,
    "previewVideoLink": undefined,
    "producer": undefined,
    "rating": undefined,
    "runTime": undefined,
    "screenshotSrc": undefined,
    "title": undefined,
    "videoSrc": undefined,
    "yearRelease": undefined,
  },
];

describe(`Data reducer test`, () => {
  it(`Check if initial state is correct`, () => {
    expect(reducer(undefined, {})).toEqual({
      allMovies: [],
      mainCard: {},
      comments: [],
      favoriteMovies: [],
    });
  });
  it(`set movies`, () => {
    expect(reducer({
      allMovies: [],
    }, {
      type: ActionType.SET_MOVIES,
      payload: movies,
    })).toEqual({
      allMovies: movies,
    });
  });
  it(`set main movie`, () => {
    expect(reducer({
      mainCard: [],
    }, {
      type: ActionType.SET_MAIN_MOVIE,
      payload: movies[0],
    })).toEqual({
      mainCard: movies[0],
    });
  });
  it(`set comments`, () => {
    expect(reducer({
      comments: [],
    }, {
      type: ActionType.SET_COMMENTS,
      payload: comments,
    })).toEqual({
      comments,
    });
  });
  it(`set favorite movies`, () => {
    expect(reducer({
      favoriteMovies: [],
    }, {
      type: ActionType.SET_FAVORITE_MOVIES,
      payload: movies,
    })).toEqual({
      favoriteMovies: movies,
    });
  });
  it(`update movies`, () => {
    expect(reducer({
      allMovies: movies,
    }, {
      type: ActionType.UPDATE_MOVIES,
      payload: newMovie
    })).toEqual({
      allMovies: newMovies,
    });
  });
  it(`update mainCard`, () => {
    expect(reducer({
      mainCard: movies[0],
    }, {
      type: ActionType.UPDATE_MAIN_CARD,
      payload: newMovie
    })).toEqual({
      mainCard: newMovie,
    });
  });
});

describe(`Data action creator works correctly`, () => {
  it(`Action creator set movies`, () => {
    expect(ActionCreator.setMovies(movies)).toEqual({
      type: ActionType.SET_MOVIES,
      payload: movies,
    });
  });

  it(`Action creator set main movie`, () => {
    expect(ActionCreator.setMainMovie(newMovie)).toEqual({
      type: ActionType.SET_MAIN_MOVIE,
      payload: newMovie,
    });
  });

  it(`Action creator set comments`, () => {
    expect(ActionCreator.setComments(comments)).toEqual({
      type: ActionType.SET_COMMENTS,
      payload: comments,
    });
  });

  it(`Action creator set favorite movies`, () => {
    expect(ActionCreator.setFavoriteMovies(movies)).toEqual({
      type: ActionType.SET_FAVORITE_MOVIES,
      payload: movies,
    });
  });

  it(`Action creator update movies`, () => {
    expect(ActionCreator.updateMovies(newMovie)).toEqual({
      type: ActionType.UPDATE_MOVIES,
      payload: newMovie,
    });
  });

  it(`Action creator update main card`, () => {
    expect(ActionCreator.updateMainCard(newMovie)).toEqual({
      type: ActionType.UPDATE_MAIN_CARD,
      payload: newMovie,
    });
  });
});

describe(`Operation work correctly`, () => {
  const onServerError = () => {};

  const api = createAPI(onServerError);
  const apiMock = new MockAdapter(api);

  it(`load movies`, () => {
    apiMock.onGet(`/films`).reply(`200`, [{fake: true}]);

    const dispatch = jest.fn();
    const moviesLoader = Operation.loadMovies();

    return moviesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_MOVIES,
          payload: recivedMovies
        });
      });
  });

  it(`load main movie`, () => {
    apiMock.onGet(`/films/promo`).reply(`200`, [{fake: true}]);

    const dispatch = jest.fn();
    const mainMovieLoader = Operation.loadMainMovie();

    return mainMovieLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_MAIN_MOVIE,
          payload: recivedMovies[0],
        });
      });
  });

  it(`load favorite movies`, () => {
    apiMock.onGet(`/favorite`).reply(`200`, [{fake: true}]);

    const dispatch = jest.fn();
    const favoriteMoviesLoader = Operation.loadFavoriteMovies();

    return favoriteMoviesLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.SET_FAVORITE_MOVIES,
          payload: recivedMovies,
        });
      });
  });

  it(`change flag is favorite`, () => {
    apiMock
      .onPost(`/favorite/1/1`)
      .reply(`200`, [{fake: true}]);

    const dispatch = jest.fn();
    const changeFlagIsFavorite = Operation.changeFlagIsFavorite(1, false);

    return changeFlagIsFavorite(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.UPDATE_MOVIES,
          payload: recivedMovies[0]
        });
      });
  });
});
