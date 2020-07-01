import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SmallMovieCard from "./small-movie-card.jsx";

const TestSettings = {
  MOVIE: `Fantastic Beasts`,
};

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`SmallMovieCardComponent`, () => {
  it(`Check click on the title`, () => {
    const onMovieTitleClick = jest.fn();

    const smallMovieCard = shallow(
        <SmallMovieCard
          movie={TestSettings.MOVIE}
          onMovieTitleClick={onMovieTitleClick}
        />
    );
    const smallMovieTitle = smallMovieCard.find(`.small-movie-card__link`);
    smallMovieTitle.simulate(`click`);

    expect(onMovieTitleClick.mock.calls.length).toBe(1);
  });
});
