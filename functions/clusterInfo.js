const { By } = require("selenium-webdriver");

async function clusterInfo(driver, url) {
  await driver.get(url); //Open the web page
  await driver.sleep(5000);
  const pageTitle = await driver.getTitle();
  console.log("Page Title:", pageTitle);

  await driver.sleep(5000);

  //*********************************************************Cluster Slots Used********************************************************
  // Cluster capacity
  try {
    let clusterSlots = `//*[@id="root"]/div[2]/div/div[2]/div/div/div[2]/div[1]/div/div/span[1]`;

    const clusterSlotsFound = await driver
      .findElement(By.xpath(clusterSlots))
      .getText();
    console.log(clusterSlotsFound);

    await driver.sleep(10000);

    //Printing the number
    var array = clusterSlotsFound.split("/");
    console.log(array[0] + " number of slots used in Cluster");
  } catch (error) {
    throw new Error(`\n Failed to get the cluster info: ${error}`);
  }

  //********************************************************Cluster Memory Used**********************************************************
  // Cluster Memory
  try {
    let clusterMemory = `//*[@id="root"]/div[2]/div/div[2]/div/div/div[2]/div[2]/div/div/span[1]`;

    const clusterMemoryFound = await driver
      .findElement(By.xpath(clusterMemory))
      .getText();
    console.log(clusterMemoryFound);

    await driver.sleep(10000);

    //Printing the number
    var array2 = clusterMemoryFound.split("/");
    console.log("Memory used in cluster is " + array2[0] + " GB");
  } catch (error) {
    throw new Error(`\n Failed to get cluster memory info: ${error}`);
  }

  //***************************************************************Nodes Allocated***************************************************************
  //Check the no. of nodes
  try {
    let clusterAllocated = `//*[@id="root"]/div[2]/div/div[2]/div/div/div[2]/div[3]/div/div/span[1]`;

    const clusterAllocatedFound = await driver
      .findElement(By.xpath(clusterAllocated))
      .getText();
    console.log(clusterAllocatedFound);

    //Printing the number
    var array_N = clusterAllocatedFound.split("/");
    console.log(
      "No.of Nodes Used in allocated nodes in cluster is " + array_N[0]
    );
    console.log("No.of Allocated nodes in cluster is " + array_N[1]);

    await driver.sleep(5000);
  } catch (error) {
    throw new Error(`\n Failed to check the no. of nodes: ${error}`);
  }
}

module.exports = clusterInfo;
