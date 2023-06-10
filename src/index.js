const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");
const logger = require("./config/logger");
const { WebSocketServer } = require("ws");
const { userController } = require("./controllers");
const wss = new WebSocketServer({ port: config.socket_port });

let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info("Connected to MongoDB");
});

server = app.listen(config.port, () => {
  logger.info(`Listening to port ${config.port}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});

wss.on("connection", function (ws) {
  console.log("connected successfully");

  ws.on("message", async (message) => {
    let data = Buffer.from(message).toString();

    data = JSON.parse(data);
    switch (data.type) {
      case "description":
        userController.getDescription(data.payload, function (err, response) {
          let word = 0;
          if (word == 0 && (response == "" || response == " ")) {
          } else {
            if (
              response != "##" ||
              response != "###" ||
              response != " ##" ||
              response != " ###"
            ) {
              word = 1;
              if (response == ".\n\n") {
                ws.send(JSON.stringify("."));
                ws.send(JSON.stringify(""));
                ws.send(JSON.stringify(""));
              } else {
                if (
                  response == "##" ||
                  response == "###" ||
                  response == " ##" ||
                  response == " ###"
                ) {
                } else if (response == ".\n\n") {
                  ws.send(JSON.stringify("."));
                  ws.send(JSON.stringify(""));
                  ws.send(JSON.stringify(""));
                } else if (response == "\n\n") {
                  ws.send(JSON.stringify(""));
                  ws.send(JSON.stringify(""));
                } else if (response.includes("\n\n")) {
                  let parts = response.split(/(\n\n)/);
                  ws.send(JSON.stringify(parts[0]));
                  ws.send(JSON.stringify(""));
                  ws.send(JSON.stringify(""));
                } else {
                  ws.send(JSON.stringify(response));
                }
              }
            }
          }
        });
        break;
      // case "ask-question":
      //   userController.askQuestion(data.payload, function (err, response) {
      //     let word = 0;

      //     if (word == 0 && (response == "" || response == " ")) {
      //     } else {
      //       if (
      //         response != "##" ||
      //         response != "###" ||
      //         response != " ##" ||
      //         response != " ###"
      //       ) {
      //         word = 1;
      //         if (response == ".\n\n" || response == " \n\n") {
      //           ws.send(JSON.stringify("."));
      //           ws.send(JSON.stringify(""));
      //           ws.send(JSON.stringify(""));
      //         } else {
      //           if (
      //             response == "##" ||
      //             response == "###" ||
      //             response == " ##" ||
      //             response == " ###"
      //           ) {
      //           } else if (response == ".\n\n" || response == " \n\n") {
      //             ws.send(JSON.stringify("."));
      //             ws.send(JSON.stringify(""));
      //             ws.send(JSON.stringify(""));
      //           } else if (response == "\n\n") {
      //             ws.send(JSON.stringify(""));
      //             ws.send(JSON.stringify(""));
      //           } else if (response.includes("\n\n")) {
      //             let parts = response.split(/(\n\n)/);
      //             ws.send(JSON.stringify(parts[0]));
      //             ws.send(JSON.stringify(""));
      //             ws.send(JSON.stringify(""));
      //           } else {
      //             ws.send(JSON.stringify(response));
      //           }
      //         }
      //       }
      //     }
      //   });
      case "example":
        userController.getExample(data.payload, function (err, response) {
          let word = 0;
          if (word == 0 && (response == "" || response == " ")) {
          } else {
            if (
              response != "##" ||
              response != "###" ||
              response != " ##" ||
              response != " ###"
            ) {
              word = 1;
              if (response == ".\n\n") {
                ws.send(JSON.stringify("."));
                ws.send(JSON.stringify(""));
                ws.send(JSON.stringify(""));
              } else {
                if (
                  response == "##" ||
                  response == "###" ||
                  response == " ##" ||
                  response == " ###"
                ) {
                } else if (response == ".\n\n") {
                  ws.send(JSON.stringify("."));
                  ws.send(JSON.stringify(""));
                  ws.send(JSON.stringify(""));
                } else if (response == "\n\n") {
                  ws.send(JSON.stringify(""));
                  ws.send(JSON.stringify(""));
                } else if (response.includes("\n\n")) {
                  let parts = response.split(/(\n\n)/);
                  ws.send(JSON.stringify(parts[0]));
                  ws.send(JSON.stringify(""));
                  ws.send(JSON.stringify(""));
                } else {
                  ws.send(JSON.stringify(response));
                }
              }
            }
          }
        });
      default:
        // ws.send("Invalid type");
        break;
    }
  });
});
