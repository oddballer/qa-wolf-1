Take home assignment I was given by QA Wolf. 

The objective was to modify the index.js to test that the first 100 articles on the page were shown in order of recency. 

Required the use of Playwright.

Each article on the news page has a child element with the '.age' class. These elements contain a 'title' attribute which holds a timestamp as a value. This is the time the article was submitted.
My approach was to collect all of these elements using a locator, transform the timestamps contained in their attributes into Dates, and then compare the Dates sequentially to ensure that the articles were correctly appearing by recency.
