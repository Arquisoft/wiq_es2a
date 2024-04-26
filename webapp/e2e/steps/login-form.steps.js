const puppeteer = require('puppeteer');
const { defineFeature, loadFeature }=require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions
const feature = loadFeature('./features/login-form.feature');

let page;
let browser;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false, slowMo: 100 });
    page = await browser.newPage();
    //Way of setting up the timeout
    setDefaultOptions({ timeout: 10000 })

    await page
      .goto("http://localhost:3000", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  test('The user is registered in the site', ({given,when,then}) => {
    
    let username;
    let password;

    given('A registered user', async () => {
      username = "j"
      password = "j"
      await expect(page).toClick('button', { text: 'Login' })
    });

    when('I fill the data in the form and press submit', async () => {
      await expect(page).toFill('input[name="username"]', username);
      await expect(page).toFill('input[name="password"]', password);
      await expect(page).toClick('button', { text: 'Login' })
    });

    then('Home should be shown in the screen', async () => {
        await expect(page).toMatchElement("button", { text: "Jugar" });
        await expect(page).toMatchElement("button", { text: "Ver historial" });
        await expect(page).toMatchElement("input[type='number']");
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});