import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Tabs from "./tabs.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});
const reviews = [
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
  rating: `6,3`,
  ratingCount: 40,
  description: `chief suspect in her murder.`,
  director: `Wes Andreson`,
  starring: [`Bill Murray`, `Edward Norton`],
  preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  runTime: 125
};

it(`Check if state changes by click on details and rended MoviePageDetails component`, () => {

  const tabsComponent = mount(
      <Tabs
        reviews={reviews}
        movie={movie}
      />
  );
  const tabs = tabsComponent.find(`.movie-nav__item`);
  const detailsTab = tabs.at(1);

  detailsTab.simulate(`click`);
  expect(tabsComponent.state().activePage).toBe(`Details`);
  expect(tabsComponent.find(`MoviePageDetails`).length).toBe(1);
  expect(tabsComponent.find(`MoviePageReviews`).length).toBe(0);
  expect(tabsComponent.find(`MoviePageOverview`).length).toBe(0);
});

it(`Check if state changes by click on reviews and rended MoviePageReviews component`, () => {

  const tabsComponent = mount(
      <Tabs
        reviews={reviews}
        movie={movie}
      />
  );
  const tabs = tabsComponent.find(`.movie-nav__item`);
  const detailsTab = tabs.at(2);

  detailsTab.simulate(`click`);
  expect(tabsComponent.state().activePage).toBe(`Reviews`);
  expect(tabsComponent.find(`MoviePageDetails`).length).toBe(0);
  expect(tabsComponent.find(`MoviePageReviews`).length).toBe(1);
  expect(tabsComponent.find(`MoviePageOverview`).length).toBe(0);
});
