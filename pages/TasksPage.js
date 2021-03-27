const sel = require("../utils/SelUtils");

const { By } = require("selenium-webdriver");
const CommonUtils = require("./CommonUtils");
module.exports = class TaskPage {
  static async fillNewTaskField(taskName) {
    const input = await sel.driver.findElement(
      By.xpath("//*[@id='root']/main/div[3]/div[1]/form/div/div/input")
    );
    await input.clear();
    await input.sendKeys(taskName ?? "");
    await CommonUtils.sleep(1000);
  }
  static async clickCreateTaskButton() {
    await CommonUtils.sleep(500);
    const btn = await sel.driver.findElement(
      By.xpath(
        "//*[@id='root']/main/div[3]/div[1]/form/button[@name='submit_task']"
      )
    );
    await btn.click();
    await CommonUtils.sleep(1000);
  }
  static async createTask(taskName) {
    await this.fillNewTaskField(taskName);
    await this.clickCreateTaskButton();
  }
  static async isTaskOnPage(taskName) {
    const task = await sel.driver.findElements(
      By.xpath(`//div[text()='${taskName}']`)
    );
    return task.length ? true : false;
  }
  static async deleteTask(taskName) {
    const taskIsAvailable = await TaskPage.isTaskOnPage(taskName);
    if (!taskIsAvailable) {
      throw new Error(`Task named "${taskName}" currently is not on the page.`);
    } else {
      const deleteBtn = await sel.driver.findElements(
        By.xpath(`//div[text()='${taskName}']//following::div[1]//button`)
      );
      console.log(deleteBtn);
      await deleteBtn[0].click();
    }
  }
};
