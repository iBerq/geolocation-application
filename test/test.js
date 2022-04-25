const { Builder, By, Key, util } = require("selenium-webdriver");
require("chromedriver");

var driver;

async function specialCharacterCheck() {
  driver = await new Builder().forBrowser("chrome").build();

  await driver.get(__dirname + "/../index.html");
  await driver.findElement(By.id("country-btn")).click();
  await driver.findElement(By.id("lat")).sendKeys("**");

  await driver.sleep(5000);
  await driver.quit();
}
async function checkText() {
  driver = await new Builder().forBrowser("chrome").build();

  await driver.get(__dirname + "/../index.html");
  await driver.findElement(By.id("country-btn")).click();
  await driver.findElement(By.id("lat")).sendKeys("abcdef");

  await driver.sleep(5000);
  await driver.quit();
}
async function unrealCoordinatesCheck() {
  driver = await new Builder().forBrowser("chrome").build();

  await driver.get(__dirname + "/../index.html");
  await driver.findElement(By.id("country-btn")).click();
  await driver.findElement(By.id("lat")).sendKeys("22222222");
  await driver.findElement(By.id("lon")).sendKeys("22222222");
  await driver.findElement(By.className("row-submit")).click();

  await driver.sleep(5000);
  await driver.quit();
}
async function realCoordinatesCheck() {
  driver = await new Builder().forBrowser("chrome").build();

  await driver.get(__dirname + "/../index.html");
  await driver.findElement(By.id("country-btn")).click();
  await driver.findElement(By.id("lat")).sendKeys("22");
  await driver.findElement(By.id("lon")).sendKeys("22");
  await driver.findElement(By.className("row-submit")).click();

  await driver.sleep(5000);
  await driver.quit();
}
async function moonCoreDistanceCheck() {
  driver = await new Builder().forBrowser("chrome").build();

  await driver.get(__dirname + "/../index.html");
  await driver.findElement(By.id("moon-btn")).click();
  await driver.findElement(By.id("lat")).sendKeys("22");
  await driver.findElement(By.id("lon")).sendKeys("15");
  await driver.findElement(By.id("calc-dist-moon-btn")).click();
  var expected = "Distance to moon's core from your location 373455.85 km.";
  var actual = driver.findElement(By.id("dist-moon")).getText();
  if (expected == actual) {
    console.log("correct");
  } else {
    console.log("false");
  }

  await driver.sleep(5000);
  await driver.quit();
}

//specialCharacterCheck();
//checkText();
//unrealCoordinatesCheck();
//realCoordinatesCheck();
//moonCoreDistanceCheck();
