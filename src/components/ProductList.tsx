import React from 'react';
import { ExternalLink } from 'lucide-react';
import { ScrapedProduct } from '../types';

interface ProductListProps {
  products: ScrapedProduct[];
}

export function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-xl font-semibold mb-4">Scraped Products</h2>
      <div className="grid gap-4">
        {products.map((product, index) => (
          <div
            key={index}
            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-lg">{product.title}</h3>
                <p className="text-green-600 font-semibold mt-1">{product.price}</p>
              </div>
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                <ExternalLink size={20} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}