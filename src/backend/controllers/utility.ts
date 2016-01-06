/**
 * Utility class has the common utlity methods.
 */

interface IUtility {
    getDistanceBtwnLatLng (passCoords: Object, driverCoords: Object): number;
    startDate(date: Date): Object;
    endDate(date: Date): Object;
    isGreaterThan(): Boolean;
    isGreaterThanEqual(): Boolean;
    isLessThan(): Boolean;
    isLessThanEqual(): Boolean;
    isSameDate(): Boolean;
}

class Utility implements IUtility {
    
    private sDate: Date;
    private eDate: Date;
    
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
     * Method act as a setter for setting the start date of the comparision.
     * @param date excepts the start date.
     */
    public startDate = (date) => {
        this.sDate = new Date(date);
        return this;
    }
    
    /**
     * Method act as a setter for setting the end date of the comparision.
     * @param date excepts the end date.
     */
    public endDate = (date) => {
        this.eDate = new Date(date);
        return this;
    }
    
    public isSameDate = () => {
        return (this.sDate.getFullYear() === this.eDate.getFullYear() && this.sDate.getDate() === this.eDate.getDate());
    }
    
    /**
     * Helper methods which check star date is less than or greater than or equal
     * to each other.
     */
    public isGreaterThan = () => {
        return this.sDate.getTime() > this.eDate.getTime();
    }
    
    public isGreaterThanEqual = () => {
        return this.sDate.getTime() >= this.eDate.getTime();
    }
    
    public isLessThan = () => {
        return this.sDate.getTime() < this.eDate.getTime();
    }
    
    public isLessThanEqual = () => {
        return this.sDate.getTime() <= this.eDate.getTime();
    }
}

export = Utility;