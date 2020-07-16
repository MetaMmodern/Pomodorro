import React from "react";
import "./App.scss";
import CircleTimer from "./components/CircleTimer/CircleTimer";

class App extends React.Component {
  render() {
    console.log(this.state);
    return (
      <div className="App">
        <CircleTimer />
      </div>
    );
  }
}

export default App;
