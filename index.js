const chrome = require("selenium-webdriver/chrome");
const { Builder } = require("selenium-webdriver");

const login = require("./functions/login");
const launch = require("./functions/launch_01");
const terminate = require("./functions/terminate");

require("dotenv").config();

async function runScript() {
  // Get credentials from environment variables
  const username = process.env.CWIQ_USERNAME;
  const password = process.env.CWIQ_PASSWORD;
  const url = process.env.CWIQ_URL;
  // console.log(`username: ${username}`);
  // console.log(`password: ${password}`);

  // Set Chrome options
  const options = new chrome.Options();
  options.addArguments("--headless"); // Run Chrome in headless mode

  // Create a new WebDriver instance
  const driver = await new Builder()
    .forBrowser("chrome")
    // .setChromeOptions(options)
    .build();

  // Login to the web page
  await login(driver, url, username, password);

  // Launch the Master
  // await launch(driver, url);

  // Terminate the Master
  await terminate(driver, url);
}

runScript();
