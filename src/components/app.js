"use strict"

import React from 'react';
import {Switch, Route} from 'react-router-dom';

import {Header} from './header.js';
import {Home} from './home.js';

export class App extends React.Component{

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        return(
            <div>
                <Header />
                <Switch>
                    <Route exact path='/home' component={Home}/>
                    <Route
                        path='/path/1' render={ (props) => (
                            <div>
                                <COMPONENT/>
                            </div>
                        )}
                    />
                    <Route
                        path='/path/2' render={ (props) => (
                            <div>
                              <COMPONENT/>
                          </div>
                        )}
                    />
                </Switch>
            </div>
        );
    }

    componentDidMount(){
        COMPONENT.addChangeListener(this._onBookChange.bind(this));
        COMPONENT.addChangeListener(this._onAuthorChange.bind(this));
    }

    componentWillUnmount(){
        COMPONENT.removeChangeListener(this._onBookChange.bind(this));
        COMPONENT.removeChangeListener(this._onAuthorChange.bind(this));
    }

    _onCOMPONENT_1Change(){
        this.setState({ key: COMPONENT.getAllValues() });
    }

    _onCOMPONENT_2Change(){
        this.setState({ key: COMPONENT.getAllValues() });
    }


}
