const { By } = require("selenium-webdriver");
const CommonUtils = require("./CommonUtils");
const sel = require("../utils/SelUtils");

module.exports = class UserPopup {
  static async clickLogout() {
    const logoutBtn = sel.driver.findElement(
      By.xpath("//li/*/span[contains(text(),'Logout')]")
    );
    await logoutBtn.click();
    await CommonUtils.sleep(500);
  }
};
