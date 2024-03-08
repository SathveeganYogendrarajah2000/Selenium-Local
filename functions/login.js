const { By, Key } = require("selenium-webdriver");

async function login(driver, url, username, password) {
  console.log(`url: ${url}`);
  await driver.get(url); //Open the web page
  await driver.sleep(5000);
  const pageTitle = await driver.getTitle();
  console.log("Page Title:", pageTitle);

  await driver.sleep(5000);

  //****User name & password*****
  try {
    let creUsername = "username";
    let crePassword = "password";

    const usernameFound = await driver.findElement(By.id(creUsername));
    const passwordFound = await driver.findElement(By.id(crePassword));
    await usernameFound.sendKeys(username);
    await passwordFound.sendKeys(password);

    console.log("You're successfully enter name & passwd!!!"); //Check the Username & Password
  } catch (error) {
    throw new Error(`\n Failed to open login page: ${error}`);
  }
  await driver.sleep(5000);

  //sign in option
  try {
    await driver
      .findElement(By.xpath("//*[@id='root']/div/div/div/form/button"))
      .click(); //Click the Sign in tab
    console.log("You're successfully login to the page!!!"); //Check for the button
  } catch (error) {
    throw new Error(` \n Failed to click Sign In button: ${error}`);
  }
  await driver.sleep(5000);
}

module.exports = login;
