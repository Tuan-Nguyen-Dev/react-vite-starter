import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './couter/couterSlide'
import userReducer from './user/userSlide'
import appReducer from './app/appSlide'
import blogReducer from './blog/blogSlide'
import { combineReducers } from '@reduxjs/toolkit'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({

    counter: counterReducer,
    user: userReducer,
    blog: blogReducer,
    app: appReducer,

})

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['app']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store)


// export const store = configureStore({
//     reducer: {

//     },
// })



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch