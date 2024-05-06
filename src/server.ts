import express from 'express';
import "express-async-errors";
import routes from './routes';
import { errorHandler } from './middlewares/error-handler';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import cors from 'cors'
import path from 'path';

const app = express();
const port = 3333;
app.use(express.json());
app.use(cors());
app.use('v1', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/files', express.static(path.resolve(__dirname, '..', "tmp")));
app.use(errorHandler);

app.listen(port, () => {
    console.log("Servidor rodando na porta 3333");
})
