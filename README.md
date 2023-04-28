# mini-erp

```mermaid
classDiagram
  class Inventory {
    <<Model>>
    -uuid: uuid
    -name: string
    -description: string
    -location: string
    +getProducts(): Promise<Product[]>
  }

  class Product {
    <<Model>>
    -uuid: uuid
    -sku: string
    -description: string
  }

  Inventory "1" *-- "*" Product : contains
```