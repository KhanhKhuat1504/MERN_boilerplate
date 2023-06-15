const express = require('express');
const cors = require('cors');
const app = express();
require("./common/db")(); // connect to MongoDB

app.use(cors({ origin: "*"}));
app.use(express.json());

const userRouter = require('./routes/users');
app.use("/api/v1/auth", userRouter);

const port = 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

