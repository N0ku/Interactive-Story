import React, { useState } from "react";
import { Canvas } from "react-three-fiber";
import { Loader } from "@react-three/drei";
import Intro from "../../components/scene/Intro";
import Scene1 from "../../components/scene/Scene1";
import DialogueBox from "../../components/DialogueBoxV2";
import InteractionChoices from "../../components/InteractionChoice";
import InfoBox from '../../components/InfoBox';
import { Physics, Debug, RigidBody } from "@react-three/rapier";
import { KeyboardControls } from "@react-three/drei";
import OptionTextBox from "../../components/DialogueInteractionChoice";



//TODO 1 -Thomas - 2021-03-28 - Add LOD (Level Of Detail) - Display the appropriate level of detail based on the distance between the camera and the model to reduce the GPU workload.
//TODO 2 -Thomas - 2021-03-28 - Add Occlusion Frustum - Display the occlusion frustum based on the view camera versus the world, remove if camera don't see him.
//TODO 3 -Thomas - 2021-03-28 - Modify pixel ratio. Gain 10 fps when using low resolution.
//TODO 4 -Thomas - 2021-03-28 - Desactivate AntiAliasing. Hard graphic downgrade. gain 20/30 fps when using low resolution.

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
      sceneToRender = <Scene1 onSceneComplete={handleIntroFinish} />;
      choiceCurrentScene = choices;
      questionCurrentScene = "Aller à l'intro";
      break;
    default:
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
