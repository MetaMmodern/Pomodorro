require("chromedriver");
const script = require("jest");
const chrome = require("selenium-webdriver/chrome");
const { Builder } = require("selenium-webdriver");
const {
  CommonUtils,
  LoginPage,
  RegisterPage,
  TasksPage,
  SettingsPage,
  UserPopup,
} = require("../pages");
const { reloadPage } = require("../utils/SelUtils");
const sel = require("../utils/SelUtils");

jest.setTimeout(30000);
let driver;

let homepage =
  process?.env?.homepage || "https://evening-mesa-44346.herokuapp.com/";
const userData = {
  login: "test_kpi@gmail.com",
  username: "newUsernameTest_kpi",
  password: "test_kpi_test_kpi",
  newPassword: "test_kpi_test_kpi_222",
  task1: "task1",
  task2: "task2",
};

const loginWithTestData = async () => {
  try {
    await CommonUtils.openLoginPage();
    await CommonUtils.sleep(2000);
  } catch (error) {}
  await LoginPage.fillLoginData(userData.login, userData.password);
  await LoginPage.clickLoginButton();
  await CommonUtils.sleep(2000);
  // try {
  //   expect(await sel.getCurrentLink()).toBe('"http://localhost:3000/"');
  // } catch (error) {
  //   throw new Error("NO_USER");
  // }
};
beforeAll(async () => {
  driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options().headless())
    .build();
  sel.setDriver(driver);
  await driver.get(homepage);
});

afterEach(async () => {
  {
    try {
      await CommonUtils.openUserPopup();
      await UserPopup.clickLogout();
    } catch (error) {
      console.log("no logged user found");
    }
  }
});

afterAll(async () => {
  {
    try {
      await CommonUtils.openUserPopup();
      await UserPopup.clickLogout();
    } catch (error) {
      console.log("no logged user found");
    }
  }
  await sel.closeBrowser();
});

// negative
test("Add task as a non logged user", async () => {
  await CommonUtils.openSidebar();
  await CommonUtils.openTasksPage();
  await CommonUtils.sleep(500);
  expect(await sel.getCurrentLink()).toBe(homepage);
});

// positive;
test("Check registration", async () => {
  await CommonUtils.openLoginPage();
  await CommonUtils.sleep(2000);
  await LoginPage.clickRegisterLink();
  await CommonUtils.sleep(500);
  await RegisterPage.fillRegistrationData(userData.login, userData.password);
  await RegisterPage.clickRegisterButton();
  await CommonUtils.sleep(1000);

  expect(await sel.getCurrentLink()).toBe(homepage + "login");
  await LoginPage.fillLoginData(userData.login, userData.password);
  await LoginPage.clickLoginButton();
  await CommonUtils.sleep(1000);
  expect(await sel.getCurrentLink()).toBe(homepage);
  // await loginWithTestData();
  await CommonUtils.openUserPopup();
  await CommonUtils.sleep(1000);
  await UserPopup.clickLogout();
  expect(await sel.getCurrentLink()).toBe(homepage);
  await loginWithTestData();
  await CommonUtils.sleep(3000);
  expect(await sel.getCurrentLink()).toBe(homepage);
}, 100000);

//positive
test("Check account update", async () => {
  await loginWithTestData();
  await CommonUtils.openUserPopup();
  await CommonUtils.openSettingsPage();
  await CommonUtils.sleep(2000);
  await SettingsPage.fillNewAccountData(
    userData.username,
    userData.newPassword,
    userData.password
  );
  await SettingsPage.saveNewAccountData(userData.password);
  await LoginPage.fillLoginData(userData.username, userData.newPassword);
  await LoginPage.clickLoginButton();
  await CommonUtils.sleep(2000);
  await CommonUtils.openUserPopup();
  await CommonUtils.sleep(500);
  expect(await CommonUtils.getCurrentUsername()).toBe(userData.username);
  await CommonUtils.openSettingsPage();
});

// should fail
test("Check tasks deletion", async () => {
  await CommonUtils.openLoginPage();
  await CommonUtils.sleep(2000);
  await LoginPage.fillLoginData(userData.username, userData.newPassword);
  await LoginPage.clickLoginButton();
  await CommonUtils.sleep(2000);
  await CommonUtils.openSidebar();
  await CommonUtils.openTasksPage();
  await CommonUtils.sleep(3000);
  await TasksPage.createTask(userData.task1);
  await CommonUtils.sleep(3000);
  await TasksPage.createTask(userData.task2);
  await TasksPage.deleteTask(userData.task2);
  await CommonUtils.sleep(1000);
  expect(await sel.getCurrentLink()).toBe(homepage + "tasks");
  expect(await TasksPage.isTaskOnPage(userData.task2)).toBeFalsy();
});

// negative
test("Check account deletion", async () => {
  await CommonUtils.sleep(5000);
  await CommonUtils.openLoginPage();
  await CommonUtils.sleep(2000);
  await LoginPage.fillLoginData(userData.username, userData.newPassword);
  await LoginPage.clickLoginButton();
  await CommonUtils.sleep(2000);
  await CommonUtils.openUserPopup();
  await CommonUtils.openSettingsPage();
  await SettingsPage.clickDeleteAccount();
  await SettingsPage.submitAccountDeletion(userData.newPassword);
  // await pageload
  await CommonUtils.sleep(3000);
  await loginWithTestData();
  await CommonUtils.sleep(1000);
  expect(await sel.getCurrentLink()).toBe(homepage + "login");
});
