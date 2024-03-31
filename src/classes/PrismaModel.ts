import { PrismaClient } from "@prisma/client";

class PrismaModel {
    private static instance: PrismaModel;

    private constructor() { }

    static getInstance() {
        if (!this.instance) {
            this.instance = new PrismaModel();
        }
        return this.instance;
    }

    create() {
        return new PrismaClient();
    }

}

export default PrismaModel;