class MessageGenerator {
    constructor(guest, company, template) {
        this.template = template;
        this.company = company;
        this.guest = guest;
        this.message = this.generateMessage();
    }

    generateMessage() {
        const greeting = this.getTimeOfDayGreeting(this.company.timezone);
        const firstName = this.guest.firstName;
        const roomNumber = this.guest.reservation.roomNumber;
        const company = this.company.company;
        const city = this.company.city;
        const timezone = this.company.timezone;
        const template = this.template.messageTemplate;
        const startTime = new Date(this.guest.reservation.startTimestamp).toLocaleString("en-US", { timeZone: timezone });
        const endTime = new Date(this.guest.reservation.endTimestamp).toLocaleString("en-US", { timeZone: timezone });

        // Replace keywords in templates with values from the json objects
        const parsedMessage = template.split(/\b/).reduce((acc, curVal) => {
            switch (curVal) {
                case 'GREETINGMESSAGE':
                    return acc += greeting;
                case 'GUESTNAME':
                    return acc += firstName; 
                case 'COMPANYNAME':
                    return acc += company; 
                case 'ROOMNUMBER':
                    return acc += roomNumber;
                case 'COMPANYCITY':
                    return acc += city; 
                case 'COMPANYTIMEZONE':
                    return acc += timezone;
                case 'STARTTIME':
                    return acc += startTime;
                case 'ENDTIME':
                    return acc += endTime;
                default:
                    return acc += curVal; 
            }
        }, '');

        return parsedMessage;
    }

    // Use the current time and the company timezone to generate a greeting
    getTimeOfDayGreeting(timezone) {
        let dateTimeString = new Date().toLocaleString("en-US", { timeZone: timezone });
        let time = new Date(dateTimeString).getHours();

        if (time < 5 || time >= 22) {
            return "Good night";
        }else if (time < 12) {
            return "Good morning";
        } else if (time < 16) {
            return "Good afternoon";
        } else if (time < 22) {
            return "Good evening";
        } else {
            return "Hello";
        }
    }
}

module.exports = MessageGenerator;