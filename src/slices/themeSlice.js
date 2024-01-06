import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    theme:
    localStorage.getItem("theme") ? 
    localStorage.getItem("theme") : 
    'light' && localStorage.setItem('theme', 'light'),
}

const themeSlice = createSlice({
    name:'theme',
    initialState:initialState,
    reducers:{
        setTheme (state, value){
            state.theme = value.payload;
            localStorage.setItem('theme', (value.payload));
        },
    }
})

export const { setTheme } = themeSlice.actions
export default themeSlice.reducer