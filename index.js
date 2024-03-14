const chrome = require("selenium-webdriver/chrome");
const { Builder } = require("selenium-webdriver");

const login = require("./functions/login");
const launch = require("./functions/launch_01");
const enableNoBa = require("./functions/enableNoBa");
const newNode = require("./functions/newNode");
const clusterInfo = require("./functions/clusterInfo");
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
  // options.addArguments("--headless"); // Enable headless mode
  options.addArguments("--no-sandbox");
  options.addArguments("--disable-dev-shm-usage");
  options.addArguments("window-size=1920,1080");

  // Create a new WebDriver instance
  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  // Login to the web page
  await login(driver, url, username, password);

  // Launch the Master
  // await launch(driver, url);

  // Enable Node Balancer
  // await enableNoBa(driver, url);

  // Add a new Node
  await newNode(driver, url);

  // Get Cluster Info
  await clusterInfo(driver, url);

  // Terminate the Master
  await terminate(driver, url);
}

runScript();
