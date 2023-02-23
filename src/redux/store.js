import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  PERSIST,
  REHYDRATE,
  FLUSH,
  PAUSE,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import userReducer from './users/userSlice';

import userApiSlice from './users/userApiSLice';
import listsApiSlice from './lists/listsApiSlice';
import cardsApiSlice from './cards/cardsApiSlice';

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  userApiSlice.middleware,
  listsApiSlice.middleware,
  cardsApiSlice.middleware,
];

const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['token'],
};
export const store = configureStore({
  reducer: {
    auth: persistReducer(userPersistConfig, userReducer),
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [listsApiSlice.reducerPath]: listsApiSlice.reducer,
    [cardsApiSlice.reducerPath]: cardsApiSlice.reducer,
  },
  middleware,
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
