module.exports = class SelUtils {
  driver;
  constructor(d) {
    this.driver = d;
  }
  static setDriver(d) {
    this.driver = d;
  }
};
