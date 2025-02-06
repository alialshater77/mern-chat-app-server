import express from "express"
import dotEnv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import authRoutes from "./routes/AuthRoutes.js"
import contactRoutes from "./routes/ContactRoutes.js"
import setupSocket from "./socket.js"
import messagesRoutes from "./routes/MessagesRoutes.js"
import channelRoutes from "./routes/ChannelRoutes.js"

dotEnv.config();

const app = express();
const port = process.env.PORT || 3001;
const datbaseUrl = process.env.DATABASE_URL

console.log(datbaseUrl);


app.use(cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT" , "PATCH" , "DELETE"],
    credentials: true
}))

app.use("/uploads/profiles" , express.static("uploads/profiles"))
app.use("/uploads/files" , express.static("uploads/files"))

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth' , authRoutes)
app.use('/api/contacts' , contactRoutes)
app.use('/api/messages' , messagesRoutes)
app.use('/api/channels' , channelRoutes)

const server = app.listen(port , () => {
    console.log("server is running");
})

setupSocket(server)

mongoose.connect(datbaseUrl).then(() => {
    console.log("Db Connection successful");
}).catch(error => {
    console.log(error);
})