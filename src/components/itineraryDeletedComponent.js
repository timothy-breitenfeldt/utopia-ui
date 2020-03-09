
import React from "react";
import Alert from 'react-bootstrap/Alert';

export const ItineraryDeletedComponent = () => {
    return(
        <div>
            <Alert variant='danger'>
                Itinerary has been canceled.
            </Alert>
        </div>
    );
}