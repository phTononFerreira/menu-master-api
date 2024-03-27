import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import categoryRouter from './src/routes/category.router.js';
import productRouter from './src/routes/product.router.js';
import ratingRouter from './src/routes/rating.router.js';
import restaurantRouter from './src/routes/restaurant.router.js';
import APIMessages from './src/utils/messages.util.js';
import sequelize from './src/utils/sequelize.util.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.use(restaurantRouter);
app.use(categoryRouter);
app.use(productRouter);
app.use(ratingRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(APIMessages.SUCCESS_SERVER_START(PORT));
    sequelize.sync()
        .then(() => {
            console.log(APIMessages.SUCCESS_TABLE_SYNC());
        })
        .catch(error => {
            console.error(APIMessages.ERROR_TABLE_SYNC(error));
        });
});
