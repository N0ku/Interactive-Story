import React, { useState } from "react";
import { Canvas } from "react-three-fiber";
import { Loader } from "@react-three/drei";
import Intro from "../../components/scene/Intro";
import Scene1 from "../../components/scene/Scene1";
import DialogueBox from "../../components/DialogueBoxV2";
import InteractionChoices from "../../components/InteractionChoice";
import InfoBox from "../../components/InfoBox";
import { Physics } from "@react-three/rapier";
import { KeyboardControls } from "@react-three/drei";
import OptionTextBox from "../../components/DialogueInteractionChoice";

function GamePlay() {
  const [showElement, ShowElementAction] = useState(false);
  const [currentScene, setCurrentScene] = useState("Intro");
  const [sceneFinished, setSceneFinished] = useState(false);
  const [dialogueFinished, setDialogueFinished] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [infoFinished, setInfoFinished] = useState(false);
  const texts = [
    "",
    "Voici Michelle, une des dernières rescapés de la catastrophe qui à transformer la plupart du monde en zombie.Michelle erre depuis des jours sans but précis. A la recherche de ce qu'il reste de l'humanité.",
    "Après avoir fui une horde de zombie qui la poursuit depuis plusieurs jours, elle cherche désespérément de quoi se nourrir.",
  ];

  function handleSceneChange(scene) {
    setCurrentScene(scene);
    setSceneFinished(false); // Remettre la valeur de la state à false lorsque vous changez de scène
  }

  function handleIntroFinish() {
    setSceneFinished(true); // Mettre la valeur de la state à true lorsque la scène est terminée
  }
  function handleDialogueFinish() {
    setDialogueFinished(true);
  }

  if (dialogueFinished) {
    setCurrentIndex(currentIndex + 1);
    setDialogueFinished(false);
  }
  const handleClick = () => {
    ShowElementAction(!showElement);
   
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
      sceneToRender = (
        <Intro
          onSceneComplete={handleIntroFinish}
          handleClick={handleClick}
          chapterNumber={1}
        />
      );
      choiceCurrentScene = choicesIntro;
      questionCurrentScene = "Aller à la scene 1";
      break;
    case "Scene1":
      sceneToRender = (
        <Scene1 onSceneComplete={handleIntroFinish} handleClick={handleClick} />
      );
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
        <KeyboardControls
          map={[
            { name: "forward", keys: ["KeyW"] },
            { name: "backward", keys: ["KeyS"] },
            { name: "left", keys: ["KeyA"] },
            { name: "right", keys: ["KeyD"] },
          ]}
        >
          <Canvas
            style={{ width: "100%", height: "100%" }}
            onClick={handleClick}
          >
            <Physics
              gravity={[0, -9.82, 0]}
              // timeStep={1 / 60}
              //
            >
              {sceneToRender}
            </Physics>
          </Canvas>
        </KeyboardControls>
        {/* HTML ELEMENT FOR INTERACTION - START */}
        {showElement && (
          <div className="losange-choices-container">
            <InteractionChoices onReturnClick={handleReturnClick} />
          </div>
        )}
        {/* <OptionTextBox
          buttonTexts={["Banane sa mere", "Bouton 2", "Bouton 3", "Bouton 4"]}
          onButtonClick={(buttonIndex) => {
            console.log(`Le bouton ${buttonIndex + 1} a été cliqué`);
          }}
          speed={5}
        /> */}
        <Loader />
        <>
          {texts.map((text, index) => {
            if (index === currentIndex) {
              return (
                <DialogueBox
                  key={index}
                  text={text}
                  speed={10}
                  onInfoComplete={handleDialogueFinish}
                />
              );
            } else {
              return null;
            }
          })}
        </>
        <InfoBox text="Plan Cinématique" speed={10} />
        {nextButton}
        {/* HTML ELEMENT FOR INTERACTION - END */}
      </div>
    </div>
  );
}

export default GamePlay;
