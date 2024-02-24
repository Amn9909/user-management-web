import { configureStore } from '@reduxjs/toolkit'
import { userManagementApis } from './apis/api'
import { setupListeners } from '@reduxjs/toolkit/query'
import messageAlertReducer from './slices/snackbarSlice'

export const store = configureStore({
  reducer: {
    [userManagementApis.reducerPath]: userManagementApis.reducer,
    messageAlert : messageAlertReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([userManagementApis.middleware]),
})

setupListeners(store.dispatch)