// SHOPPING CART

class ShoppingCart {
  constructor(){
    this.products = [];
  };

  addProduct(product){
    const productIdx = this.products.findIndex(p => p.articleNumber === product.articleNumber);
    if(productIdx === -1){
      this.products.push({...product, quantity: 1, total: product.price});
    }else{
      this.products[productIdx].quantity++;
      this.products[productIdx].total += product.price;
    }
    this.displayProducts();
  }

  removeProduct(articleNumber){
    const productIdx = this.products.findIndex(p => p.articleNumber === articleNumber);
    if(productIdx !== -1){
      if(this.products[productIdx].quantity === 1){
        this.products = this.products.filter(p => p.articleNumber !== articleNumber);
      }else{
        this.products[productIdx].quantity--;
        this.products[productIdx].total -= this.products[productIdx].price;
      }
    }
    this.displayProducts();
  }

  checkout(){
    const totalPrice = this.products.reduce((sum, product) => product.total + sum  , 0);
    let balance = a // send request to the server to get the client cash balance;
    if(totalPrice > balance){
      console.log('Insufficient funds! Please try again');
    }else{
      balance = balance - totalPrice; 
      // send requet to update new balance for the client 
      console.log('Purchase successful!');
    }
  }

  displayProducts(){
    this.products.forEach(p => {
      console.log('\n' + p.name);
      console.log('-'.repeat(p.name.length));
      console.log(`Article No: ${p.articleNumber}`);
      console.log(`Quantity: ${p.quantity}`);
      console.log(`Price: ${p.price}`);
      console.log(`Total: ${p.total}`);
    });
  }
}


//  CATEGORY

class Category {
  constructor(name){
    this.name = name;
    this.products = [];
    this.categories = [];
  }

  assignProduct(product){
    const productIdx = this.products.findIndex(p => p.articleNumber === product.articleNumber);
    if(productIdx === -1){
      this.products.push(product);
    }else{
      console.log('Product already assigned to this category');
    }
  }

  addSubCategory(name){
    const category = new Category(name);
    this.categories.push(category);
  }

  displayCategories(){
    console.log('\n' + this.name);
    console.log('-'.repeat(this.name.length));
    this.displayProducts(this, 4);
    this.categories.forEach((c, i) => {
      const spacing = ' '.repeat(i + 4);
      console.log('\n' + spacing + c.name);
      console.log(spacing + '-'.repeat(c.name.length));
      this.displayProducts(c, i + 8);
    });
  }

  displayProducts(category, indent=0){
    const spacing = ' '.repeat(indent);
    category.products.forEach(p => {
      console.log('\n' + spacing + p.name);
      console.log(spacing + '-'.repeat(p.name.length));
      console.log(spacing + `Article No: ${p.articleNumber}`);
      console.log(spacing + `Price: ${p.price}`);
      // loop through pictures array and display them with <img /> tag
    });
  }
}


// PRODUCT 

const ProductType = {
  NORMAL: 'NORMAL',
  DIGITAL: 'DIGITAL'
}

class Product {

  constructor({name, articleNumber, price, pictures=[], type, stock, downloadLink, email}){
    this.name = name;
    this.articleNumber = articleNumber;
    this.prices = [price];
    this.pictures = pictures;
    this.type = type;
    this.events = {}; 
    if(type === ProductType.NORMAL){
      this.stock = stock;
    }
    if(type === ProductType.DIGITAL){
      if(email) this.email = email;
      if(downloadLink) this.downloadLink = downloadLink;
    }
  }

  on(eventName, listener){
    if(!Array.isArray(this.events[eventName])){
      this.events[eventName] = []; 
    }
    this.events[eventName].push(listener);
  }

  once(eventName, listener){
    this.on(eventName, function g(...args) {
      this.off(eventName, g);
      listener.apply(this, args);
    });
  }

  off(eventName, listener){
    if(Array.isArray(this.events[eventName])){
      const idx = this.events[eventName].indexOf(listener);
      if(idx > -1){
        this.events[eventName].splice(idx, 1);
      }
    }
  }

  emit(eventName, ...args){
    if(Array.isArray(this.events[eventName])){
      this.events[eventName].forEach(listener => listener.apply(this, args));
    }
  }
}


//  USER

const UserType = {
  BUYER: 'BUYER',
  SELLER: 'SELLER'
}

class User {
  constructor(name, address, type=UserType.BUYER){
    this.name = name;
    this.address = address;
    this.type = type;
  }
}