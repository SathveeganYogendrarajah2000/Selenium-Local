const { By } = require("selenium-webdriver");

async function enableNoBa(driver, url) {
  console.log(url);
  await driver.get(url); //Open the web page
  await driver.sleep(5000);
  const pageTitle = await driver.getTitle();
  console.log("Page Title:", pageTitle);
  await driver.sleep(5000);

  //Click Node Balancer
  try {
    await driver
      .findElement(By.xpath(`//*[@id="dashboardTabs-tab-nodeBalancers"]`))
      .click();
    console.log("Clicked the NODE BALANCER Option");
    await driver.sleep(8000);
  } catch (error) {
    throw new Error(`\n Failed to click Node balancer option: ${error}`);
  }

  //Click ADD Node Balancer
  try {
    const noBa = await driver.findElement(
      By.xpath("//a[normalize-space()='Add Node Balancer']")
    );
    noBa.click();
    console.log("Clicked the ADD NODE BALANCER option");
    await driver.sleep(8000);
  } catch (error) {
    throw new Error(`\n Failed to click Add node balancer option: ${error}`);
  }

  //Choose the Instance Image
  try {
    const check = await driver
      .findElement(By.xpath("//*[@id='spawner-node-tabs-tab-manualLB']"))
      .getText();
    console.log(check);
    await driver.sleep(5000);
    //***Select Instance Image****
    if (check === "Manual Choice") {
      const imageXpath = `//*[@id="spawner-node-tabs-tabpane-manualLB"]/div/div[4]/div/div[2]/div/div[1]/div[2]/div[3]/div[2]/div/div/div[2]`;
      // const imageXpath = `//div[.='casfs-plus-ng-2.0.30-2024-01-19-040219']`
      const name = await driver.findElement(By.xpath(imageXpath)).getText();
      console.log(name);
      await driver.findElement(By.xpath(imageXpath)).click();
    }
    console.log("Selected the Instance image Type");
  } catch (error) {
    throw new Error(`\n Failed to choose Instance image type: ${error}`);
  }

  await driver.sleep(10000);

  //***Select Instance Type***
  try {
    let instanceType = `//*[@id="spawner-node-tabs-tabpane-manualLB"]/div/div[6]/div[2]/div/div/div[2]/div/div[1]/div[2]/div[3]/div[2]/div/div/div[3]`;

    const instanceTypeFound = await driver.findElement(By.xpath(instanceType));
    await instanceTypeFound.click();

    console.log("Selected the Instance Type (c4.2xlarge)");

    await driver.sleep(5000);
  } catch (error) {
    throw new Error(`\n Failed to click Instance type: ${error}`);
  }

  //***Select Instance Subnet***        ---->   No need to select coz, Only one subnet is there
  //   try {
  //     let subnet = `//*[@id="spawner-node-tabs-tabpane-manualLB"]/div/div[8]/div/div[2]/div/div[1]/div[2]/div[3]/div[2]/div/div/div`;

  //     const subnetFound = await driver.findElement(By.xpath(subnet));
  //     await subnetFound.click();
  //     console.log("Selected the Instance Subnet");
  //     await driver.sleep(5000);
  //   } catch (error) {
  //     throw new Error(`\n Failed to click Instance subnet: ${error}`);
  //   }

  //***Select Instance Reservation***
  try {
    let instanceReservation = `//*[@id="spawner-node-tabs-tabpane-manualLB"]/div/div[10]/div/div[1]/div[1]`;

    const instanceReservationFound = await driver.findElement(
      By.xpath(instanceReservation)
    );
    await instanceReservationFound.click();
    console.log("Selected the Instance reservation");
    await driver.sleep(5000);
  } catch (error) {
    throw new Error(`\n Failed to click Instance Reservation: ${error}`);
  }

  //Instance Reservation Confirmation
  try {
    await driver
      .findElement(By.xpath("/html/body/div[4]/div/div/div[3]/button[2]"))
      .click();
    console.log("Confirmed successfully");
    console.log();
    await driver.sleep(5000);
  } catch (error) {
    throw new Error(`\n Failed to confirm Instance reservation: ${error}`);
  }

  //Select the Security Group     ---->   No need to select coz, Only one security group is there
  //   try {
  //     await driver
  //       .findElement(
  //         By.xpath(
  //           `//*[@id="spawner-node-tabs-tabpane-manualLB"]/div/div[12]/div/div[2]/div/div[1]/div[2]/div[3]/div[2]/div/div/div`
  //         )
  //       )
  //       .click();
  //     console.log("Selected the Instance Security Group!!!");
  //     console.log();
  //     await driver.sleep(5000);
  //   } catch (error) {
  //     throw new Error(`\n Failed to click security group: ${error}`);
  //   }

  // give random value to soft limit
//   try {
//     const softLimitInput = await driver.findElement(By.id("softLimit"));
//     const randomValue = 15;

//     // Enter the random value into the input field
//     await softLimitInput.sendKeys(randomValue.toString());
//     console.log("Entered random value:", randomValue);
//   } catch (error) {
//     console.error("Failed to find or enter value in input field:", error);
//   }

  //Click Launch Node Balancer
  try {
    const launchBtn = await driver.findElement(
      By.xpath(`//*[@id="root"]/div[2]/div/div[2]/div/div/div[2]/div/button`)
    );
    await launchBtn.click();
    console.log("Clicked the Launch Node Balancer");
  } catch (error) {
    throw new Error(`\n Failed to click Launch Node balancer option: ${error}`);
  }
}

module.exports = enableNoBa;
