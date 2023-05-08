import React, { useRef, useReducer, forwardRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

import Button from "../UI/Button";

import classes from "./InputFormGame.module.css";

/*** REDUCER default & function ***/
const defaultSearchState = {
  search: "",
  showAutocomplete: false,
  matchOptions: [],
  highlightedOption: -1
};

const searchReducer = (state, action) => {
  const prevHighlightedOption = state.highlightedOption;
  switch (action.type) {
    case "SET_DEFAULT_VALUES":
      return defaultSearchState;
    case "SHOW_AUTOCOMPLETE":
      return { ...state, showAutocomplete: true };
    case "HIDE_AUTOCOMPLETE":
      return { ...state, showAutocomplete: false };
    case "HANDLE_TYPED_VALUE":
      return {
        ...state,
        search: action.searchValue,
        matchOptions: action.matchOptions,
        showAutocomplete: true
      };
    case "HANDLE_CLICKED_VALUE":
      return {
        ...state,
        search: action.searchValue,
        showAutocomplete: false,
        highlightedOption: -1
      };
    case "HANDLE_ENTER_SELECTED_VALUE":
      return {
        ...state,
        search: state.matchOptions[prevHighlightedOption][action.game].toUpperCase(),
        highlightedOption: -1,
        showAutocomplete: false
      };
    case "RESET_HIGHLIGHTED":
      return {
        ...state,
        highlightedOption: -1
      };
    case "INCREASE_HIGHLIGHTED":
      return {
        ...state,
        highlightedOption: prevHighlightedOption + 1
      };
    case "DECREASE_HIGHLIGHTED":
      return {
        ...state,
        highlightedOption: prevHighlightedOption - 1
      };
    case "SET_LAST_HIGHLIGHTED":
      return {
        ...state,
        highlightedOption: state.matchOptions.length - 1
      };
    case "HIDE_AUTOCOMPLETE_RESET_HIGHLIGHTED":
      return {
        ...state,
        showAutocomplete: false,
        highlightedOption: -1
      };
    default:
      return defaultSearchState;
  }
};

/*** component ***/
const InputFormGame = forwardRef(function InputFormGame(props, inputRef) {
  const [searchState, dispatchSearchAction] = useReducer(searchReducer, defaultSearchState);

  const formRef = useRef();

  const { game, gameData, onSubmitAnswer } = props;

  const onFocusHandler = useCallback(
    (e) => {
      if (searchState.matchOptions.length > 0) {
        dispatchSearchAction({ type: "SHOW_AUTOCOMPLETE" });
      }
    },
    [searchState.matchOptions]
  );

  const onTypingHandler = useCallback(
    (e) => {
      if (e.target.value === "") {
        dispatchSearchAction({ type: "SET_DEFAULT_VALUES" });
        return;
      }
      const filteredArray = gameData.filter((option) => {
        return option[game]
          .substring(0, e.target.value.length)
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });

      dispatchSearchAction({
        type: "HANDLE_TYPED_VALUE",
        searchValue: e.target.value.toUpperCase(),
        matchOptions: filteredArray
      });
    },
    [gameData, game]
  );

  const onSelectHandler = useCallback((e) => {
    dispatchSearchAction({
      type: "HANDLE_CLICKED_VALUE",
      searchValue: e.target.innerText.toUpperCase()
    });
  }, []);

  const onKeyDownHandler = useCallback(
    (e) => {
      if (searchState.matchOptions.length === 0) {
        return;
      }

      if (e.code === "ArrowDown") {
        if (searchState.highlightedOption === searchState.matchOptions.length - 1) {
          dispatchSearchAction({ type: "RESET_HIGHLIGHTED" });
        } else {
          dispatchSearchAction({ type: "INCREASE_HIGHLIGHTED" });
        }
      }
      if (e.code === "ArrowUp") {
        if (searchState.highlightedOption === -1) {
          dispatchSearchAction({ type: "SET_LAST_HIGHLIGHTED" });
        } else {
          dispatchSearchAction({ type: "DECREASE_HIGHLIGHTED" });
        }
      }
      if (e.code === "Enter" || e.code === "NumpadEnter") {
        e.preventDefault();

        if (searchState.showAutocomplete && searchState.highlightedOption > -1) {
          dispatchSearchAction({ type: "HANDLE_ENTER_SELECTED_VALUE", game: game });
        } else if (searchState.showAutocomplete && searchState.highlightedOption === -1) {
          dispatchSearchAction({ type: "HIDE_AUTOCOMPLETE" });
        }
      }
      if (e.code === "Tab") {
        if (searchState.showAutocomplete) {
          dispatchSearchAction({ type: "HIDE_AUTOCOMPLETE_RESET_HIGHLIGHTED" });
        }
      }
    },
    [game, searchState.matchOptions, searchState.highlightedOption, searchState.showAutocomplete]
  );

  const onMouseOverFormHandler = useCallback((e) => {
    dispatchSearchAction({ type: "RESET_HIGHLIGHTED" });
  }, []);

  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      onSubmitAnswer(searchState.search);
      dispatchSearchAction({ type: "SET_DEFAULT_VALUES" });
    },
    [onSubmitAnswer, searchState.search]
  );

  useEffect(() => {
    const onClickOutsideHandler = (e) => {
      const form = formRef.current;
      if (form && !form.contains(e.target)) {
        dispatchSearchAction({ type: "HIDE_AUTOCOMPLETE_RESET_HIGHLIGHTED" });
      }
    };
    window.addEventListener("mousedown", onClickOutsideHandler);
    return () => {
      window.removeEventListener("mousedown", onClickOutsideHandler);
    };
  }, [formRef]);

  return (
    <motion.form
      ref={formRef}
      key="inputGame"
      autoComplete="off"
      className={classes["form-input"]}
      onSubmit={onSubmitHandler}
      animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
      initial={{ opacity: 0, x: "-100vw" }}
      exit={{ opacity: 0, x: "100vw", transition: { ease: "easeOut", duration: 0.5, delay: 0.5 } }}
    >
      <div className={classes.autocomplete}>
        <input
          autoFocus
          ref={inputRef}
          id="user-input"
          type="text"
          name="user-input"
          placeholder={props.hint}
          onFocus={onFocusHandler}
          onChange={onTypingHandler}
          onKeyDown={onKeyDownHandler}
          value={searchState.search}
        ></input>
        {searchState.showAutocomplete && (
          <div onMouseOver={onMouseOverFormHandler}>
            {searchState.matchOptions.map((matchItem, i) => {
              return (
                <div
                  key={matchItem.id}
                  onClick={onSelectHandler}
                  className={`${classes["autocomplete-item"]} ${
                    i === searchState.highlightedOption ? classes["autocomplete-active"] : ""
                  }`}
                >
                  <strong>
                    {matchItem[game].substring(0, searchState.search.length).toUpperCase()}
                  </strong>
                  {matchItem[game].substring(searchState.search.length).toUpperCase()}
                </div>
              );
            })}
          </div>
        )}
      </div>
      {!searchState.showAutocomplete && searchState.search && (
        <Button type="submit" label="ODESLAT" className="btn-blue" focus={true} />
      )}
    </motion.form>
  );
});

export default InputFormGame;
