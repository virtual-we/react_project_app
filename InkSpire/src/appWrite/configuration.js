import { Client, Databases, Storage, Query, ID } from "appwrite";
// import {appWriteUrl, appWriteProjectId} from '../conf/config'  can be done in any ways.
import config from "../conf/config";


export class Service{
    client=new Client();
    bucket;
    databases;
    constructor(){
        this.client
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectId);
        this.databases= new Databases(this.client);
        this.bucket=new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, uniqueId}){
        try {
            return await this.databases.createDocument(config.appWriteBucketId, config.appWriteCollectionId, slug, {
                title,
                content,
                featuredImage,
                status,
                userId, 

            })
        } catch (error) {
            throw error;
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(config.appWriteDatabaseId, config.appWriteCollectionId, )
        } catch (error) {
            throw error;
        }
        return await this.databases.updateDocument(config.appWriteDatabaseId, config.appWriteCollectionId, slug, {
            title,
            content,
            featuredImage,
            status
        })
        
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(config.appWriteDatabaseId, config.appWriteCollectionId, slug)
            return true;
        } catch (error) {
            throw error;
            return false;
        }
    }

    async getPost(slug)
    {
        try {
            return await this.databases.getDocument(config.appWriteDatabaseId, config.appWriteCollectionId, slug)
        } catch (error) {
            throw error;
        }
    }

    async getPosts(queries=[Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(config.appWriteDatabaseId, config.appWriteCollectionId, queries);
        } catch (error) {
            throw error;
            return false;
        }
    }

    // file upload
    async uploadFile(file){
        try {
            await this.bucket.createFile(config.appWriteBucketId, ID.unique(), file)
        } catch (error) {
            throw error;
            return false;
        }
    }
    // file delete
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(config.appWriteBucketId, fileId);
            return true;
        } catch (error) {
            throw error;
            return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(config.appWriteBucketId, fileId);
    }
}


const service= new Service();
export default storage;