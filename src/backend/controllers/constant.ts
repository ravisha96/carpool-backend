interface IUrl {
    confirmPassenger: String
}

interface IPushNotification { url: IUrl };

interface IPassenger {
    onSuccessPushNotification: String,
    onFailRegistration: String,
}

interface IDriver { }

interface IMessages {
    passenger: IPassenger,
    driver: IDriver
};

interface IConstants {
    messages: IMessages,
    pushNotification: IPushNotification
};


/**
 * Constants 
 */
class Constants {
    public constants: IConstants;
    constructor() {
        this.constants = {
            messages: {
                passenger: {
                    onSuccessPushNotification: 'succesfully sent your query to driver please wait for confirmation',
                    onFailRegistration: 'unable to register passenger query'
                },

                driver: {

                }
            },

            pushNotification: {
                url: {
                    confirmPassenger: 'confirmPassenger'
                }
            }
        }
    }
}

module.exports = new Constants();