import mongoose from 'mongoose';

const connection = {};

async function dbConnect() {
    if (connection.isConnected) {
        // Already connected to DB
        return;
    }

    try {
        // Check if already connected
        if (mongoose.connections.length > 0) {
            connection.isConnected = mongoose.connections[0].readyState;
            if (connection.isConnected) {
                return;
            }
        }

        // Connect to MongoDB
        const db = await mongoose.connect(process.env.MONGODB_URI || '', {
            useNewUrlParser: true,   // Added for modern MongoDB drivers
            useUnifiedTopology: true, // Use newer server discovery and monitoring
        });

        // Store connection state
        connection.isConnected = db.connections[0].readyState;

    } catch (error) {
        console.error("Error connecting to the database", error);
        process.exit(1);
    }
}

export default dbConnect;
