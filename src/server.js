import express from "express";
import exitHook from "async-exit-hook";
import { CONNECT_DB, CLOSE_DB } from "~/config/mongodb";
import { env } from "~/config/environment";
import { APIs_V1 } from "~/routes/v1";
import { errorHandlingMiddleware } from "~/middlewares/errorHandlingMiddleware";

const START_SERVER = () => {
  const app = express();

  app.use(express.json());

  app.use("/v1", APIs_V1);
  // middleware  sử lý lỗi tập chung
  app.use(errorHandlingMiddleware);

  app.get("/", (req, res) => {
    res.end("Hello, world!");
  });

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(
      `3.Hi ${env.AUTHOR_NAME} Server is running at http://${env.APP_HOST}:${env.APP_PORT}/`
    );
  });
  exitHook(() => {
    console.log(`4.Server is shutting ...`);
    CLOSE_DB();
    console.log(`5.Disconnected MongoDB ....`);
  });
};

// Gọi hàm kết nối và khởi động máy chủ
(async () => {
  try {
    console.log("1.Connecteding to MongoDB ....");

    await CONNECT_DB(); // Kết nối đến MongoDB
    console.log("2.Connected to MongoDB ...");
    START_SERVER(); // Khởi động máy chủ
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    exit(0); // Thoát với mã lỗi
  }
})();

// CONNECT_DB()
//   .then(() => {
//     console.log("Connecting to MongoDB");
//   })
//   .then(() => START_SERVER())
//   .catch((error) => {
//     console.error(error);
//   });
