import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Tabs from "./tabs.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const comments = [
  {
    "id": 1,
    "user": {
      "id": 4,
      "name": `Kate Muir`
    },
    "rating": 8.9,
    "comment": `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
    "date": `2019-05-08T14:13:56.569Z`
  },
];
const movie = {
  id: 1,
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  cardImg: `../../img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  genre: `Drama`,
  year: 2014,
  backgroundImg: `img/bg-the-grand-budapest-hotel.jpg`,
  posterImg: `img/the-grand-budapest-hotel-poster.jpg`,
  rating: 3,
  ratingCount: 40,
  description: `chief suspect in her murder.`,
  director: `Wes Andreson`,
  starring: [`Bill Murray`, `Edward Norton`],
  preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  runTime: 125,
  videoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
};

it(`Check if state changes by click on details and rended MoviePageDetails component`, () => {
  const handleActive = jest.fn();

  const tabsComponent = mount(
      <Tabs
        comments={comments}
        movie={movie}
        activeItem={`Overview`}
        handleActive={handleActive}
      />
  );
  const tabs = tabsComponent.find(`.movie-nav__item`);
  const detailsTab = tabs.at(1);

  detailsTab.simulate(`click`);
  expect(handleActive.mock.calls.length).toBe(1);
});
