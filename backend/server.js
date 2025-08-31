const cors = require("cors");
const express = require("express");
const { initializeRoutes } = require("./routes");

const app = express();
app.use(cors());
app.use(express.json());

initializeRoutes(app);

const PORT = process.env.PORT || 3000;;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})
