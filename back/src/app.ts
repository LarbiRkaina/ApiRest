import express from 'express';
import path from "path";
import { booksApi } from './books.api';
import { createRestApiServer} from "core/servers";
import { envConstants} from "core/constants"

const restApiServer = createRestApiServer();

const staticFilesPath = path.resolve(__dirname, envConstants.STATIC_FILES_PATH);
restApiServer.use("/", express.static(staticFilesPath));

restApiServer.use(async (req, res, next) => {
  console.log(req.url);
  next();
});

restApiServer.use("/api/books", booksApi);

restApiServer.use(async (error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
})

restApiServer.listen(envConstants.PORT , () => {
  console.log(`Server ready at port 3000 ${envConstants.PORT}`);
});