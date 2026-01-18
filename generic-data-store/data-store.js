"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class dataStore {
    items = [];
    //add an item
    add(item) {
        const exists = this.items.some(existing => existing.id === item.id);
        if (exists) {
            throw new Error(`Item with id ${item.id} already exists`);
        }
        this.items.push(item);
        console.log(`Item with id ${item.id} added successfully`);
    }
    getAll() {
        return this.items;
    }
    // remove item by id
    remove(id) {
        const initialLength = this.items.length;
        this.items = this.items.filter(item => item.id !== id);
        if (this.items.length === initialLength) {
            console.log('No item found');
        }
        else {
            console.log('Item deleted successfully');
        }
    }
}
//database with user
const userStore = new dataStore();
userStore.add({
    id: 1,
    name: "Payel",
    email: "abc@exam.com"
});
userStore.add({
    id: 2,
    name: "Alex",
    email: "alex@example.com"
});
console.log("Users:", userStore.getAll());
userStore.remove(1);
console.log("users after removal:", userStore.getAll());
//database with products
const productStore = new dataStore();
productStore.add({
    id: 101,
    title: "Laptop",
    price: 75000
});
productStore.add({
    id: 102,
    title: "Headphones",
    price: 3000
});
console.log("Products:", productStore.getAll());
productStore.remove(101);
console.log("Products after removal:", productStore.getAll());
//# sourceMappingURL=data-store.js.map