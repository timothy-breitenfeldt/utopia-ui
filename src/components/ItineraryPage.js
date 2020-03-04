'use strict'
import React from 'react';
import PropTypes from 'prop-types';

export class ItineraryPage extends React.Component{

    componentDidMount(){
        console.log("itineraryPage mounted");
        console.log(this.props.itinerary);
    }
}

ItineraryPage.propTypes={
    itinerary: PropTypes.object.isRequired
}