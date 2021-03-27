const sel = require("../utils/SelUtils");
const { By } = require("selenium-webdriver");
const CommonUtils = require("./CommonUtils");

module.exports = class SettingPage {
  static async fillNewAccountData(username, password) {
    const newUsername = await sel.driver.findElement(
      By.xpath(
        "//*[@id='root']/main/div[3]/div/div[2]/div/form/div[1]/div/div[4]/div/div/input"
      )
    );
    await newUsername.clear();
    await newUsername.sendKeys(username ?? "");
    const passwordInput = await sel.driver.findElement(
      By.xpath(
        "//*[@id='root']/main/div[3]/div/div[2]/div/form/div[2]/div/div[2]/div/div/div/input"
      )
    );
    await passwordInput.clear();
    await passwordInput.sendKeys(password ?? "");
    const passwordSubmit = await sel.driver.findElement(
      By.xpath(
        "//*[@id='root']/main/div[3]/div/div[2]/div/form/div[2]/div/div[4]/div/div/input"
      )
    );
    await passwordSubmit.clear();
    await passwordSubmit.sendKeys(password ?? "");
  }
  static async saveNewAccountData(oldPassword) {
    const saveBtn = await sel.driver.findElement(
      By.xpath(
        "//*[@id='root']/main/div[3]/div/div[2]/div/form/div[3]/span/button"
      )
    );
    await saveBtn.click();
    await this.submitAction(oldPassword);
    await CommonUtils.sleep(2000);
  }
  static async clickDeleteAccount() {
    console.log("deleting account");
    const delBtn = await sel.driver.findElement(
      By.xpath("//button[span[contains(text(),'Delete my account')]]")
    );
    await delBtn.click();
    await CommonUtils.sleep(500);
  }
  static async submitAction(password) {
    const passwordInput = await sel.driver.findElement(
      By.xpath("//*[@id='passwdsubmit']")
    );
    await passwordInput.clear();
    await passwordInput.sendKeys(password ?? "");
    const submitBtn = await sel.driver.findElement(
      By.xpath("/html/body/div[4]/div[3]/div/div[3]/button[2]")
    );
    await submitBtn.click();
  }
  static async submitAccountDeletion(password) {
    await this.submitAction(password);
    await CommonUtils.sleep(2000);
  }
};
