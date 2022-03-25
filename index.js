#!/usr/bin/env node

const yargs = require("yargs");

const FileReader = require('./src/FileReader');
const MessageGenerator = require('./src/MessageGenerator');

const reader = new FileReader();

const options = yargs
    .usage("Usage: -g <guest ID> -c <company ID> -t <template type>")
    .option("guest", { alias: "g", describe: "Guest's ID", type: "number", demandOption: true })
    .option("company", { alias: "c", describe: "Company's ID", type: "number", demandOption: true })
    .option("template", { alias: "t", describe: "Template type", type: "string", demandOption: true })
    .option("newTemplate", { alias: "n", describe: "new template message", type: "string"})
    .argv;

let guest, company, template;

// Find the guest object that matches the guest id
guest = reader.guests.find(guest => guest.id === options.guest);
if (!guest) {
    console.log('Could not find guest with that ID');
    return;
}   

// Find the company object that matches the company id
company = reader.companies.find(company => company.id === options.company);
if (!company) {
    console.log('Could not find company with that ID.');
    return;
}

// Find any existing templates that match the selected type
let existingTemplate = reader.templates.find(existingTemplate => existingTemplate.type === options.template);
// Check if a new template is being generated. If so, make sure there is not already a template that has the same 
// type as the new template.
if (options.newTemplate) {
    if (existingTemplate) {
        console.log('There is already an existing template of that type');
        return;
    }
    template = {
        type: options.template,
        messageTemplate: options.newTemplate
    }
    // Save the new template for future use
    reader.addTemplate(template);
} else {
    template = existingTemplate;
}
if (!template) {
    console.log('Could not find template of that type');
    return;
}

const messageGenerator = new MessageGenerator(guest, company, template);

console.log(messageGenerator.message);



