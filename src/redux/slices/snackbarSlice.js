import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    open: false,
    message: '',
    severity : ''
}

const messageAlert = createSlice({
    name: 'messageAlert',
    initialState,
    reducers: {
        showSnackbar(state, action) {
            state.open = true,
            state.message = action?.payload?.message
            state.severity = action?.payload?.severity
        },
        hideSnackbar(state) {
            state.open = false,
            state.message = ''
        },
    },
})

export const { showSnackbar, hideSnackbar } = messageAlert.actions
export default messageAlert.reducer