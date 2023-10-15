This project was bootstrapped with [Create React App].

In order to run this application, first you need to download and install npm/nodeJS.

Following that, pull the code from the target folder (or download as a zip file and unzip).
cd into the travel-application-dashboard folder, then run the command "npm start".

The application should then start up and open a new browser tab.

Some things to note about this application:
-Lack of time so no tests written
-Code is mainly focused on the requirements, and doesn't do much else (due to lack of time)
-Code in Form and FormReview could be reduced into a smaller component called FormField, but there would be no practical change in terms of efficiency or optimization in React, purely just for neater code.
-Form and FormReview could be combined into 1 component and then using a boolean IsEditing state to decide whether to show editable version or not, but again no difference in terms of efficiency or optimization
-APIs that would be mocked if there was time:

1. Fetching countries data and populating into dropdowns for both the origin and destination fields instead of free text, or use autocomplete (or something similar)
2. Fetching countries and their corresponding cost data to calculate the cost of each application
3. Adding new applications upon submit and reading existing applications from the database
