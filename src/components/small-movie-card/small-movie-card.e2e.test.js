import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SmallMovieCard from "./small-movie-card.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const movie = {
  id: 1,
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  cardImg: `../../img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  genre: `Drama`,
  year: 2014,
  backgroundImg: `img/bg-the-grand-budapest-hotel.jpg`,
  posterImg: `img/the-grand-budapest-hotel-poster.jpg`,
  rating: 6,
  ratingCount: 40,
  description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege. Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
  director: `Wes Andreson`,
  starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`, `Tony Revoloru`, `Tilda Swinton`, `Tom Wilkinson`, `Owen Wilkinson`, `Adrien Brody`, `Ralph Fiennes`, `Jeff Goldblum`],
  preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  runTime: 125,
  videoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
};

describe(`SmallMovieCardComponent`, () => {
  it(`Check on mouse enter`, () => {
    const onMouseEnter = jest.fn();

    const smallMovieCard = shallow(
        <SmallMovieCard
          movie={movie}
          isPlaying={true}
          onMouseEnter={onMouseEnter}
          onMouseLeave={()=>{}}
        />
    );
    const smallMovie = smallMovieCard.find(`article.small-movie-card`);
    smallMovie.simulate(`mouseenter`);

    expect(onMouseEnter).toHaveBeenCalledTimes(1);
  });

  it(`Check on mouse leave`, () => {
    const onMouseLeave = jest.fn();

    const smallMovieCard = shallow(
        <SmallMovieCard
          movie={movie}
          isPlaying={true}
          onMouseEnter={()=>{}}
          onMouseLeave={onMouseLeave}
        />
    );
    const smallMovie = smallMovieCard.find(`article.small-movie-card`);
    smallMovie.simulate(`mouseleave`);

    expect(onMouseLeave).toHaveBeenCalledTimes(1);
  });

  it(`Check if state changed by hover on the card`, () => {
    const onMouseEnter = jest.fn();

    const smallMovieCard = shallow(
        <SmallMovieCard
          movie={movie}
          onClick={()=>{}}
          isPlaying={true}
          onMouseEnter={onMouseEnter}
          onMouseLeave={()=>{}}
        />
    );
    const card = smallMovieCard.find(`.small-movie-card`);

    card.simulate(`mouseenter`);
    expect(onMouseEnter).toHaveBeenCalledTimes(1);
  });
});
