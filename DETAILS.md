# HowOld API
This API returns the age given the date of birth. This API receives a date of birth query parameter ```dob`` as input with the format YYY-MM-DD and returns the age in Years, Months and Days. 

### Design Details
This app is an express JS app that starts up with a rate-limiting feature, which limits requests to 3 per user per second. It also has a middleware that checks and returns a 404 error for endpoints that do not exist. The server receives input of date and validates it against a Regex that checks the date to be in the ```YYYY-MM-DD``` format. It then goes ahead to perform the age calculation. This is done by converting the validated input to a milliisecond representation of the Javasript Date object using the ```Date.getTime()``` method. The result of the subtraction of the input from ```Date.now()``` gives us the value that represents the age of a person in milliseconds. This is now converted to Years, Months, and Days. All responses are formatted following [JSend Specification](https://github.com/omniti-labs/jsend). 

### How It Works
All you need to do is to clone the repo, start the server by running `npm run start` on the cli and then send your request using Postman or any other API tester to the link `localhost:3000/howold?dob=2020-12-10`, where the query param dob is the date of birth. 