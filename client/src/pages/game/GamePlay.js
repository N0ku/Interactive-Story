import React, { useState } from "react";
import Intro from "../../components/scene/Intro";
import Scene1 from "../../components/scene/Scene1";
import { Canvas } from "react-three-fiber";

function GamePlay() {
  const [currentScene, setCurrentScene] = useState("Intro");
  function handleSceneChange(scene) {
    console.log(scene);
    setCurrentScene(scene);
  }
  var choicesIntro = [{ id: 1, label: "Scene 1", scene: "Scene1" }];
  var choices = [{ id: 1, label: "Intro", scene: "Intro" }];

  let sceneToRender;
  let choiceCurrentScene = [];
  let questionCurrentScene;
  switch (currentScene) {
    case "Intro":
      sceneToRender = <Intro />;
      choiceCurrentScene = choicesIntro;
      questionCurrentScene = "Aller à la scene 1";
      break;
    case "Scene1":
      sceneToRender = <Scene1 />;
      choiceCurrentScene = choices;
      questionCurrentScene = "Aller à l'intro";
      break;
    default:
      sceneToRender = <Intro />;
      choiceCurrentScene = choicesIntro;
      questionCurrentScene = "Aller à la scene 1";
  }
  return (
    <div className="canvas-container">
      {" "}
      <Canvas style={{ width: "100%", height: "100%" }}>{sceneToRender}</Canvas>
      <div className="boxButton">
        {questionCurrentScene}
        {choiceCurrentScene.map((choice) => (
          <button
            key={choice.id}
            className="buttonChoice"
            onClick={() => {
              handleSceneChange(choice.scene);
            }}
          >
            {choice.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default GamePlay;
