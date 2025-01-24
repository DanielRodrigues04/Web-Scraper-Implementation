import React, { useState } from 'react';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { ScrapingForm } from './components/ScrapingForm';
import { ProductList } from './components/ProductList';
import { ScrapedProduct } from './types';
import { Bot } from 'lucide-react';

function App() {
  const [products, setProducts] = useState<ScrapedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleScrape = async (url: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Using a CORS proxy to bypass CORS restrictions
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
      const response = await axios.get(proxyUrl);
      const html = response.data;
      const $ = cheerio.load(html);
      
      const scrapedProducts: ScrapedProduct[] = [];
      
      // Example selectors - these would need to be adjusted based on the target website
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
      
      setProducts(scrapedProducts);
    } catch (err) {
      setError('Failed to scrape the website. Please check the URL and try again.');
      console.error('Scraping error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Bot size={32} className="text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Web Scraper</h1>
            </div>
            <p className="text-gray-600 max-w-xl">
              Enter a website URL to scrape product information. Please note that some websites
              may block scraping attempts or require specific selectors to work properly.
            </p>
          </div>

          <ScrapingForm onScrape={handleScrape} isLoading={isLoading} />
          
          {error && (
            <div className="w-full max-w-2xl p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
              {error}
            </div>
          )}

          <ProductList products={products} />
        </div>
      </div>
    </div>
  );
}

export default App;