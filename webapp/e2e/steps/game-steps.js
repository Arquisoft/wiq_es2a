const puppeteer = require('puppeteer');
const { defineFeature, loadFeature }=require('jest-cucumber');
const setDefaultOptions = require('expect-puppeteer').setDefaultOptions
const feature = loadFeature('./features/game.feature');

let page;
let browser;

defineFeature(feature, test => {
  
  beforeEach(async () => {
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

  test('The authenticated user plays a game and clicks the correct answer', ({given, when, then}) => {
    let username;
    let password;
  
    given('An authenticated user', async () => {
      username = "game1";
      password = "game";
      await expect(page).toClick('button', { text: 'SignUp' });
      await expect(page).toFill('input[name="username"]', username);
      await expect(page).toFill('input[name="password"]', password);
      await expect(page).toClick('button', { text: 'Add User' });
      await expect(page).toClick('a', { text: 'Already have an account? Login here.' });
      await expect(page).toFill('input[name="username"]', username);
      await expect(page).toFill('input[name="password"]', password);
      await expect(page).toClick('button', { text: 'Login' });
    });
  
    when('I navigate to the game page and I click the correct answer', async () => {
      await expect(page).toClick('button', { text: 'Jugar' });
      await expect(page).toMatchElement("h1", { text: "Cargando..." });
      await expect(page).toMatchElement("h1", { text: "Pregunta Nº1" });
      await expect(page).toClick('label[data-iscorrect="true"]');
    });
  
    then('The button turns green and the number of questions answered correctly increments one', async () => {
        const labelHasActiveClass = await page.$eval('label[data-iscorrect="true"]', label => {
            return label.classList.contains('active');
        });
        // Compruebo que el boton se ha activado
        expect(labelHasActiveClass).toBe(true);
        const labelStyle = await page.$eval('label[data-iscorrect="true"]', label => {
            const style = window.getComputedStyle(label);
            return {
              color: style.color,
              backgroundColor: style.backgroundColor
            };
          });
          
          // Compruebo que el color sea verde
          expect(labelStyle.backgroundColor).toBe('rgb(0, 128, 0)');
        await expect(page).toMatchElement("p", { text: "Preguntas acertadas: 1" });
        
    });
  });

  test('The authenticated user plays a game and clicks an incorrect answer', ({given, when, then}) => {
    let username;
    let password;
  
    given('An authenticated user', async () => {
      username = "game1";
      password = "game";
      await expect(page).toClick('button', { text: 'Login' });
      await expect(page).toFill('input[name="username"]', username);
      await expect(page).toFill('input[name="password"]', password);
      await expect(page).toClick('button', { text: 'Login' });
    });
  
    when('I navigate to the game page and I click an incorrect answer', async () => {
      await page.waitForSelector('input[type="range"]');
      await page.$eval('input[type="range"]', input => {
        input.value = 1;
      });
      await expect(page).toClick('button', { text: 'Jugar' });
      await expect(page).toMatchElement("h1", { text: "Cargando..." });
      await expect(page).toMatchElement("h1", { text: "Pregunta Nº1" });
      await expect(page).toClick('label[data-iscorrect="false"]');
    });
  
    then('The button turns red and the number of questions answered correctly is 0', async () => { 
          const labelsWithActiveClass = await page.$$eval('label[data-iscorrect="false"]', labels => {
            return labels.map(label => {
              const isActive = label.classList.contains('active');
              const backgroundColor = window.getComputedStyle(label).backgroundColor;
              return { isActive, backgroundColor };
            });
          });
          
          // Comprueba si alguna etiqueta activa tiene el color rojo y está activada
          const hasRedActiveLabel = labelsWithActiveClass.some(label => label.isActive && label.backgroundColor === 'rgb(255, 0, 0)');
          
          expect(hasRedActiveLabel).toBe(true);
          await expect(page).toMatchElement("p", { text: "Preguntas acertadas: 0" });
    });
  });

  afterEach(async ()=>{
    browser.close()
  })

});