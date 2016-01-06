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
    private Promise = require('q');
    private und = require('underscore');  // underscore library
    
    constructor(public coords) {
        super();
    }
    
    /**
     * fetchDriversLocation method make a DB call to retrive all the drivers list.
     */
    public fetchDriversLocation = () => {
        var distance = [],
            defer = this.Promise.defer(),
            _ = this.und;

            this.driversCurrentLocSchema.find((err, results) => {
                _.forEach(results, (result) => {

                    if (!this.getDriversTravellingOnSameDate(new Date(this.coords.time), new Date(result.departureTime))) return;
                    result._doc.distance = this.getDistanceBtwnLatLng(this.coords.boarding, result);
                    
                    /**
                     * If the calculated distance is more than the radius ignore it.
                     */
                    if(result._doc.distance <= this.coords.radius) {
                        distance.push(result._doc);   
                    }
                });
                
                defer.resolve(distance);
            });
            
            return defer.promise;
    }
    
    /**
     * getDriversTravellingOnSameDate method filter the drivers those who are 
     * travelling on same date as request by passenger.
     * @param passTiming - passenger date of travelling.
     * @param driverTiming - driver date of travelling.
     */
    private getDriversTravellingOnSameDate = (passTiming: Date, driverTiming: Date) => {
        return this.startDate(passTiming).endDate(driverTiming).isSameDate();
    }

}

module.exports = SearchNearestDriver;