import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import './index.css';

const actionTypes = { press: "PRESS" };

const Button = ({ button }) => (
  <div
    data-button={button}
    onClick={() => {
      store.dispatch({
        type: actionTypes.press,
        button
      });
    }}
  />
);

const display = () =>
  store.getState().display ||
  store.getState().history ||
  0;

const App = props => [
  <h1 key="display">{display()}</h1>,
  <Button key="1" button="1" />,
  <Button key="2" button="2" />,
  <Button key="3" button="3" />,
  <Button key="4" button="4" />,
  <Button key="5" button="5" />,
  <Button key="7" button="7" />,
  <Button key="8" button="8" />,
  <Button key="9" button="9" />,
  <Button key="0" button="0" />,
  <Button key="-" button="-" />,
  <Button key="+" button="+" />,
  <Button key="×" button="×" />,
  <Button key="÷" button="÷" />,
  <Button key="." button="." />,
  <Button key="=" button="=" />,
  <Button key="c" button="c" />
];

const render = () => {
  ReactDOM.render(
    <App />,
    document.getElementById("root")
  );
};

const initialState = {
  display: null
};

const calculatorReducer = (
  state = initialState,
  action
) => {
  let { display } = state;
  switch (action.button) {
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "7":
    case "8":
    case "9":
    case "0": {
      let newDisplay;
      if (
        display === null ||
        display === "0"
      ) {
        newDisplay = action.button;
      } else {
        newDisplay =
          display + action.button;
      }
      return Object.assign({}, state, {
        display: newDisplay
      });
    }

    case ".": {
      let newDisplay;
      if (display === null) {
        newDisplay = "0.";
      } else if (display.match(".")) {
        return state;
      } else {
        newDisplay = display + ".";
      }
      return Object.assign({}, state, {
        display: newDisplay
      });
    }

    case "-":
    case "+":
    case "×":
    case "÷": {
      //evaluate first
      let newState = evaluate(state);
      newState.operation =
        action.button;
      return newState;
    }

    case "=": {
      //Evaluating
      return evaluate(state);
    }

    case "c": {
      //clear
      return initialState;
    }

    default: {
      return state;
    }
  }
};

function evaluate(state) {
  let {
    history,
    operation,
    display
  } = state;
  if (display === null) {
    return state;
  } else if (history) {
    switch (operation) {
      case "-":
        return {
          history:
            Number(history) -
            Number(display),
          display: null
        };
      case "+":
        return {
          history:
            Number(history) +
            Number(display),
          display: null
        };
      case "×":
        return {
          history:
            Number(history) *
            Number(display),
          display: null
        };
      case "÷":
        if (Number(display) === 0) {
          alert("Can't divide by zero");
          return state;
        } else {
          return {
            history:
              Number(history) /
              Number(display),
            display: null
          };
        }
      default:
        return {
          history: display,
          display: null
        };
    }
  } else {
    return {
      history: display,
      display: null
    };
  }
}

const store = Redux.createStore(
  calculatorReducer
);
store.subscribe(render);
render();
