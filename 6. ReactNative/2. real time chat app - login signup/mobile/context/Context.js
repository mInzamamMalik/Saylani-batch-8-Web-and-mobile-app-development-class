import React, { createContext, useReducer } from 'react'
import { reducer } from './Reducer';


let data = {
  darkTheme: true,
  user: {},
  isLogin: null,
  baseUrl: "https://ec9d-175-107-203-27.ngrok.io"
}


export default function ContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, data)
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const GlobalContext = createContext({ state: data, dispatch: null });

