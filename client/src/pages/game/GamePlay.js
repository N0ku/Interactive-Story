import React, { useState } from "react";
import { Canvas } from "react-three-fiber";
import { Loader } from "@react-three/drei";
import Intro from "../../components/scene/Intro";
import Scene1 from "../../components/scene/Scene1";
import DialogueBox from "../../components/DialogueBoxV2";
import InteractionChoices from "../../components/InteractionChoice";
import InfoBox from "../../components/InfoBox";
import OptionTextBox from "../../components/DialogueInteractionChoice";

function GamePlay() {
  const [showElement, ShowElementAction] = useState(false);
  const [currentScene, setCurrentScene] = useState("Intro");
  const [sceneFinished, setSceneFinished] = useState(false);

  function handleSceneChange(scene) {
    setCurrentScene(scene);
    setSceneFinished(false); // Remettre la valeur de la state à false lorsque vous changez de scène
  }

  function handleIntroFinish() {
    setSceneFinished(true); // Mettre la valeur de la state à true lorsque la scène est terminée
  }
  const handleClick = () => {
    ShowElementAction(!showElement);
    console.log(showElement);
  };

  const handleReturnClick = (value) => {
    ShowElementAction(value);
  };

  var choicesIntro = [{ id: 1, label: "Scene 1", scene: "Scene1" }];
  var choices = [{ id: 1, label: "Intro", scene: "Intro" }];

  let sceneToRender;
  let choiceCurrentScene = [];
  let questionCurrentScene;
  switch (currentScene) {
    case "Intro":
      sceneToRender = <Intro onSceneComplete={handleIntroFinish} />;
      choiceCurrentScene = choicesIntro;
      questionCurrentScene = "Aller à la scene 1";
      break;
    case "Scene1":
      sceneToRender = <Scene1 />;
      choiceCurrentScene = choices;
      questionCurrentScene = "Aller à l'intro";
      break;
    default:
      sceneToRender = <Intro onSceneComplete={handleIntroFinish} />;
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
    <div className="App">
      <div className="canvas-container">
        <Canvas style={{ width: "100%", height: "100%" }} onClick={handleClick}>
          {sceneToRender}
        </Canvas>
        {/* HTML ELEMENT FOR INTERACTION - START */}
        {showElement && (
          <div className="losange-choices-container">
            <InteractionChoices onReturnClick={handleReturnClick} />
          </div>
        )}
        <OptionTextBox
          buttonTexts={["Banane sa mere", "Bouton 2", "Bouton 3", "Bouton 4"]}
          onButtonClick={(buttonIndex) => {
            console.log(`Le bouton ${buttonIndex + 1} a été cliqué`);
          }}
          speed={5}
        />
        <Loader />
        <DialogueBox text="ParoleDescriptif" speed={10} />
        <InfoBox text="InfoBox" speed={10} />
        {nextButton}
        {/* HTML ELEMENT FOR INTERACTION - END */}
      </div>
    </div>
  );
}

export default GamePlay;
