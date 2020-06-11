import React from "react";
import Main from "../main/main.jsx";


const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {mainCardTitle, mainCardGenre, mainCardYear} = props;

  return (
    <Main
      mainCardTitle={mainCardTitle}
      mainCardGenre={mainCardGenre}
      mainCardYear={mainCardYear}
    />
  );
};


export default App;
