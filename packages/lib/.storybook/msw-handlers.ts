import { HttpResponse, http } from "msw";

const userPayload = {
  user: {
    userId: "storybook-user",
  },
};

export const mswHandlers = [
  http.post("*/graphql/query", async () =>
    HttpResponse.json({
      data: userPayload,
    }),
  ),
  http.post("*/login", async () => new HttpResponse(null, { status: 200 })),
  http.get("*/logout", async () => new HttpResponse(null, { status: 200 })),
];
