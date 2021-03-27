const sel = require("../utils/SelUtils");

const { By } = require("selenium-webdriver");
const CommonUtils = require("./CommonUtils");

module.exports = class RegisterPage {
  static async fillRegistrationData(login, password) {
    await CommonUtils.sleep(500);
    const emailField = await sel.driver.findElement(
      By.xpath("//input[@type='email']")
    );
    const passwordField = await sel.driver.findElement(By.id("new-password"));
    const passwordConfirmField = await sel.driver.findElement(
      By.id("new-password-confirm")
    );
    emailField.sendKeys(login);
    passwordField.sendKeys(password);
    passwordConfirmField.sendKeys(password);
  }
  static async clickRegisterButton() {
    const registerBtn = sel.driver.findElement(
      By.xpath("//button[@type='submit'][span[contains(text(),'Register')]]")
    );
    await registerBtn.click();
    await CommonUtils.sleep(1000);
  }
  static async getErrorMessage() {}
  static async clickLoginLink() {}
};
