# Geolocation Application
Spring'22 Bilkent University CS458: Software Verification and Validation Project 3

**Project Members:**
  - Ahmet Ayberk Yılmaz - 21702250
  - Ege Şahin - 21702300
  - Yiğit Erkal - 21601521
  - Gökberk Boz - 21602558

------------------------------------------------------------------------------------

Setup

The script.js file in the js fodler, is the application file and it is connectedd to index.html.

The second file in the js fodler which is useCase1.test.js is the test codde for TDD.
In order to run this file and see the test results, in js folder you should add some dependencies.

Run these commands on terminal
- npm init
- npm install Selenium-Webdriver
- npm install chromedriver
- npm install --save-dev jest

After these dependecies are added, go to script.js file and comment out lines 1-154, run this command on terminal
- npx jest useCase1.test.js

Then you can see the test results on terminal.

There is also a test folder in this project which includes frontend test written by using Selenium webdriver for additional purposes.
