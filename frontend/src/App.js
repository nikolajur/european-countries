import React, { useContext, useReducer, useCallback } from "react";
import CountryContext from "./store/country-context";
import Header from "./components/Header/Header";
import Container from "./components/UI/Container";
import { ColorRing } from "react-loader-spinner";
import { motion, AnimatePresence } from "framer-motion";
import Map from "./components/Map/Map";
import Attribution from "./components/Map/Attribution";
import Button from "./components/UI/Button";
import Game from "./components/Game/Game";
import "./App.css";

const defaultAppState = {
  showMap: true,
  showButtons: true,
  activeGame: {
    game: "country",
    question: "POZNÁŠ STÁT PODLE JEHO HRANIC?"
  }
};

/*** reducer function ***/
const appReducer = (state, action) => {
  if (action.type === "HIDE_BUTTONS") {
    return { ...state, showButtons: false };
  }
  if (action.type === "NEXT_GAME") {
    switch (action.game) {
      case "country":
        return {
          activeGame: {
            game: action.game,
            question: action.question
          },
          showMap: true,
          showButtons: true
        };
      case "capital":
        return {
          ...state,
          activeGame: {
            game: action.game,
            question: action.question
          }
        };
      case "flag":
        return {
          ...state,
          showMap: false,
          activeGame: { game: action.game, question: action.question }
        };
      default:
        return {
          ...state,
          activeGame: { game: action.game, question: action.question }
        };
    }
  }
};

/*** component ***/
const App = () => {
  const ctx = useContext(CountryContext);

  const [appState, dispatchAppAction] = useReducer(appReducer, defaultAppState);

  const hideButtonsHandler = useCallback((e) => {
    e.preventDefault();
    dispatchAppAction({ type: "HIDE_BUTTONS" });
  }, []);

  const nextGameHandler = useCallback(
    (game, question) => {
      dispatchAppAction({ type: "NEXT_GAME", game: game, question: question });
      if (game === "country") {
        ctx.fetchCountry();
      }
    },
    [ctx]
  );

  return (
    <motion.div
      className="app"
      animate={{ opacity: 1, transition: { duration: 1, delayChildren: 2 } }}
      initial={{ opacity: 0 }}
    >
      <Header game={appState.activeGame.game} />
      <AnimatePresence mode="wait">
        {appState.showMap && (
          <motion.div
            key="map"
            animate={{ opacity: 1, transition: { duration: 2 } }}
            initial={{ opacity: 0 }}
            exit={{
              opacity: 0,
              x: "100vw",
              transition: { ease: "easeOut", duration: 0.5, delay: 0.5 }
            }}
          >
            <Container type="map">
              {ctx.isLoading && (
                <div className="isLoading">
                  {
                    <ColorRing
                      height="120"
                      width="120"
                      colors={["#25bdb0", "#77c7bf", "#d2d2d2", "#ffb21e", "#e8be74"]}
                    />
                  }
                  <p>ČEKÁM NA DATA Z DATABÁZE...</p>
                  <p>(PRVNÍ NAČTENÍ MŮŽE CHVÍLI TRVAT)</p>
                </div>
              )}

              {ctx.error && (
                <div className="error">
                  <p>SPOJENÍ SE NEPODAŘILO :-(</p>
                  <p>ZKUS, PROSÍM, OBNOVIT STRÁNKU!</p>
                </div>
              )}
              {!ctx.isLoading && !ctx.error && (
                <>
                  <Map showPoints={appState.activeGame.game === "capital" ? true : false} />
                  <Attribution />
                </>
              )}
            </Container>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.h3
        key={appState.activeGame.game}
        animate={{ opacity: 1, transition: { duration: 0.6, delay: 1 } }}
        initial={{ opacity: 0 }}
      >
        {appState.activeGame.question}
      </motion.h3>

      {!ctx.isLoading && !ctx.error && appState.showButtons && (
        <Container type="buttons">
          <Button
            className="btn-orange"
            type="button"
            label="CHCI JINÝ STÁT"
            onClick={ctx.fetchCountry}
          ></Button>
          <Button
            focus={true}
            className="btn-blue"
            type="button"
            label="JDU NA TO!"
            onClick={hideButtonsHandler}
          ></Button>
        </Container>
      )}

      {!appState.showButtons && (
        <Container type="game">
          <Game game={appState.activeGame.game} onNext={nextGameHandler} />
        </Container>
      )}
    </motion.div>
  );
};

export default App;
