import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import entitesReducer from './entities'
import api from './middleware/api'

export default () => {
    return configureStore({
        reducer: entitesReducer,
        middleware:[...getDefaultMiddleware(),api]
    })
}