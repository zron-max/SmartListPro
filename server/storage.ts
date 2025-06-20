import { shoppingItems, users, type User, type InsertUser, type ShoppingItem, type InsertShoppingItem } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Shopping Items CRUD
  getShoppingItems(userId: string): Promise<ShoppingItem[]>;
  createShoppingItem(item: InsertShoppingItem): Promise<ShoppingItem>;
  updateShoppingItem(id: number, updates: Partial<ShoppingItem>): Promise<ShoppingItem | undefined>;
  deleteShoppingItem(id: number): Promise<boolean>;
  toggleShoppingItemComplete(id: number): Promise<ShoppingItem | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private shoppingItems: Map<number, ShoppingItem>;
  private currentUserId: number;
  private currentItemId: number;

  constructor() {
    this.users = new Map();
    this.shoppingItems = new Map();
    this.currentUserId = 1;
    this.currentItemId = 1;
    
    // Initialize with some sample data for development
    this.initializeSampleData();
  }

  private initializeSampleData() {
    const sampleItems: ShoppingItem[] = [
      { id: 1, name: 'Bananas', quantity: '6', category: 'fruits', completed: false, userId: 'user1', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: 'Apples', quantity: '4', category: 'fruits', completed: true, userId: 'user1', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, name: 'Orange Juice', quantity: '1', category: 'fruits', completed: false, userId: 'user1', createdAt: new Date(), updatedAt: new Date() },
      { id: 4, name: 'Whole Milk', quantity: '1 gallon', category: 'dairy', completed: false, userId: 'user1', createdAt: new Date(), updatedAt: new Date() },
      { id: 5, name: 'Greek Yogurt', quantity: '2', category: 'dairy', completed: false, userId: 'user1', createdAt: new Date(), updatedAt: new Date() },
      { id: 6, name: 'Chicken Breast', quantity: '2 lbs', category: 'meat', completed: false, userId: 'user1', createdAt: new Date(), updatedAt: new Date() },
      { id: 7, name: 'Baby Spinach', quantity: '1 bag', category: 'vegetables', completed: false, userId: 'user1', createdAt: new Date(), updatedAt: new Date() },
      { id: 8, name: 'Carrots', quantity: '1 lb', category: 'vegetables', completed: false, userId: 'user1', createdAt: new Date(), updatedAt: new Date() },
      { id: 9, name: 'Bell Peppers', quantity: '3', category: 'vegetables', completed: false, userId: 'user1', createdAt: new Date(), updatedAt: new Date() },
    ];

    sampleItems.forEach(item => {
      this.shoppingItems.set(item.id, item);
    });
    this.currentItemId = 10;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getShoppingItems(userId: string): Promise<ShoppingItem[]> {
    return Array.from(this.shoppingItems.values()).filter(
      (item) => item.userId === userId,
    );
  }

  async createShoppingItem(insertItem: InsertShoppingItem): Promise<ShoppingItem> {
    const id = this.currentItemId++;
    const item: ShoppingItem = {
      ...insertItem,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.shoppingItems.set(id, item);
    return item;
  }

  async updateShoppingItem(id: number, updates: Partial<ShoppingItem>): Promise<ShoppingItem | undefined> {
    const item = this.shoppingItems.get(id);
    if (!item) return undefined;

    const updatedItem: ShoppingItem = {
      ...item,
      ...updates,
      updatedAt: new Date(),
    };
    this.shoppingItems.set(id, updatedItem);
    return updatedItem;
  }

  async deleteShoppingItem(id: number): Promise<boolean> {
    return this.shoppingItems.delete(id);
  }

  async toggleShoppingItemComplete(id: number): Promise<ShoppingItem | undefined> {
    const item = this.shoppingItems.get(id);
    if (!item) return undefined;

    const updatedItem: ShoppingItem = {
      ...item,
      completed: !item.completed,
      updatedAt: new Date(),
    };
    this.shoppingItems.set(id, updatedItem);
    return updatedItem;
  }
}

export const storage = new MemStorage();
