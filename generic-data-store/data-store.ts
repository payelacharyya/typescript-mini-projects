interface Identifiable {
    id: number;
}

class dataStore <T extends Identifiable> {
    private items: T[] =[];

    //add an item
    add(item: T): void {
        const exists = this.items.some(existing => existing.id === item.id);

        if(exists) {
            throw new Error(`Item with id ${item.id} already exists`);
        }
        this.items.push(item);
        console.log(`Item with id ${item.id} added successfully`)
    }
getAll(): readonly T[] {
    return this.items;
}

// remove item by id

remove(id : number): void {
    const initialLength = this.items.length;

    this.items = this.items.filter(item => item.id !== id);

    if(this.items.length === initialLength){
        console.log('No item found')
    } else {
        console.log('Item deleted successfully')
    }
}

}

//create types

interface User extends Identifiable {
    name: string;
    email: string;
}
interface Product extends Identifiable {
    title: string;
    price: number;
}

//database with user

const userStore = new dataStore<User>();

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
const productStore = new dataStore<Product>();

productStore.add ({
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