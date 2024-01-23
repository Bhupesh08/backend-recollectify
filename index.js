import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import postRoutes from "./routes/posts.js";

//This line creates an instance of the Express.js application.
//It initializes and sets up an Express application,
//which you can use to define routes, handle HTTP requests, and more.
const app = express();
dotenv.config();

//bodyParser.json() is a middleware provided by the body-parser library,
//which is commonly used to parse incoming JSON data in HTTP requests.
app.use(bodyParser.json({ limit: "30mb", extended: true }));

//This line adds another middleware using app.use(), but this time it's configured to parse URL-encoded data from incoming requests.
//bodyParser.urlencoded() is another middleware provided by the body-parser library, and it is used to parse data submitted through HTML forms.
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

//cors() ensures that your server can handle cross-origin requests,
//which is essential when building APIs that are consumed by web applications hosted on different domains.
app.use(cors());

app.use("/posts", postRoutes);

// const CONNECTION_URL =
//   "mongodb+srv://codingbhup:codingatsangaria@cluster0.ldyfxdv.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp";

const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
