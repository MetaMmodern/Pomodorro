const script = require("jest");
const { Given, When, Then, Before } = require("@cucumber/cucumber");
const setCookie = require("set-cookie-parser");
const fetch = require("node-fetch");
const expect = require("expect");

Before(function () {
  this.homepage = process?.env?.homepage || "http://localhost:5000";
  console.log("beforestep called");
});

Given("user set new user data as:", function (dataTable) {
  this.userData = dataTable.hashes()[0];
});

When("user sends registration request", async function () {
  // console.log(this);
  this.response = await fetch(`${this.homepage}/api/auth/register`, {
    method: "POST",
    body: JSON.stringify({
      email: this.userData.username,
      password: this.userData.password,
    }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
});

Then("the registration should be succesful", function () {
  expect(this?.response?.status).toBe(201);
});

When("user tries to login with set data", async function () {
  this.response = await fetch(`${this.homepage}/api/auth/login`, {
    method: "POST",
    credentials: "same-origin",
    body: JSON.stringify({
      email: this.userData.username,
      password: this.userData.password,
    }),
    headers: { "content-type": "application/json" },
  });
});

Then("the login should be succesful", function () {
  expect(this?.response?.status).toBe(200);
});

Then("save response cookies", function () {
  const data = this?.response?.headers;
  const cookies = setCookie.parse(data.get("set-cookie"), {
    decodeValues: true, // default: true
    map: true, //default: false
  });
  this.userData.access_token = cookies?.access_token?.value;
  this.userData.cookie = data.get("set-cookie");
});

Given(/^user set confirmation password as: (.*)$/, function (pwd) {
  this.userData.submitPassword = pwd;
});

When("user sends account deletion request", async function () {
  this.response = await fetch(`${this.homepage}/api/settings/delete/account`, {
    method: "POST",
    credentials: "same-origin",
    body: JSON.stringify({ submitPasswd: this.userData.submitPassword }),
    headers: {
      "content-type": "application/json",
      access_token: "Bearer " + this.userData.access_token,
      Cookie: this.userData.cookie,
    },
  });
});

Then("account deletion should be succesful", function () {
  expect(this?.response?.status).toBe(200);
});

Then("the login should fail", function () {
  expect(this?.response?.status).not.toBe(200);
});
