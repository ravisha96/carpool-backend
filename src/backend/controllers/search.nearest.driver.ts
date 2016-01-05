/**
 * SearchNearestDriver class locate the nearest driver
 * in respective of passengers current location.
 */

/// <reference path="utility.ts" /> 

import Utilities = require('./utility');

interface ISearchNearestDriver {
    
}

class SearchNearestDriver extends Utilities {
    
    private driversCurrentLocSchema = require('../models/update.current.location.schema');
    private _und = require ('underscore');  // underscore library
    
    constructor(public coords) {
        super();
        this.fetchDriversLocation();
    }
    
    /**
     * fetchDriversLocation method make a DB call to retrive all the drivers list.
     */
    private fetchDriversLocation = () => {
        var distance = [],
            _ = this._und;
        this.driversCurrentLocSchema.find( (err, results) => {
            _.forEach(results, (result) => {
                /**
                 * Setting both date on same format.
                 */
                var passengerTravelingDate = new Date(this.coords.time),
                    driverTravelingDate = new Date(result.departureTime);
                    
                if(!this.matchDriverTimingWithPassenger(passengerTravelingDate.toISOString(), driverTravelingDate.toISOString())) return;
                result._doc.distance = this.getDistanceBtwnLatLng(this.coords.boarding, result);
                distance.push(result._doc);
            });
            
            return distance;
            
        });
    }
    
    /**
     * matchDriverTimingWithPassenger method filter the drivers that match the nearest 
     * date and time of queried passengers.
     */
    private matchDriverTimingWithPassenger = (passTiming: String, driverTiming: String) => {
        return this.startDate(passTiming).endDate(driverTiming).isGreaterThanEqual();
    }
    
}

module.exports = SearchNearestDriver;