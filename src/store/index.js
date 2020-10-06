import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { reducers } from './reducers';
import { createLogger } from 'redux-logger';

let initialState = 
                    {
                        login:{
                                token:null, 
                                message:null,
                                success:null,
                                isLogging:null,
                            },

                        user:{
                            "role": null,
                            "_id": null,
                            "email": null,
                            "first_name": null,
                            "last_name": null,
                            "isDeveloper": null,
                            "schooling": null
                        },
                       
                    }

let logger = createLogger()

export const store = createStore(reducers, initialState, 
                                compose(applyMiddleware(
                                        thunkMiddleware,
                                        logger), window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : f => f) ) 
                                        // window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : f => f) ) 