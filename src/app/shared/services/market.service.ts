import { Injectable } from '@angular/core';
import { Type } from '../../core/models/type';
import { Market } from '../../core/models/market';
import { MarketItem } from '../../core/models/marketItems';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarketService {
  private marketsSubject = new BehaviorSubject<Market[]>(this.getMarkets()); // Başlangıç verisi eklendi
  markets$ = this.marketsSubject.asObservable();

  constructor() { }

  updateMarkets(markets: Market[]) {
    this.marketsSubject.next(markets);
  }
  getTypes(): Type[] {
    return [
      { id: 1, name: 'Gıda' },
      { id: 2, name: 'Temizlik' },
      { id: 3, name: 'Kırtasiye' },
      { id: 4, name: 'Kozmetik' },
      { id: 5, name: 'Elektronik' }
    ];
  }

  getMarkets(): Market[] {
    const types = this.getTypes();
    
    const getTypeById = (id: number): Type => {
      return types.find(t => t.id === id) || { id: 0, name: 'Unknown' };
    };

    return [
      {
        "id": 1,
        "name": "A Market",
        "items": [
          {
            "id": 1,
            "marketId": 1,
            "aisle": {
              "id": 1,
              "name": 1
            },
            "type": getTypeById(1),
            "products": [
              {
                "id": "P1",
                "name": "Ekmek",
                "aisle": {id:1,name:1},
                "marketId": 1
              },
              {
                "id": "P2",
                "name": "Süt",
                "aisle": {id:1,name:1},
                "marketId": 1
              }
            ]
          },
          {
            "id": 2,
            "marketId": 1,
            "aisle": {
              "id": 2,
              "name": 2
            },
            "type": getTypeById(2),
            "products": [
              {
                "id": "P3",
                "name": "Deterjan",
                "aisle": {id:2,name:2},
                "marketId": 1
              },
              {
                "id": "P4",
                "name": "Sabun",
                "aisle": {id:2,name:2},
                "marketId": 1
              }
            ]
          },
          {
            "id": 3,
            "marketId": 1,
            "aisle": {
              "id": 3,
              "name": 3
            },
            "type": getTypeById(5),
            "products": [
              {
                "id": "P5",
                "name": "Pil",
                "aisle": {id:3,name:3},
                "marketId": 1
              },
              {
                "id": "P6",
                "name": "Şarj Cihazı",
                "aisle": {id:3,name:3},
                "marketId": 1
              }
            ]
          }
        ]
      },
      {
        "id": 2,
        "name": "B Market",
        "items": [
          {
            "id": 4,
            "marketId": 2,
            "aisle": {
              "id": 4,
              "name": 1
            },
            "type": getTypeById(4),
            "products": [
              {
                "id": "P7",
                "name": "Şampuan",
                "aisle": {id:4,name:4},
                "marketId": 2
              },
              {
                "id": "P8",
                "name": "Diş Macunu",
                "aisle": {id:4,name:4},
                "marketId": 2
              }
            ]
          },
          {
            "id": 5,
            "marketId": 2,
            "aisle": {
              "id": 4,
              "name": 2
            },
            "type": getTypeById(3),
            "products": [
              {
                "id": "P9",
                "name": "Kalem",
                "aisle": {id:5,name:5},
                "marketId": 2
              },
              {
                "id": "P10",
                "name": "Defter",
                "aisle": {id:5,name:5},
                "marketId": 2
              }
            ]
          }
        ]
      }
    ];
  }
}
