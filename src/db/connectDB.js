import mongoose from 'mongoose';

const connection = {};

async function dbConnect() {
    if (connection.isConnected) {
        // Connection already established, no need to reconnect
        return;
    }

    try {
        // Check if we are in development mode or production
        if (mongoose.connections.length > 0) {
            connection.isConnected = mongoose.connections[0].readyState;
            if (connection.isConnected) {
                // Already connected to DB, no need to reconnect
                return;
            }
        }

        // If no connection exists or in serverless environments, establish a new connection
        const db = await mongoose.connect(process.env.MONGODB_URI || '', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });

        // Store the connection state to avoid future reconnections
        connection.isConnected = db.connections[0].readyState;
    } catch (error) {
        console.error("Error connecting to the database", error);
        process.exit(1); // Exit the process in case of critical error
    }
}

export default dbConnect;
