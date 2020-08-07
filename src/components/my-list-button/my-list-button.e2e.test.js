import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {MyListButton} from "./my-list-button.jsx";

Enzyme.configure({
  adapter: new Adapter()
});

const movie = {
  id: 1,
  title: `Aviator`,
  cardImg: `../../img/aviator.jpg`,
  genre: `Comedy`,
  year: 1988,
  backgroundImg: `img/bg-the-grand-budapest-hotel.jpg`,
  posterImg: `img/the-grand-budapest-hotel-poster.jpg`,
  rating: 5,
  ratingCount: 188,
  description: `hief suspect in her murder.`,
  director: `Leo Dicaprio`,
  starring: [`ldblum`],
  preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  runTime: 125,
  videoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  isFavorite: true,
};

it(`Click add on my-list button`, () => {
  const onMyListClick = jest.fn();

  const myListButton = shallow(
      <MyListButton
        movie={movie}
        onMyListClick={onMyListClick}
        isMainCardUpdate={false}
      />
  );

  myListButton.find(`button.btn--list`).simulate(`click`);
  expect(onMyListClick).toHaveBeenCalledTimes(1);
  expect(onMyListClick).toHaveBeenNthCalledWith(1, 1, true, false);
});
