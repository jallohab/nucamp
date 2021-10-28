// import { createStore } from "redux";
// import { Reducer, initialState } from "./reducer";

// export const ConfigureStore = () => {
//   const store = createStore(Reducer, initialState);

//   return store;
// };

import { createStore, combineReducers } from "redux";
import { Campsites } from "./campsites";
import { Comments } from "./comments";
import { Partners } from "./partners";
import { Promotions } from "./promotions";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      campsites: Campsites,
      comments: Comments,
      partners: Partners,
      promotions: Promotions,
    })
  );

  return store;
};
