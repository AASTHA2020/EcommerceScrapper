// src/scraper.js

const axios = require('axios');
const cheerio = require('cheerio');
const xlsx = require('xlsx');
const fs = require('fs');

// Define the URL of the e-commerce website (Books to Scrape)
const url = 'http://books.toscrape.com/';

// Function to fetch HTML from the website
async function fetchHTML(url) {
  const { data } = await axios.get(url);
  return cheerio.load(data);
}

// Function to scrape product data
async function scrapeProducts() {
  const $ = await fetchHTML(url);
  const products = [];

  $('.product_pod').each((index, element) => {
    const name = $(element).find('h3 a').attr('title').trim();
    const price = $(element).find('.price_color').text().trim();
    const availability = $(element).find('.availability').text().trim();
    const rating = $(element).find('.star-rating').attr('class').split(' ')[1].trim(); // Gets the class for rating

    products.push({
      name,
      price,
      availability,
      rating
    });
  });

  return products;
}

// Function to save data to Excel
function saveToExcel(products) {
  const workSheet = xlsx.utils.json_to_sheet(products);
  const workBook = xlsx.utils.book_new();

  xlsx.utils.book_append_sheet(workBook, workSheet, 'Products');
  xlsx.writeFile(workBook, './data/products.xlsx');
}

// Main function to execute scraping
(async () => {
  try {
    const products = await scrapeProducts();
    saveToExcel(products);
    console.log('Scraping completed and data saved to Excel file.');
  } catch (error) {
    console.error('Error during scraping:', error);
  }
})();
