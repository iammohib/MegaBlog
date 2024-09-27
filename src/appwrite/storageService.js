// Import necessary configurations and Appwrite SDK components
import conf from "../conf/conf";
import { Client, ID, Storage } from "appwrite";

// StorageService class handles all Media-Storage related operations
export class StorageService {
  client = new Client();
  storage;

  // Constructor to configure the Appwrite client
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProductId);

    this.storage = new Storage(this.client);
  }

   // Method to upload a file to Appwrite storage
   async uploadFile(file){
    try {
        return await this.storage.createFile(
            conf.appwriteBucketId,
            ID.unique,
            file
        )
    } catch (error) {
        console.log("Appwrite service :: uploadFile :: error",error);
        return false;
    }
   }

   // Method to delete a file to Appwrite storage
   async deleteFile(fileId){
    try {
        await this.storage.deleteFile(
            conf.appwriteBucketId,
            fileId
        )
        return true;
    } catch (error) {
        console.log("Appwrite service :: deleteFile :: error",error);
        return false;
    }
   }

   // Method to get a file-preview from Appwrite storage
   async getFilePreview(fileId){
    try {
        return await this.storage.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    } catch (error) {
        console.log("Appwrite service :: getFilePreview :: error",error);
        return false;
    }
   }
}

// Export an instance of DbService for use throughout the app
const storageService = new StorageService();
export default storageService;
