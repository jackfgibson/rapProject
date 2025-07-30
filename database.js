const fs = require('fs').promises;
const path = require('path');

const DB_PATH = path.join(__dirname, 'database.json');

class Database {
  constructor() {
    this.data = null;
  }

  async loadData() {
    try {
      const rawData = await fs.readFile(DB_PATH, 'utf8');
      this.data = JSON.parse(rawData);
      return this.data;
    } catch (error) {
      console.error('Error loading database:', error);
      throw new Error('Database not accessible');
    }
  }

  async saveData() {
    try {
      await fs.writeFile(DB_PATH, JSON.stringify(this.data, null, 2));
    } catch (error) {
      console.error('Error saving database:', error);
      throw new Error('Failed to save data');
    }
  }

  async ensureLoaded() {
    if (!this.data) {
      await this.loadData();
    }
  }

  // Products operations
  async getProducts() {
    await this.ensureLoaded();
    return this.data.products;
  }

  async getProductById(id) {
    await this.ensureLoaded();
    return this.data.products.find(p => p.id === parseInt(id));
  }

  async searchProducts(query) {
    await this.ensureLoaded();
    const searchTerm = query.toLowerCase();
    return this.data.products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  }

  async createProduct(productData) {
    await this.ensureLoaded();
    const newId = Math.max(...this.data.products.map(p => p.id), 0) + 1;
    const newProduct = { id: newId, ...productData };
    this.data.products.push(newProduct);
    await this.saveData();
    return newProduct;
  }

  async updateProduct(id, updates) {
    await this.ensureLoaded();
    const index = this.data.products.findIndex(p => p.id === parseInt(id));
    if (index === -1) return null;
    
    this.data.products[index] = { ...this.data.products[index], ...updates };
    await this.saveData();
    return this.data.products[index];
  }

  async deleteProduct(id) {
    await this.ensureLoaded();
    const index = this.data.products.findIndex(p => p.id === parseInt(id));
    if (index === -1) return false;
    
    this.data.products.splice(index, 1);
    await this.saveData();
    return true;
  }

  // Users operations
  async getUsers() {
    await this.ensureLoaded();
    return this.data.users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  async getUserByUsername(username) {
    await this.ensureLoaded();
    return this.data.users.find(u => u.username === username);
  }

  async createUser(userData) {
    await this.ensureLoaded();
    const existingUser = await this.getUserByUsername(userData.username);
    if (existingUser) {
      throw new Error('Username already exists');
    }
    
    this.data.users.push(userData);
    await this.saveData();
    
    const { password, ...userWithoutPassword } = userData;
    return userWithoutPassword;
  }

  async updateUser(username, updates) {
    await this.ensureLoaded();
    const index = this.data.users.findIndex(u => u.username === username);
    if (index === -1) return null;
    
    this.data.users[index] = { ...this.data.users[index], ...updates };
    await this.saveData();
    
    const { password, ...userWithoutPassword } = this.data.users[index];
    return userWithoutPassword;
  }

  // Orders operations
  async getOrders() {
    await this.ensureLoaded();
    return this.data.orders;
  }

  async getOrdersByUsername(username) {
    await this.ensureLoaded();
    return this.data.orders.filter(order => order.username === username);
  }

  async createOrder(orderData) {
    await this.ensureLoaded();
    const newId = Math.max(...this.data.orders.map(o => o.id), 0) + 1;
    const newOrder = { 
      id: newId, 
      order_date: new Date().toISOString(),
      ...orderData 
    };
    this.data.orders.push(newOrder);
    await this.saveData();
    return newOrder;
  }

  async updateOrder(id, updates) {
    await this.ensureLoaded();
    const index = this.data.orders.findIndex(o => o.id === parseInt(id));
    if (index === -1) return null;
    
    this.data.orders[index] = { ...this.data.orders[index], ...updates };
    await this.saveData();
    return this.data.orders[index];
  }
}

module.exports = new Database();