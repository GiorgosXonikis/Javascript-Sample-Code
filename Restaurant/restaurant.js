class Restaurant {
    constructor(restaurantName) {
        this.restaurantName = restaurantName;
        this.dishes = [];
        this.orders = [];
        this.customers = {};
    }

    addDish = dish => {
        this.dishes.push(dish)
    }

    addCustomer = customer => {
        this.customers[customer.customerID] = customer.customerName;
    }

    orderDish = (dish, customer) => {
        this.orders.push([customer.customerID, dish]);
    }

    checkTotal = () => {
        this.orders.forEach((order, index) => {
            console.log(`Order #${index}: ${order[1].dishName} - ${order[1].dishPrice}`);
        });
    }

    checkCustomer = customer => {
        let totalBill = 0;

        let customerOrders = this.orders.filter(order => order[0] === customer.customerID);

        customerOrders.forEach((order, index) => {
            console.log(`Order #${index + 1}: ${order[1].dishName} - ${order[1].dishPrice}`);
            totalBill += order[1].dishPrice;
        });

        console.log(`Total: ${totalBill}`);
        return totalBill;
        
    }

    customerProfit = (customer) => {
        let profit = 0;

        let customerOrders = this.orders.filter(order => order[0] === customer.customerID);
        
        customerOrders.forEach(order => {
            profit += order[1].dishProfit(); 
        });

        console.log(`Customer: ${customer.customerName} - Profit ${profit}`);
        
    }

    totalProfit = () => {
        let profit = 0;
        this.orders.forEach(order => {            
            profit += order[1].dishProfit();            
        });
        console.log(`Total Profit: ${profit}`);   
    }

}



class Dish {
    constructor(dishName, dishPrice, ingredients) {
        this.dishName = dishName;
        this.dishPrice = dishPrice;
        this.ingredients = ingredients; // list of ingredients
    }

    dishCost = () => {
        let dishCost = 0;
        this.ingredients.forEach(element => {
            dishCost += element.ingredientCost;
        });

        return dishCost;
    }

    dishProfit(){
        return this.dishPrice - this.dishCost()
    }
}



class Ingredient {
    constructor(ingredientName, ingredientCost) {
        this.ingredientName = ingredientName;
        this.ingredientCost = ingredientCost;
    }

}




class Customer {
    constructor(customerName, customerID) {
        this.customerName = customerName;
        this.customerID = customerID;
    }
}


// Restaurant instance
const res = new Restaurant('Mythos');


// Ingredients instances
const cheese = new Ingredient('Cheese', 20);
const pepperoni = new Ingredient('Pepperoni', 30);
const dough = new Ingredient('Dough', 10);

const lettuce = new Ingredient('Lettuce', 8);
const tomato = new Ingredient('Tomato', 12);
const prosciuto = new Ingredient('Prosciuto', 45)


// Dish instances
const pizza = new Dish('Pizza', 95, [cheese, pepperoni, dough]);
const salad = new Dish('Salad', 55, [cheese, lettuce, tomato])
const prosciutoPizza = new Dish('Prosciuto Pizza', 115, [cheese, prosciuto, tomato])
const cheesePlate = new Dish('Plate of Cheze', 25, [cheese])

// Customer instances
const pluto = new Customer('Pluto', 1)
const goofy = new Customer('Goofy', 2)

res.addCustomer(pluto)
res.addCustomer(goofy)


res.addDish(pizza);
res.addDish(salad);
res.addDish(prosciutoPizza);
res.addDish(cheesePlate);


res.orderDish(salad, pluto);
res.orderDish(salad, goofy);
res.orderDish(pizza, pluto);
res.orderDish(prosciutoPizza, pluto);
res.orderDish(prosciutoPizza, goofy);
res.orderDish(cheesePlate, pluto);

res.checkTotal();
res.customerProfit(pluto);
res.customerProfit(goofy);
res.totalProfit();



