const puppeteer = require('puppeteer');
const { defineFeature, loadFeature }=require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions
const feature = loadFeature('./features/record-button.feature');

let page;
let browser;

defineFeature(feature, test => {
  
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: false, slowMo: 20 });
    page = await browser.newPage();
    //Way of setting up the timeout
    setDefaultOptions({ timeout: 10000 })

    await page
      .goto("http://localhost:3000", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });

  test('The authenticated user can see their records', ({given, when, then}) => {
    let username;
    let password;
  
    given('An authenticated user', async () => {
      username = "record2";
      password = "record1";
      await expect(page).toClick('button', { text: 'SignUp' });
      await expect(page).toFill('input[name="username"]', username);
      await expect(page).toFill('input[name="password"]', password);
      await expect(page).toClick('button', { text: 'Add User' });
      await expect(page).toClick('a', { text: 'Already have an account? Login here.' });
      await expect(page).toClick('button', { text: 'Login' });
      await expect(page).toFill('input[name="username"]', username);
      await expect(page).toFill('input[name="password"]', password);
      await expect(page).toClick('button', { text: 'Login' });
    });
  
    when('I navigate to the records page', async () => {
      await expect(page).toClick('button', { text: 'Ver historial' });
    });
  
    then('I can see my records', async () => {
        await expect(page.url()).toBe('http://localhost:3000/history');
        await expect(page).toMatchElement("th", { text: "Preguntas acertadas" });
        await expect(page).toMatchElement("th", { text: "Nº preguntas" });
        await expect(page).toMatchElement("th", { text: "Tiempo total" });
        await expect(page).toMatchElement("th", { text: "Fecha" });
    });
  });

  afterAll(async ()=>{
    browser.close()
  })

});