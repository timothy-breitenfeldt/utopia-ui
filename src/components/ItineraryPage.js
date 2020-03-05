'use strict'
import React from 'react';
import PropTypes from 'prop-types';

export class ItineraryPage extends React.Component{

    componentDidMount(){
        console.log(this.props.itineraryId);
    }
    render(){
        return( <p>Oh?!</p>);
    }
}

ItineraryPage.propTypes={
    itineraryId: PropTypes.number.isRequired
}