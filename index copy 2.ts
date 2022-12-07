import puppeteer = require('puppeteer');
require('dotenv').config({ path: __dirname + '/.env' });

async function connect(identifier:string, password:string){
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://0380033e.index-education.net/pronote/eleve.html');
    console.log('page found');
    await page.waitForSelector('#id_23');
    console.log('identifier box found');
    await page.type('#id_23', identifier);
    await page.type('#id_24', password);
    console.log('id and pw add');
    await page.click('#id_12');
    await page.waitForSelector('#GInterface_T');
    console.log('connected');
    return page;
}
// async function getNotifNumber(page:puppeteer.Page){
//     await page.waitForSelector('.bcne_compteur_notif');
//     const result = await page.evaluate(() => {
//         let number = document.querySelector("bcne_compteur_notif").textContent
        
//     })
async function getNotifNumber(page:puppeteer.Page){
    const result = await page.evaluate(() => {
    return document.querySelector('.bcne_compteur_notif').textContent;
  
  });
    console.log(result);
    return result;
}

async function refresh(page:puppeteer.Page){
    await page.reload();
    await page.waitForSelector('#GInterface_T');
}

async function getAverage(page:puppeteer.Page) {
    await page.waitForSelector('#id_83id_38');
    await page.click('#id_83id_38');
    await page.waitForSelector('.AlignementDroit');
    console.log('pug');
    const moyenne = await page.evaluate(() => {
        // console.log(document.querySelectorAll('.AlignementDroit'));
        return document.querySelector('.GrasInlineBlockPetitEspaceHautPetitEspaceBasEspaceDroitEspaceGauche10').textContent;
        console.log('pufg');

    });
}


console.log('start');
connect(process.env.IDENTIFIER, process.env.PASSWORD).then(async(page)=>{
    await getAverage(page);
    const initial = await getAverage(page);
    setInterval(async ()=>{
        const average = await getAverage(page);
        console.log(average);
    },10000);

    // const initial = await getNotifNumber(page);
    // setInterval(async ()=>{
    //     await refresh(page);
    //     const notif = await getNotifNumber(page);
    //     if(notif>initial){
    //         console.log('puga');
    //     }
    // },10000);
})