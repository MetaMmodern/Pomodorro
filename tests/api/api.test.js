require("chromedriver");
const script = require("jest");
const fetch = require("node-fetch");
const setCookie = require("set-cookie-parser");
jest.setTimeout(100000);

let homepage = "http://localhost:5000";
const userData = {
  login: "test_kpi@gmail.com",
  username: "newUsernameTest_kpi",
  password: "test_kpi_test_kpi",
  newPassword: "test_kpi_test_kpi_222",
  task1: "task1",
  task2: "task2",
};

const loginWithTestData = async () => {
  // try {
  //   await CommonUtils.openLoginPage();
  //   await CommonUtils.sleep(2000);
  // } catch (error) {}
  // await LoginPage.fillLoginData(userData.login, userData.password);
  // await LoginPage.clickLoginButton();
  // await CommonUtils.sleep(2000);
  // try {
  //   expect(await sel.getCurrentLink()).toBe('"http://localhost:3000/"');
  // } catch (error) {
  //   throw new Error("NO_USER");
  // }
};
beforeAll(async () => {});

afterEach(async () => {
  {
  }
});

afterAll(async () => {});

test("Test user create", async () => {
  const res = await fetch(`${homepage}/api/auth/register`, {
    method: "POST",
    body: JSON.stringify({
      email: userData.login,
      password: userData.password,
    }),
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  });

  expect(res.status).toBe(201);
});
test("Test task add", async () => {
  const res = await fetch(`${homepage}/api/auth/login`, {
    method: "POST",
    credentials: "same-origin",
    body: JSON.stringify({
      email: userData.email,
      password: userData.password,
    }),
    headers: { "content-type": "application/json" },
  });
  const data = res.headers;
  const cookies = setCookie.parse(data.get("set-cookie"), {
    decodeValues: true, // default: true
    map: true, //default: false
  });
  console.log(cookies.access_token);
  expect(res.status).toBe(200);

  userData.access_token = cookies.access_token.value;
  userData.cookie = data.get("set-cookie");

  const res2 = await fetch(`${homepage}/api/tasks/create`, {
    method: "POST",
    credentials: "same-origin",
    body: JSON.stringify({
      name: userData.task1,
    }),
    headers: {
      "content-type": "application/json",
      access_token: "Bearer " + userData.access_token,
      Cookie: userData.cookie,
    },
  });
  console.log(await res2.json());
  expect(res2.status).toBe(200);
});
test("Test task delete", async () => {
  const res = await fetch(`${homepage}/api/tasks/`, {
    method: "GET",
    credentials: "same-origin",
    headers: {
      "content-type": "application/json",
      access_token: "Bearer " + userData.access_token,
      Cookie: userData.cookie,
    },
  });
  const allTasks = await res.json();
  console.log(allTasks);
  const taskId = allTasks["0"]._id;
  const res2 = await fetch(`${homepage}/api/tasks/delete/${taskId}`, {
    method: "GET",
    credentials: "same-origin",
    headers: {
      "content-type": "application/json",
      access_token: "Bearer " + userData.access_token,
      Cookie: userData.cookie,
    },
  });
  console.log(await res2.json());
  expect(res2.status).toBe(200);
});
test("Test user delete", async () => {
  const res2 = await fetch(`${homepage}/api/settings/delete/account`, {
    method: "POST",
    credentials: "same-origin",
    body: JSON.stringify({ submitPasswd: userData.password }),
    headers: {
      "content-type": "application/json",
      access_token: "Bearer " + userData.access_token,
      Cookie: userData.cookie,
    },
  });
  console.log(await res2.json());
  expect(res2.status).toBe(200);
});
