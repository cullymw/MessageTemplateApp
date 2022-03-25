const fs = require('fs');

class FileReader {
    COMPANIES_FILE = 'data/Companies.json';
    GUESTS_FILE = 'data/Guests.json';
    TEMPLATES_FILE = 'data/Templates.json';

    constructor() {
        this.companies = JSON.parse(this.readData(this.COMPANIES_FILE));
        this.guests = JSON.parse(this.readData(this.GUESTS_FILE));
        this.templates = JSON.parse(this.readData(this.TEMPLATES_FILE));
    }

    readData(fileName) {
        return fs.readFileSync(fileName, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            try {
                return data;
            } catch(err) {
                console.log('Error parsing json: ', err);
            } 
        })
    }

    writeData(file, data) {
        fs.writeFile(file, data, (err) => {
            if (err) {
                console.log('Error writing json: ', err);
            }
        });
    }

    addTemplate(template) {
        this.templates.push(template);
        this.writeData(this.TEMPLATES_FILE, JSON.stringify(this.templates));
    }
}

module.exports = FileReader;