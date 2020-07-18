import React from "react";
import "./App.scss";
import NavBar from "./components/NavBar/NavBar";
import TimerSection from "./components/TimerSection/TimerSection";

function App(props) {
  return (
    <div className="App">
      <NavBar />
      <TimerSection />

      {/* <Header />
      <ToDoItem /> */}

      {/* <SideBar />
      <Footer /> */}
    </div>
  );
}

export default App;
