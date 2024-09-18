import { Client, Account, ID } from "appwrite";
// import {appWriteUrl, appWriteProjectId} from '../conf/config'  can be done in any ways.
import config from "../conf/config";
export class AuthServise{
      client = new Client()
      Account;
      constructor(){
        this.client
            .setEndpoint(config.appWriteUrl) 
            .setProject(config.appWriteProjectId);
        this.Account=new Account(this.client);
      }

      async createAccount({email, password, name}){
        try {
            const userAccount=await this.Account.create(ID.unique(), email, password,name);
            if (userAccount) {
                return this.logIn({email, password});
                // calling another method
            } else {
                return userAccount
            }
        } catch (error) {
            throw error;
        }
      }

      async logIn({email, password}){
        try {
            return await this.Account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
      }

      async getCurrentUser(){
        try {
            return await this.Account.get();
        } catch (error) {
            throw error;
        }
        return null;
      }

      async logOut(){
        try {
            return await this.Account.deleteSessions();
        } catch (error) {
            throw error;
        }
      }
    

}

const authServise= new AuthServise();

export default authServise;