// Import necessary configurations and Appwrite SDK components
import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

// AuthService class handles all authentication related operations
export class AuthService {
  client = new Client();
  account;

  // Constructor to configure the Appwrite client
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProductId);

    const account = new Account(this.client);
  }

  // Create a new account and log in if successful
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      return userAccount ? this.login(email, password) : userAccount;
    } catch (error) {
      throw error;
    }
  }

  // Log in the user with email and password
  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  // Fetch the currently logged-in user's details
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("Error fetching current user:", error);
      return null;
    }
  }

  // Log out the user by deleting all sessions
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}

// Export an instance of AuthService for use throughout the app
const authService = new AuthService();
export default authService;
