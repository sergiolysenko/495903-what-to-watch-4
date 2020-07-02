import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SmallMovieCard from "./small-movie-card.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const movie = {
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  src: `../../img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
};

describe(`SmallMovieCardComponent`, () => {
  it(`Check click on the title`, () => {
    const onTitleClick = jest.fn();

    const smallMovieCard = shallow(
        <SmallMovieCard
          movie={movie}
          onTitleClick={onTitleClick}
          onHover={()=>{}}
        />
    );
    const smallMovieTitle = smallMovieCard.find(`.small-movie-card__link`);
    smallMovieTitle.simulate(`click`);

    expect(onTitleClick.mock.calls.length).toBe(1);
  });

  it(`Check if state changed by hover on the card`, () => {
    const onHover = jest.fn();

    const smallMovieCard = shallow(
        <SmallMovieCard
          movie={movie}
          onTitleClick={()=>{}}
          onHover={onHover}
        />
    );
    const card = smallMovieCard.find(`.small-movie-card`);

    card.simulate(`mouseenter`);
    expect(onHover).toHaveBeenCalledTimes(1);
    expect(onHover.mock.calls[0][0]).toMatchObject(movie);
  });
});
