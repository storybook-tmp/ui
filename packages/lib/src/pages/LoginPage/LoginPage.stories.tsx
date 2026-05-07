import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import LoginPage from ".";

const meta = {
  component: LoginPage,
  tags: ["ai-generated"],
  parameters: {
    reactRouter: {
      route: "/login",
    },
  },
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LocalAuthForm: Story = {
  args: {
    ignoreAuthCheck: true,
  },
  play: async ({ canvas, userEvent }) => {
    const username = canvas.getByLabelText("Username", { selector: "input" });
    const password = canvas.getByLabelText("Password", { selector: "input" });

    await expect(username).toBeVisible();
    await userEvent.type(username, "local-user");
    await userEvent.type(password, "local-password");
    await expect(username).toHaveValue("local-user");
    await expect(password).toHaveValue("local-password");
    await expect(canvas.getByRole("button", { name: "Login" })).toBeVisible();
  },
};
