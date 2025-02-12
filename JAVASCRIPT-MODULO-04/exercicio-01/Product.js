class Product {
    constructor(name, description, price, inStock) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.inStock = inStock;
    }

    addToStock(quantity) {
        this.inStock += quantity;
    }

    calculateDiscount(porcentage) {
        const discount = this.price * (porcentage / 100);
        return this.price - discount;
    }
}

const product = new Product("Product", "Description", 80, 10);

console.log(product);

product.addToStock(10);

console.log(product);
console.log(product.calculateDiscount(15));

