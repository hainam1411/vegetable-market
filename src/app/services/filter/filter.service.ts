import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }


  filterProducts(products: any[], filterOptions: any): any[] {
    const filters = [
      this.filterByCategory(filterOptions.category),
      this.filterByDate(filterOptions.CreatedFrom, filterOptions.CreatedTo),
      this.filterByPriceRange(filterOptions.priceFrom, filterOptions.priceTo)
    ];

    // Chi duyet productlist 1 lan
    let filteredProducts = products.filter(product => filters.every(filter => filter(product)));
    //
    if (filterOptions.price) {
      filteredProducts.sort((a, b) => filterOptions.price === 'asc' ? a.productPrice - b.productPrice : b.productPrice - a.productPrice);
    }

    if (filterOptions.sortByName) {
      filteredProducts.sort((a, b) => {
        const nameA = (a.productName || '').toString().trim().toLowerCase();
        const nameB = (b.productName || '').toString().trim().toLowerCase();
        return filterOptions.sortByName === 'asc' ? a.productName.localeCompare(b.productName) : b.productName.localeCompare(a.productName);
      });

    }

    return filteredProducts;
  }

  private filterByCategory(categoryId?: number) {
    return (product: any) => {
      console.log(`Filtering by category: ${categoryId}, Product category: ${product.categoryId}`);
      return !categoryId || product.categoryId === categoryId;
    };
  }


  private filterByDate(from?: string, to?: string) {
    return (product: any) => {
      const createdDate = new Date(product.createdDate).toISOString().split("T")[0];
      const fromDate = from ? new Date(from).toISOString().split("T")[0] : null;
      const toDate = to ? new Date(to).toISOString().split("T")[0] : null;

      console.log("Checking:", { createdDate, fromDate, toDate });

      return (!fromDate || createdDate >= fromDate) && (!toDate || createdDate <= toDate);
    };
  }


  private filterByPriceRange(min?: number, max?: number) {
    return (product: any) => {
      return (min == null || product.productPrice >= min) && (max == null || product.productPrice <= max);
    };
  }

}
