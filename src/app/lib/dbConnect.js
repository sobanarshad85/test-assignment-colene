import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("Check mongodb uri . . .");
}

const dbConnect = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 8000,
            socketTimeoutMS: 45000,
        });
        console.log("✅ MongoDB Connected! . . . .");
    } catch (error) {
        console.error("MongoDB Connection Failed: . . . .", error);
        throw new Error("Database connection error .. . . ");
    }
};

export default dbConnect;
