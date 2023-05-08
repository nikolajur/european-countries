import React, { useState, useContext, useMemo, useCallback, useRef } from "react";
import CountryContext from "../../store/country-context";
import GameWrapper from "./GameWrapper";
import InputFormGame from "./InputFormGame";
import RadioButtonGame from "./RadioButtonGame";
import SelectOptionsGame from "./SelectOptionsGame";
import PopUp from "../Modal/PopUp";
import countries from "../../data/countries.json";
import capitals from "../../data/capitals.json";
import cntrCodes from "../../data/cntrCodes.json";
import populationCategories from "../../data/populationCategories.json";
import areaCategories from "../../data/areaCategories.json";
import { serveArrayOfFour, shuffleArrayOfFour, sortNumbers } from "../../helpers/randomNumbers";
import { AnimatePresence } from "framer-motion";

const Game = (props) => {
  const [answer, setAnswer] = useState({ ok: null, msg: null });
  const [showModal, setShowModal] = useState(false);

  const ctx = useContext(CountryContext);

  const inputRef = useRef();
  const firstFlagRef = useRef();
  const firstCategRef = useRef();

  const checkAnswerHandler = useCallback(
    (guess) => {
      if (typeof guess === "string") {
        if (ctx[props.game].toUpperCase() === guess.toUpperCase().trim()) {
          setAnswer({ ok: true, msg: "SPRÁVNĚ!" });
        } else {
          setAnswer({ ok: false, msg: "TO NENÍ SPRÁVNÁ ODPOVĚĎ!" });
        }
      }
      if (typeof guess === "number") {
        if (ctx[props.game] === guess) {
          setAnswer({ ok: true, msg: "SPRÁVNĚ!" });
        } else {
          setAnswer({ ok: false, msg: "TO NENÍ SPRÁVNÁ ODPOVĚĎ!" });
        }
      }
      setShowModal(true);
    },
    [props.game, ctx]
  );

  const closeModalHandler = useCallback(() => {
    setShowModal(false);

    switch (props.game) {
      case "country":
        inputRef.current.focus();
        break;
      case "capital":
        inputRef.current.focus();
        break;
      case "flag":
        firstFlagRef.current.focus();
        break;
      case "population":
        firstCategRef.current.focus();
        break;
      case "area":
        firstCategRef.current.focus();
        break;
      default:
        break;
    }
  }, [props.game]);

  const [nextGame, nextQuestion, okBtnText, correctAnswer, gameComponents] = useMemo(() => {
    let optionsArray;
    let categsArray;
    let nextGame;
    let nextQuestion;
    let okBtnText;
    let correctAnswer;
    let gameComponents;

    switch (props.game) {
      case "country":
        nextGame = "capital";
        nextQuestion = "ZNÁŠ HLAVNÍ MĚSTO?";
        okBtnText = "HÁDAT HLAVNÍ MĚSTO";
        correctAnswer = ctx.country.toUpperCase();
        gameComponents = (
          <InputFormGame
            ref={inputRef}
            game={props.game}
            gameData={countries}
            hint="stát s diakritikou"
            onSubmitAnswer={checkAnswerHandler}
          />
        );
        break;
      case "capital":
        nextGame = "flag";
        nextQuestion = "POZNÁŠ VLAJKU?";
        okBtnText = "HÁDAT VLAJKU";
        correctAnswer = ctx.capital.toUpperCase();
        gameComponents = (
          <InputFormGame
            ref={inputRef}
            game={props.game}
            gameData={capitals}
            hint="hlavní město s diakritikou"
            onSubmitAnswer={checkAnswerHandler}
          />
        );
        break;
      case "flag":
        nextGame = "population";
        nextQuestion = "VÍŠ, KOLIK ZDE ŽIJE OBYVATEL?";
        okBtnText = "HÁDAT POČET OBYVATEL";
        correctAnswer = <img src={`https://flagcdn.com/h80/${ctx.flag}.png`} alt="flag" />;
        optionsArray = shuffleArrayOfFour(serveArrayOfFour(ctx.flag, cntrCodes, 43));
        gameComponents = (
          <RadioButtonGame
            ref={firstFlagRef}
            gameData={cntrCodes}
            optionsArray={optionsArray}
            onSubmitAnswer={checkAnswerHandler}
          />
        );
        break;
      case "population":
        nextGame = "area";
        nextQuestion = "VÍŠ, JAKOU MÁ STÁT ROZLOHU?";
        okBtnText = "HÁDAT ROZLOHU";
        correctAnswer = populationCategories[ctx.population];

        categsArray = [...Array(12).keys()];
        categsArray.shift();
        optionsArray = sortNumbers(serveArrayOfFour(ctx.population, categsArray, 10));
        gameComponents = (
          <SelectOptionsGame
            ref={firstCategRef}
            game={props.game}
            gameData={populationCategories}
            optionsArray={optionsArray}
            onSubmitAnswer={checkAnswerHandler}
          />
        );
        break;
      case "area":
        nextGame = "country";
        nextQuestion = "POZNÁŠ STÁT PODLE JEHO HRANIC?";
        correctAnswer = areaCategories[ctx.area];
        categsArray = [...Array(11).keys()];
        categsArray.shift();
        optionsArray = sortNumbers(serveArrayOfFour(ctx.area, categsArray, 9));
        gameComponents = (
          <SelectOptionsGame
            ref={firstCategRef}
            game={props.game}
            gameData={areaCategories}
            optionsArray={optionsArray}
            onSubmitAnswer={checkAnswerHandler}
          />
        );
        break;
      default:
        break;
    }

    return [nextGame, nextQuestion, okBtnText, correctAnswer, gameComponents];
  }, [props.game, ctx, checkAnswerHandler]);

  return (
    <>
      <GameWrapper game={props.game}>{gameComponents}</GameWrapper>

      <AnimatePresence mode="wait">
        {showModal && (
          <PopUp
            onClose={closeModalHandler}
            ok={answer.ok}
            msg={answer.msg}
            answer={correctAnswer}
            onNext={props.onNext}
            game={props.game}
            nextGame={nextGame}
            question={nextQuestion}
            btnLabel={okBtnText}
            wiki={ctx.wiki}
          ></PopUp>
        )}
      </AnimatePresence>
    </>
  );
};

export default Game;
