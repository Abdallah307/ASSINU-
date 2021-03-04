import {configureStore} from '@reduxjs/toolkit'
import entitesReducer from './entities'

export default () => {
    return configureStore({
        reducer: entitesReducer
    })
}