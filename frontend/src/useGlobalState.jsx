import React, { createContext, useReducer, useContext } from 'react';

const StateContext = createContext(null);

export const Provider = ({ children, reducer, initialState }) => {
	return(
		<StateContext.Provider value={useReducer(reducer, initialState)}>
			{ children }
		</StateContext.Provider>
	);
}

export const useGlobalState = () => {
	return useContext(StateContext);
}