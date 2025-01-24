# Web Scraper

A modern web scraper built with React, TypeScript, and Cheerio to extract product information from e-commerce websites.

![Web Scraper Screenshot](https://images.unsplash.com/photo-1607706189992-eae578626c86?auto=format&fit=crop&q=80&w=2000)

## Features

- 🚀 Modern React with TypeScript
- 🎨 Clean UI with Tailwind CSS
- 🔍 Cheerio for HTML parsing
- 🌐 CORS proxy support
- ⚡ Fast and responsive
- 🛡️ Error handling
- 📱 Mobile-friendly design

## Example URLs

Here are some example URLs you can try with the web scraper. Note that you'll need to adjust the selectors in `App.tsx` based on the website's HTML structure.

### Amazon
```
https://www.amazon.com/dp/B07ZPKBL9V
```
Required selectors:
```javascript
const title = $('#productTitle').text().trim();
const price = $('#priceblock_ourprice').text().trim();
```

### Best Buy
```
https://www.bestbuy.com/site/apple-airpods-pro-2nd-generation-white/6509462.p
```
Required selectors:
```javascript
const title = $('.heading-5').text().trim();
const price = $('.priceView-customer-price span').first().text().trim();
```

### Walmart
```
https://www.walmart.com/ip/iPhone-13-Pro-Max/487544323
```
Required selectors:
```javascript
const title = '[data-testid="product-title"]';
const price = '[data-testid="price"]';
```

## How to Use

1. Enter a URL from any e-commerce website
2. Adjust the selectors in `App.tsx` to match the website's HTML structure:

```typescript
// Example of adjusting selectors in App.tsx
$('div.product').each((_, element) => {
  const title = $(element).find('.product-title').text().trim();
  const price = $(element).find('.product-price').text().trim();
  
  if (title && price) {
    scrapedProducts.push({
      title,
      price,
      url: url
    });
  }
});
```

3. Click the "Scrape" button
4. View the extracted product information

## Important Notes

- Some websites may block scraping attempts
- The CORS proxy (allorigins.win) has rate limits
- Always check the website's robots.txt and terms of service before scraping
- Some websites use dynamic rendering (JavaScript), which may require additional tools
- The example URLs and selectors may need updates as websites change their structure

## Legal Considerations

Before using this web scraper, please:
- Review the website's Terms of Service
- Check robots.txt for scraping permissions
- Respect rate limits and crawling policies
- Ensure compliance with local data protection laws
- Use the data in accordance with fair use policies

## Development

To run the project locally:

```bash
npm install
npm run dev
```

The development server will start at `http://localhost:5173`