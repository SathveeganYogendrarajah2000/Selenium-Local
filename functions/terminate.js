const { By } = require("selenium-webdriver");

async function terminate(driver, url) {
  console.log();
  console.log(url);
  await driver.get(url); //Open the web page
  await driver.sleep(5000);
  const pageTitle = await driver.getTitle();
  console.log("Page Title:", pageTitle);

  await driver.sleep(5000);

  //To - do (Code wrote on three different way to terminate nodes; currently testing on "Terminate master", all the other methods are commented below)
  //Terminate the VM & accept the action
  // var element = await driver.findElement(By.xpath("//*[@id='dashboardTabs-tab-clusters']/div")).getText();//to find the cluster tab
  // console.log(element);//to check the cluster tab
  // await driver.sleep(5000);// time 5secs

  //Terminate Node Balancer
  // await driver.findElement(By.xpath("//*[@id='dashboardTabs-tab-nodeBalancers']")).click();
  // console.log("Clicked NoBa Option");
  // await driver.sleep(5000);// time 5secs
  // await driver.findElement(By.xpath("//*[@id='dashboardTabs-tabpane-nodeBalancers']/div/div[2]/div[2]/div/div[1]/div[2]/div[3]/div[2]/div/div/div/div[5]/div/div/a[2]")).click();
  // console.log("Delete the existing NoBalancer");
  // await driver.sleep(5000);// time 5secs
  // driver.switchTo().alert().accept();
  // console.log("Accepted the alert!");
  // await driver.sleep(10000);// time 5secs

  //Click Cluster Instances Option
  // await driver.findElement(By.xpath("//*[@id='dashboardTabs-tab-clusters']")).click();
  // console.log("Clicked Cluster Instance Option");
  // await driver.sleep(5000);// time 5secs

  //Terminate All Nodes
  // await driver.findElement(By.xpath("//*[@id='dashboardTabs-tabpane-clusters']/div[1]/div[1]/button")).click();
  // console.log("Terminated the additional Nodes");
  // driver.switchTo().alert().accept();
  // console.log("Accepted the alert!");
  // await driver.sleep(5000);// time 5secs

  //Terminate the master
  try {
    // const element = `/html/body/div[1]/div[2]/div/div[2]/div/div/div[3]/div[1]/div[1]/div[1]/div[2]/div/div[1]/div[2]/div[3]/div[2]/div/div/div/div[8]/div/div/span[2]/svg[2]`;
    // const element = `//*[@id="dashboardTabs-tabpane-clusters"]/div[1]/div[1]/div[2]/div/div[1]/div[2]/div[3]/div[2]/div/div/div/div[8]/div/div/span[2]/svg[2]`;
    const element = `(//*[name()='svg'][@role='img'])[21]`;
    console.log(`Element: ${element}`);
    const termFound = await driver.findElement(By.xpath(element));
    console.log("Termination button found"); //To check the code
    await driver.sleep(5000); // time 5secs

    termFound.click(); //Click the termination button
    console.log("Termination button Clicked!"); //To check the code

    await driver.wait(async () => {
      const isClicked = await termFound.getAttribute("class");
      return isClicked.includes("clicked");
    }, 5000);

    await driver.sleep(5000); // time 5secs
  } catch (error) {
    throw new Error(`\n Failed to click termination button: ${error}`);
  }

  // Accept the Action
  try {
    driver.sleep(5000); // time 5secs
    const alertWindow = await driver.switchTo().alert();
    console.log("Alert window found"); //To check the code
    await driver.sleep(5000); // time 5secs
    await alertWindow.accept(); //Accept the termination action

    console.log("You're successfully Terminate the VM"); //Check the action
    await driver.sleep(15000); //15 secs
  } catch (error) {
    throw new Error(`\n Failed to accept the termination action: ${error}`);
  }
  console.log();
}

module.exports = terminate;
