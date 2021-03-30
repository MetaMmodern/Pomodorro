const { By } = require("selenium-webdriver");
const sel = require("../utils/SelUtils");
const CommonUtils = require("./CommonUtils");
module.exports = class LoginPage {
  static async fillLoginData(login, password) {
    await CommonUtils.sleep(3000);
    const emailField = await sel.driver.findElement(
      By.xpath("//input[@id='current-email']")
    );
    const passwordField = await sel.driver.findElement(
      By.xpath("//input[@type='password']")
    );
    emailField.clear();
    emailField.sendKeys(login);
    passwordField.sendKeys(password);
    passwordField.clear();
  }
  static async clickLoginButton() {
    const loginBtn = sel.driver.findElement(
      By.xpath("//button[@type='submit']")
    );
    await loginBtn.click();
    await CommonUtils.sleep(1000);
  }
  static async getErrorMessage() {}
  static async clickRegisterLink() {
    const registerLink = await sel.driver.findElement(
      By.xpath("//a[@href='/register']")
    );
    await registerLink.click();
  }
};
