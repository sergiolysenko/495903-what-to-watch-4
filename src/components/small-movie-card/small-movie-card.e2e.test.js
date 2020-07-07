import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SmallMovieCard from "./small-movie-card.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const movie = {
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  cardImg: `../../img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  genre: `Drama`,
  year: 2014,
  backgroundImg: `img/bg-the-grand-budapest-hotel.jpg`,
  posterImg: `img/the-grand-budapest-hotel-poster.jpg`,
  rating: `8,9`,
  ratingCount: 240,
  description: `finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
  director: `Wes Andreson`,
  starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
  preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
};

const mockEvent = {
  preventDefault() {}
};

describe(`SmallMovieCardComponent`, () => {
  it(`Check click on the title`, () => {
    const onClick = jest.fn();

    const smallMovieCard = shallow(
        <SmallMovieCard
          movie={movie}
          onClick={onClick}
          onHover={()=>{}}
        />
    );
    const smallMovieTitle = smallMovieCard.find(`.small-movie-card__link`);
    smallMovieTitle.simulate(`click`, mockEvent);

    expect(onClick.mock.calls.length).toBe(1);
  });

  it(`Check click on the card`, () => {
    const onClick = jest.fn();

    const smallMovieCard = shallow(
        <SmallMovieCard
          movie={movie}
          onClick={onClick}
          onHover={()=>{}}
        />
    );
    const smallMovieTitle = smallMovieCard.find(`article.small-movie-card`);
    smallMovieTitle.simulate(`click`, mockEvent);

    expect(onClick.mock.calls.length).toBe(1);
  });

  it(`Check if state changed by hover on the card`, () => {
    const onHover = jest.fn();

    const smallMovieCard = shallow(
        <SmallMovieCard
          movie={movie}
          onClick={()=>{}}
          onHover={onHover}
        />
    );
    const card = smallMovieCard.find(`.small-movie-card`);

    card.simulate(`mouseenter`);
    expect(onHover).toHaveBeenCalledTimes(1);
    expect(onHover.mock.calls[0][0]).toMatchObject(movie);
  });
});
