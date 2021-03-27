const sel = require("../utils/SelUtils");

const { By } = require("selenium-webdriver");
module.exports = class CommonUtils {
  static async openSidebar() {
    const burger = await sel.driver.findElement(
      By.xpath('//button[contains(@aria-label, "menu")]')
    );
    await burger.click();
  }
  static async openTasksPage() {
    await this.sleep(1000);
    const tasksLink = await sel.driver.findElement(
      By.xpath("//a[@href='/tasks']")
    );
    await tasksLink.click();
    await this.sleep(1000);
  }
  static async openSettingsPage() {
    await this.sleep(500);

    const settingsLink = await sel.driver.findElement(
      By.xpath("//a[@href='/settings']")
    );
    await this.sleep(3000);

    await settingsLink.click();
  }
  static async openLoginPage() {
    const loginLink = await sel.driver.findElement(
      By.xpath("//a[contains(@href, '/login')]")
    );
    await loginLink.click();
  }
  static async openUserPopup() {
    await this.sleep(500);
    const button = await sel.driver.findElement(
      By.xpath("(//div[contains(@class, 'MuiToolbar-root')]/button)[2]")
    );
    // const buttons = await header.findElements(By.name("button"));
    // console.log(header);
    await button.click();
  }
  static async sleep(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  }
  static async getCurrentUsername() {
    const username = await sel.driver.findElement(
      By.xpath("//*[@id='simple-menu']/div[3]/ul/li[1]/b")
    );
    return await username.getText();
  }
};
