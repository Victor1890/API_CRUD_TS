import { Server } from "@hapi/hapi";
import { routes } from "./routes/user.routes";

export const init = async () => {
  const server = new Server({
    port: process.env.PORT || 3000,
    host: "localhost",
  });

  routes(server);

  await server.start();
  console.log(`server running on ${server.info.uri}`);
};
