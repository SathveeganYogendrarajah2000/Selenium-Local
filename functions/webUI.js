const { By, Key } = require("selenium-webdriver");
const { mailEmail } = require("../emailBaseConfig/baseEmailVariables");

async function webUI(driver, url, provider) {
    await driver.get(url); //Open the web page
    console.log(url);
    await driver.sleep(5000);
    const pageTitle = await driver.getTitle();
    console.log("Page Title:", pageTitle);

    await driver.sleep(8000);

    try {
        const webUI = await driver.findElement(
            By.xpath("(//*[name()='svg'][@data-testid='SSRWebUI'])[1]")
        );
        console.log("Reached webUI button");
        await webUI.click();
        console.log("Successfully clicked the button!!!");
        await driver.sleep(5000);
    } catch (error) {
        throw new Error(`\n Failed to click the webUI button: ${error}`);
    }

    //Click Create New Option
    try {
        await driver
            .findElement(By.xpath("//a[@id='instance-proxy-tabs-tab-create']"))
            .click();
        console.log("Clicked Create New!!!");
        await driver.sleep(5000);
    } catch (error) {
        throw new Error(`\n Failed to click Create New Option: ${error}`);
    }

    //Instance Web UIs(Choose the JupyterLab)
    try {
        if (provider === "aws" ||
            provider === "demo" ||
            provider === "awsProd" ) {
            await driver
                .findElement(
                    By.xpath(
                        "//*[@id='instance-proxy-tabs-tabpane-create']/div/div/div/div[4]"
                    )
                )
                .click();
        }
        if (provider === "gcpProd") {
            await driver
                .findElement(
                    By.xpath(
                        "//div[contains(text(),'jupyter-lab')]"
                    )
                )
                .click();
        }
        if (provider === "gcpCentralProd") {
            await driver
                .findElement(
                    By.xpath(
                        "//*[@id='instance-proxy-tabs-tabpane-create']/div/div/div/div[5]"
                    )
                )
                .click();
        }
        if (
            provider === "azure" ||
            provider === "gcp"
        ) {
            await driver
                .findElement(
                    By.xpath(
                        "//*[@id='instance-proxy-tabs-tabpane-create']/div/div/div/div[6]"
                    )
                )
                .click();
        }
        console.log("Clicked the jupyter-lab");
        await driver.sleep(20000); //Sleep time for 20 secs
    } catch (error) {
        throw new Error(`\n Failed to choose Jupyter-Lab option: ${error}`);
    }

    // Click create
    try {
        await driver
            .findElement(
                By.xpath(
                    "//*[@id='instance-proxy-tabs-tabpane-create']/div/div/div[3]/div/button"
                )
            )
            .click();
        console.log("You're clicked create!!!");
        await driver.sleep(40000); //Sleep time for 40 secs
    } catch (error) {
        throw new Error(
            `\n Failed to click create option on Jupyter Lab: ${error}`
        );
    }

    //Click OpenLink
    try {
        await driver
            .findElement(By.xpath("//button[normalize-space()='Open Link']"))
            .click();
        console.log("You're clicked Open Link Option");
        await driver.sleep(5000);
    } catch (error) {
        throw new Error(
            `\n Failed to click OpenLink on Jupyter Lab option: ${error}`
        );
    }

    //Creating new Window
    try {
        const currentWindow = await driver.getWindowHandle();
        const allWindowhandle = await driver.getAllWindowHandles();
        console.log("Length of array: " + allWindowhandle.length);
        for (const handle of allWindowhandle) {
            if (handle !== currentWindow) {
                //switch to the window with the specifies handle
                await driver.switchTo().window(handle);
                // Set the size of the current window
                await driver
                    .manage()
                    .window()
                    .setRect({ width: 1920, height: 1080 });
                break;
            }
        }
        console.log("We're in new window!!!");
        await driver.sleep(9000);

        //  Click the terminal Option
        let retries = 3;
        let error = true;
        let errorMsg;
        while (retries) {
            try {
                await driver
                    .findElement(
                        By.xpath(
                            "//div[@title='Start a new terminal session'][@class='jp-LauncherCard']"
                        )
                    )
                    .click();
                error = false;
            } catch (err) {
                retries--;
                console.log("Failed retry again");
                await new Promise((resolve) => setTimeout(resolve, 10000));
                errorMsg = err;
            }
        }
        if (!error) {
            console.log("Successfully launch the terminal!!!");
        } else {
            console.log("Could not open terminal; Exit");
            throw new Error(errorMsg);
        }
        await driver.sleep(20000); //Sleep time for 20 secs

        // Give a command to run the code
        const input = await driver.findElement(
            By.xpath(
                "/html/body/div[1]/div[3]/div[2]/div[1]/div[3]/div[3]/div[3]/div/div[2]/div/textarea"
            )
        );
        console.log("Clicked Text area");
        await driver.sleep(5000); //Sleep time for 5 secs
        // Use sendKeys to simulate pressing Enter key
        await input.sendKeys(Key.RETURN);
        await driver.sleep(25000); //Sleep time for 5 secs

        // mailx command
        input.sendKeys(
            `echo 'hello' | mailx -s 'testing' ${mailEmail}`,
            Key.ENTER
        );
        console.log("Entered command for mailx option");
        await driver.sleep(30000); // 30 secs

        // qsub command for multi.q
        input.sendKeys(
            "for i in {1..8}; do qsub -V -q multi.q -l h_rss=6G,h_core=4,h_stack=10M -b y sleep 1500; done",
            Key.ENTER
        );
        console.log("Entered qsub comment for multi.q");
        await driver.sleep(30000); // 30 secs

        // qsub command for all.q
        input.sendKeys(
            "for i in {1..12}; do qsub -V -q all.q -l h_rss=6G,h_core=4,h_stack=10M -b y sleep 1500; done",
            Key.ENTER
        );
        await driver.sleep(5000); //30 secs
        console.log("Entered qsub comment for all.q");
        await driver.sleep(210000); //3.5 mins

        if (
            provider !== "gcpProd"
        ) {
        // Switch the dashboard window again to refresh the page
        await driver.switchTo().window(currentWindow);
        console.log("You're in the previous window");
        await driver.sleep(60000); //Sleep 1 min
        //sleep time for GCP env
        if (
            provider === "gcp" ||
            provider === "gcpCentralProd"
        ) {
            await driver.sleep(90000); //2.5 minutes
        }
        await driver
            .findElement(
                By.xpath(
                    "//div[@id='responsive-navbar-nav']//div//div//div//*[name()='svg']"
                )
            )
            .click();
        console.log("Clicked refresh button");
        await driver.sleep(360000); // 6 mins
        //sleep time for GCP env
        if (
            provider === "gcp" ||
            provider === "gcpCentralProd"
        ) {
            await driver.sleep(150000); //2.5 minutes
        }}
    } catch (error) {
        throw new Error(
            `\n Failed to switch to the new window, choose terminal & do qsub command: ${error}`
        );
    }
    console.log();
}

module.exports = webUI;
