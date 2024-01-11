import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice.js';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({ user: userReducer });

//sets the name of the key, storage and version in the local storage
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // prevent serializibility problems
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);