/**
 * SearchNearestDriver class locate the nearest driver
 * in respective of passengers current location.
 */

/// <reference path="utility.ts" /> 

import Utilities = require('./Utility');

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
                var passengerTravelingDate = new Date(this.coords.time).toISOString(),
                    driverTravelingDate = result.departureTime.toISOString();
                    
                if(!this.matchDriverTimingWithPassenger(passengerTravelingDate, driverTravelingDate)) return;
                
                distance.push({
                    uid: result.uid,
                    distance: this.getDistanceBtwnLatLng(this.coords, result)
                });
            });
            
            console.log(distance);
            
        });
    }
    
    /**
     * matchDriverTimingWithPassenger method filter the drivers that match the nearest 
     * date and time of queried passengers.
     */
    private matchDriverTimingWithPassenger = (passTiming: String, driverTiming: String) => {
        this.startDate(passTiming).endDate(driverTiming).isGreaterThan();
    }
    
}

module.exports = SearchNearestDriver;



SD - 04:01:2015 10:45
ED - 04-01.2015 10:37