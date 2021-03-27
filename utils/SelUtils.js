module.exports = class SelUtils {
  constructor(d) {
    this.driver = d;
  }
  static setDriver(d) {
    this.driver = d;
  }
  static closeBrowser() {
    this.driver.quit();
  }
  static async getCurrentLink() {
    const link = await this.driver.getCurrentUrl();
    console.log(link);
    return link;
  }
  static goBack() {}
  static goForward() {}
  static reloadPage() {}
};
