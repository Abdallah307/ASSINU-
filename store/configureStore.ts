import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import entitesReducer from './entities'
import api from './middleware/api'
import auth from './middleware/auth'
import NajahApi from './middleware/NajahApi'

export default () => {
    return configureStore({
        reducer: entitesReducer,
        middleware:[...getDefaultMiddleware(),auth, NajahApi, api]
    })
}