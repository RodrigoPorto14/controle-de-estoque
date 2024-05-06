import express from 'express';
import "express-async-errors";
import { errorHandler } from './middlewares/error-handler';
import routes from './routes';


const app = express();
const port = 3333;
app.use(express.json());
app.use(routes);
// app.use(cors());
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use('/files', express.static(path.resolve(__dirname, '..', "tmp")));
app.use(errorHandler);

app.listen(port, () => {
    console.log("Servidor rodando na porta 3333");
})
