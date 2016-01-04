/**
 * Utility class has the common utlity methods.
 */

interface IUtility {
    getDistanceBtwnLatLng (passCoords: Object, driverCoords: Object): number;
    startDate(date: Date): Object;
    endDate(date: Date): Object;
    isGreaterThan(): Object;
}

class Utility implements IUtility {
    
    private sDate;
    private eDate;
    
    constructor() {
        
    }
    
    /**
     * getDistanceBtwnLatLng haversine formula to calculate the distance between two coordinates.
     */
    public getDistanceBtwnLatLng = (passCoords, driverCoords) => {
        var R = 6371; // Radius of the earth in km
        
        var dLat = this.deg2rad(passCoords.lat - driverCoords.lat); // this.deg2rad below
        var dLon = this.deg2rad(passCoords.lng - driverCoords.lng);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(driverCoords.lat)) * Math.cos(this.deg2rad(passCoords.lat)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
    }

    private deg2rad = (deg) => {
        return deg * (Math.PI / 180)
    }
    
    /**
     * Method extract Year/Month/Date from the ISOString date format.
     * Then it extract the Hour:Minute:Second.
     */
    private extractDateAndTime = (date) => {
        var dates = date.split('-'),        // First two entity of date format.
            lastDateEntity = dates[2].split('T'),  // Last entity of data format.
            times = lastDateEntity[1].split(':');
            
        return {
            date: [dates[0], dates[1], lastDateEntity[0]],  // Year, Month, Date
            time: [times[0], times[1], times[2]]            // Hours, Minutes, Seconds
        }
            
    }
    
    /**
     * Method act as a setter for setting the start date of the comparision.
     * @param date excepts the start date.
     */
    public startDate = (date) => {
        this.sDate = this.extractDateAndTime(date);
        return this;
    }
    
    /**
     * Method act as a setter for setting the end date of the comparision.
     * @param date excepts the end date.
     */
    public endDate = (date) => {
        this.eDate = this.extractDateAndTime(date);
        return this;
    }
    
    /**
     * 
     */
    private reuse = (start, end, count) => {
        var bool;
        if(start[count] >= end[count]) {
            bool = true;
        } else {
            bool = false;   
        }
        
        return bool;
    }
    
    /**
     * Method take the start date and end date and matches wheather the start date
     * is greather than end date.
     * @return boolean - return true if start date is higher than end date 
     */
    public isGreaterThan = () => {
        var bool, counter = 0;
        Array.prototype.push.apply(this.sDate.date, this.sDate.time); 
        Array.prototype.push.apply(this.eDate.date, this.eDate.time);
        
        if(!this.reuse(this.sDate.date, this.eDate.date, counter)) {
            counter ++;
            this.reuse(this.sDate.date, this.eDate.date, counter);
        } else {
            bool = true;
        }
        
        return this;
    }
}

export = Utility;