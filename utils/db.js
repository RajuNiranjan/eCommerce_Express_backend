import mongoose from "mongoose";
import { ENV_VAR } from '../config/envVar.js'

const DB_Connect = async () => {
    try {
        const dbUri = ENV_VAR.DB_URI

        if (!dbUri) throw new Error("Invalid data base uri")

        await mongoose.connect(dbUri).then(() => console.log('server connected to data base')).catch((error) => console.log(error))
    } catch (error) {
        console.log(error);
        throw new Error("Internal server error during connecting to data base")
    }
}

DB_Connect()