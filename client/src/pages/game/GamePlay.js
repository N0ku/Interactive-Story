import React, { useState } from "react";
import Intro from "../../components/scene/Intro";
import Scene1 from "../../components/scene/Scene1";
import { Canvas } from "react-three-fiber";

function GamePlay() {
  const [currentScene, setCurrentScene] = useState("Intro");
  const [sceneFinished, setSceneFinished] = useState(false);

  function handleSceneChange(scene) {
    setCurrentScene(scene);
    setSceneFinished(false); // Remettre la valeur de la state à false lorsque vous changez de scène
  }

  function handleSceneFinish() {
    setSceneFinished(true); // Mettre la valeur de la state à true lorsque la scène est terminée
  }

  var choicesIntro = [{ id: 1, label: "Scene 1", scene: "Scene1" }];
  var choices = [{ id: 1, label: "Intro", scene: "Intro" }];

  let sceneToRender;
  let choiceCurrentScene = [];
  let questionCurrentScene;
  switch (currentScene) {
    case "Intro":
      sceneToRender = <Intro onSceneComplete={handleSceneFinish} />;
      choiceCurrentScene = choicesIntro;
      questionCurrentScene = "Aller à la scene 1";
      break;
    case "Scene1":
      sceneToRender = <Scene1 onSceneComplete={handleSceneFinish}/>;
      choiceCurrentScene = choices;
      questionCurrentScene = "Aller à l'intro";
      break;
    default:
      sceneToRender = <Intro onSceneComplete={handleSceneFinish} />;
      choiceCurrentScene = choicesIntro;
      questionCurrentScene = "Aller à la scene 1";
  }

  // Afficher le bouton seulement lorsque la scène est terminée
  const nextButton = sceneFinished && (
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
  );

  return (
    <div className="canvas-container">
      <Canvas style={{ width: "100%", height: "100%" }}>{sceneToRender}</Canvas>
      {nextButton}
    </div>
  );
}

export default GamePlay;
