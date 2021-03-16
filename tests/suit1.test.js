require("chromedriver");
const script = require("jest");
const { Builder } = require("selenium-webdriver");
const CommonUtils = require("../pages/CommonUtils");
const sel = require("../utils/SelUtils");

let driver;
beforeAll(async () => {
  driver = await new Builder().forBrowser("chrome").build();
  sel.setDriver(driver);
  await driver.get("http://localhost:3000");
});

afterAll(async () => {
  await driver.quit();
});
describe("test1", () => {
  test("test1", async () => {
    await CommonUtils.openLoginPage();
  });
}, 5000);
