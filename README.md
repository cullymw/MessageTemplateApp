# MessageTemplateApp

## Instructions

1. Clone the MessageTemplateApp repo to your local machine
2. Navigate into the MessageTemplate App repo in your terminal
3. Run `npm install`
4. Run `node .` or `node . --help` to see command options

### Command arguments 
-g, --guest -> Guest's ID number that the message is getting sent to **required**
-c, --company -> Company ID number that the message is from **required**
-t, --template -> The type of template the message should be generated from **required**
-n, --newTemplate -> Optional flag that is used to generate a new template

### Message template variables
When generating a new template using the --newTemplate argument, here are the available variables to be generated from the json objects
`GREETINGMESSAGE` - Creates a greeting based on the time of day in the company's timezone
`GUESTNAME` - The guests first name
`COMPANYNAME`
`ROOMNUMBER`
`COMPANYCITY`
`COMPANYTIMEZONE`
`STARTTIME` - The start time of the guest's reservation in the company's timezone
`ENDTIME` - The end time of the guest's reservation in the company's timezone

## Overview of design desicions 
I decided to create a command line application that takes in command arguements because it would be an efficient way for a user of the application
to quickly generate a new message from an exissting template or create a new template. All it takes is one command to receive the desired output.

After deciding to proceed with a command line application, I determined there were three main activities of the application - running the CLI, 
reading and writing to the json files, and generating the messages from templates. That is how I ended up splitting up the application's responsibilities
- index.js handles the running of the application/command line inputs, the FileReader interacts with the json files, and the MessageGenerator creates
messages for output.

## What language you picked and why
I picked Javascript/Node for two main reasons both of which stem from npm. First it provides ease of use for anyone reviewing my app. With NPM it 
can be as simple as pulling the project to your local machine, running `npm install` and then running the project. The second reason is that npm provides
a wide range of dependencies. That was helpful for me to focus on the features of the application I was building rather than spending time on non-central
aspects of the project that may have already been created by someone else. 

## Process for verifying correctness
To verify the correctness of my program I manually reviewed the code I wrote and added comments along the way. I think adding comments can not only help
other people when reviewing your code, but aslop make sure that you can convert the logic you've written into code into plain writing. I also manually
QA'd the program with a variety of inputs.

## What I didn't get to
I did not get to writing tests for my code but that would be the first thing on my list of things to do. As far as additional features go, I think there 
are many opportunities for interesting additions! First it would be cool to automate the messaging based on a guest's reservation start and end time. That 
way, they would automaticlly receive a message near the start or end of their stay without a staff member manually generating the message. I also think 
having calculated values that could be inserted into templates would be an interesting option. For example, calculating the length of a guests stay based
on the start and end of their reservation.
