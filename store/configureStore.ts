import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import entitesReducer from './entities'
import auth from './middleware/auth'
import NajahApi from './middleware/NajahApi'
import api from './middleware/api'

export default () => {
    return configureStore({
        reducer: entitesReducer,
        middleware:[...getDefaultMiddleware(),auth, NajahApi, api]
    })
}