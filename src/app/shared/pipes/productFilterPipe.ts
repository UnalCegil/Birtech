import { Pipe, PipeTransform } from '@angular/core';
import { Market } from '../../core/models/market';
import { Product } from '../../core/models/product';

@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {
  transform(markets: Market[], searchText: string): Market[] {
    if (!markets || !searchText) {
      return markets;
    }

    searchText = searchText.toLowerCase();

    return markets.map(market => {
      const filteredItems = market.items.map(item => {
        const filteredProducts = item.products.filter((product:Product) =>
          product.name?.toLowerCase().includes(searchText)
        );
        return { ...item, products: filteredProducts };
      }).filter(item => item.products.length > 0);

      return { ...market, items: filteredItems };
    }).filter(market => market.items.length > 0);
  }
}