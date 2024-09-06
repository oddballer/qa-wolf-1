// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");

// Variable introduced to record how many articles have been successfully checked
let articlesChecked = 0;
// Variable introduced to hold the date of the previously checked article against the next -- allows for easy comparison 
let previousDate;
// Constant variable used to hold the base URL path to the Y-Combinator news page
const BASE_URL = "https://news.ycombinator.com/"

async function sortHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com/newest");

// Initial call to articleSortingCheck function
  await articleSortingCheck(page);

}

(async () => {
  await sortHackerNewsArticles();

})();

// Function that checks to ensure that articles on the current page appear from newest to oldest, descending.
// Takes a Page as a parameter and iterates through all elements on the page with a '.age' class.
// Elements with the '.age' class have a 'title' attirbute which contains a timestamp of when the article was posted. 
// These timestamps are converted into Date objects and compared against each other in order to ensure the articles are sorted as expected.
// At the end of the function, the 'More' button is pressed on the page which loads an additional 30 articles. 
// The function then calls itself recursively. This continues until 100 total articles have been checked.
// If the articles are found to be out of order, the process will abort.
async function articleSortingCheck(page){

  for (const article of await page.locator('.age').all()){
    if (articlesChecked == 100){
      console.log("Article check complete. No issues with article sorting encountered.");
      process.exit();
    }
    articlesChecked++;
    let currentDate = new Date(await article.getAttribute('title'));

    // previousDate will be null on first iteration. Assigns currentDate to previousDate and continues to second iteration.
    if (previousDate == null){
      previousDate = currentDate;
      continue;
    }
    
    // Check to ensure that the previous article is more recent than the next. Ex: Article one should be more recent than article two.
    if(previousDate >= currentDate){
      console.log(previousDate + " is more recent than " + currentDate + " proceeding.");
      previousDate = currentDate;
      console.log(articlesChecked + " articles checked.");
    } else {
      console.log(previousDate + " " + currentDate);
      console.log("Article order was found to be incorrect. Aborting.");
      process.exit();
    }

  }

  // Retrieve the next 30 articles by clicking the 'More' button on the page.
  await page.goto(BASE_URL + await page.locator('.morelink').getAttribute('href'));
  // Calls this function recursively to check the new set of 30 articles retrieved by the line above.
  await articleSortingCheck(page);
};