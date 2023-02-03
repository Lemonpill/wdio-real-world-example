/**
 * these commands are not yet being used
 * waiting to implement those using POM
 */


async function waitClick(element) {
  await element.waitForExist();
  await element.waitForDisplayed();
  await element.click();
}

async function waitClearFill(element, value) {
  await element.waitForExist();
  await element.waitForDisplayed();
  await element.clear();
  await element.sendKeys(value);
}

export const commands = { 
    waitClick, 
    waitClearFill 
};
