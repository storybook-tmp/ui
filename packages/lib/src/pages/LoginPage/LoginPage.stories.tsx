import type { Meta, StoryObj } from "@storybook/react-vite";
import { http, HttpResponse } from "msw";
import LoginPage from ".";

const meta = {
  component: LoginPage,
  parameters: {
    msw: {
      handlers: {
        auth: [
          // Return 401 so the user is not authenticated and the login form shows
          http.post("*/graphql/query", () =>
            new HttpResponse(null, { status: 401 })
          ),
        ],
      },
    },
  },
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <LoginPage ignoreAuthCheck />,
};
