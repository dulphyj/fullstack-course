import { Injectable } from '@angular/core';
import { ItemCard } from '../common/item-cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Map<number, ItemCard> = new Map<number, ItemCard>();
  itemList: ItemCard[] = [];

  constructor() {}

  addItemCart(itemCard: ItemCard){
    this.items.set(itemCard.productId, itemCard);
  }

  deleteitemCard(productId: number){
    this.items.delete(productId);
  }

  totalCart(){
    let total: number = 0;
    this.items.forEach((item, clave) => {
      total += item.getTotalPriceItem();
    });
    return total;
  }

  convertToListFromMap(){
    this.itemList.splice(0, this.itemList.length);
    this.items.forEach((item, clave) => {
      this.itemList.push(item);
    });
    return this.itemList;
  }
}
