import {configureStore} from '@reduxjs/toolkit'
import screenReducer from './screens/reducer'
import errorsReducer from './errors/reducer'

export default configureStore({
  reducer: {
    screens: screenReducer,
    errors: errorsReducer,
  },
})
