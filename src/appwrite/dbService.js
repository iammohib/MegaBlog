// Import necessary configurations and Appwrite SDK components
import conf from "../conf/conf";
import { Client, ID, Databases, Query } from "appwrite";

// DbService class handles all DB related operations
export class DbService {
  client = new Client();
  databases;

  // Constructor to configure the Appwrite client
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProductId);

    this.databases = new Databases(this.client);
  }

  // Method to create a new post in the database
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          slug,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
    }
  }

  // Method to update an existing post in the database
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite serive :: updatePost :: error", error);
    }
  }

  // Method to delete a post from the database
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deletePost :: error", error);
      return false;
    }
  }

  // Method to retrieve a single post by its slug
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
      return false;
    }
  }

  // Method to retrieve a all post by its slug
  async getAllPost(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId
      );
    } catch (error) {
      console.log("Appwrite service :: getAllPost :: error", error);
      return false;
    }
  }
}

// Export an instance of DbService for use throughout the app
const dbService = new DbService();
export default dbService;
