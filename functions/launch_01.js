const { By, Key } = require("selenium-webdriver");

async function launch(url, username, password) {
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
  await driver.sleep(9000);

  //Check for the variable in the 1st page (Testing purpose)
  try {
    let elementText = "";
    let element = `//*[@id="root"]/div[2]/div/div[1]/div[1]/div[2]/a[1]`;

    const foundElement = await driver.findElement(By.xpath(element));
    elementText = await foundElement.getText();
    assert(elementText == "Dashboard", "Dashboard not Found");
    assert("Dashboard is found");
    console.log("Your login success!!");
  } catch (error) {
    throw new Error(`\n Failed to find the Dashboard option: ${error}`);
  }
  await driver.sleep(5000);

  //***Click the launch button***
  try {
    let launchServer = `//*[@id="dashboardTabs-tabpane-clusters"]/div[1]/div[3]/a`;

    await driver.findElement(By.xpath(launchServer)).click();
    console.log("Clicked the Launch button");
  } catch (error) {
    throw new Error(`\n Failed to click Launch Server button: ${error}`);
  }
  await driver.sleep(5000);

  //***Select Instance Image***
  try {
    let image = `//*[@id="spawner-node-tabs-tabpane-manual"]/div/div[2]/div/div[2]/div/div[1]/div[2]/div[3]/div[2]/div/div/div[2]`;

    const imageFound = await driver.findElement(By.xpath(image));
    await imageFound.click();
    console.log("Selected the Instance image Type");
    await driver.sleep(5000);
  } catch (error) {
    throw new Error(`\n Failed to click the Instance image Type: ${error}`);
  }

  //***Select Instance Type***
  try {
    let instanceType = `//*[@id="spawner-node-tabs-tabpane-manual"]/div/div[4]/div/div/div/div[2]/div/div[1]/div[2]/div[3]/div[2]/div/div/div[3]`;

    const instanceTypeFound = await driver.findElement(By.xpath(instanceType));
    await instanceTypeFound.click();
    console.log("Selected the Instance Type c4.2xlarge");
    await driver.sleep(5000);
  } catch (error) {
    throw new Error(`\n Failed to click Instance Type: ${error}`);
  }

  //***Select Instance Subnet***
  try {
    let subnet = `//*[@id="spawner-node-tabs-tabpane-manual"]/div/div[6]/div/div[2]/div/div[1]/div[2]/div[3]/div[2]/div/div/div`;

    const subnetFound = await driver.findElement(By.xpath(subnet));
    await subnetFound.click();
    console.log("Selected the Instance Subnet");
    await driver.sleep(5000);
  } catch (error) {
    throw new Error(`\n Failed to click Instance subnet: ${error}`);
  }

  // //***Select Instance Orchestrator***
  try {
    let orchestrator = `//*[@id="spawner-node-tabs-tabpane-manual"]/div/div[8]/div/div[2]/div/div[1]/div[2]/div[3]/div[2]/div/div/div`;

    const orchestratorFound = await driver.findElement(By.xpath(orchestrator));
    await orchestratorFound.click();
    console.log("Selected the Instance Orchestrator");
    await driver.sleep(5000);
  } catch (error) {
    throw new Error(`\n Failed to click Instance Orchestrator: ${error}`);
  }

  //***Select Instance Reservation***(On Demand)
  try {
    // default to the aws case
    let instanceReservation = `//*[@id="spawner-node-tabs-tabpane-manual"]/div/div[10]/div/div[1]/div[1]`;

    const instanceReservationFound = await driver.findElement(
      By.xpath(instanceReservation)
    );
    await instanceReservationFound.click();

    console.log("Selected the Instance reservation");
    await driver.sleep(5000);
  } catch (error) {
    throw new Error(`\n Failed to click Instance reservation: ${error}`);
  }

  //Instance Reservation Confirmation
  try {
    await driver
      .findElement(By.xpath("/html/body/div[4]/div/div/div[3]/button[2]"))
      .click();
    console.log("Selected On Demand instance reservation");
    await driver.sleep(5000);
  } catch (error) {
    throw new Error(
      `\n Failed to accept the reservation confirmation: ${error}`
    );
  }

  // Advanced Options
  try {
    let cacheDiskSize = await driver.findElement(By.id("cacheDiskSize"));
    const cacheValue = cacheDiskSize.getText();
    if (cacheValue == null || cacheValue == 500) {
      cacheValue.sendKeys("110", Key.RETURN);
    } else {
      console.log("Default Value was entered");
    }
    console.log("Checked the disk size of Cache");
  } catch (error) {
    throw new Error(`\n Failed to give correct cache size: ${error}`);
  }

  //*** Click the Launch button***
  try {
    // default to the aws case
    let launch = `//*[@id="root"]/div[2]/div/div[2]/div/div/div[2]/div/button`;
    
    const launchFound = await driver.findElement(By.xpath(launch));
    await launchFound.click();
    console.log("Clicked Launch button");
    await driver.sleep(180000); //3 minutes
    
  } catch (error) {
    throw new Error(`\n Failed to click Launch button: ${error}`);
  }
  console.log();
}

module.exports = launch;
