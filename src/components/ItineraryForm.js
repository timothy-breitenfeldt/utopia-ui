"use strict"
import React from 'react';
import PropTypes from 'prop-types';

export class ItineraryCounterForm extends React.Component{

    componentDidMount(){
        console.log(this.props.itinerary);
    }
}

ItineraryCounterForm.propTypes={
    itinerary: PropTypes.object.isRequired
}