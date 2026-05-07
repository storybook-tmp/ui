import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";
import LoginPage from ".";

const meta = {
  component: LoginPage,
  tags: ["ai-generated"],
  parameters: {
    auth: {
      authenticated: false,
    },
    reactRouter: {
      route: "/login",
    },
  },
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LocalAuthForm: Story = {
  play: async ({ canvas }) => {
    await waitFor(() => {
      expect(canvas.getByLabelText("Username")).toBeVisible();
    });
    await expect(canvas.getByLabelText("Password")).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Login" }),
    ).toBeVisible();
  },
};

export const FilledForm: Story = {
  play: async ({ canvas, userEvent }) => {
    const usernameInput = await canvas.findByLabelText("Username");
    const passwordInput = canvas.getByLabelText("Password");

    await userEvent.type(usernameInput, "evergreen.user");
    await userEvent.type(passwordInput, "local-password");

    await expect(usernameInput).toHaveValue("evergreen.user");
    await expect(passwordInput).toHaveValue("local-password");
  },
};

export const IgnoreAuthCheck: Story = {
  args: {
    ignoreAuthCheck: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText("Username")).toBeVisible();
    await expect(canvas.getByLabelText("Password")).toBeVisible();
  },
};
