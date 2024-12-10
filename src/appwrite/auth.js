import { Client, Account, ID } from "appwrite";
import config from '../config/config';

class AuthService {
    client;
    account;

    constructor() {
        this.client = new Client()
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async signup({ name, email, password }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            const session = await this.account.createEmailPasswordSession(email, password);
            return session;
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Error getting current user", error);
        }
    }

    async logout() {
        try {
            await this.account.deleteSession("current");
            return true;
        } catch (error) {
            console.log("Error logging out", error);
        }
    }
}

const authService = new AuthService();
export default authService;