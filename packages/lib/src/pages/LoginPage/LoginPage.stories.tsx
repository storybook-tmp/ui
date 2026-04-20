import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";
import LoginPage from ".";

const meta = {
  component: LoginPage,
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoadingAuthCheck: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("LOADING...")).toBeVisible();
  },
};

export const LoginForm: Story = {
  play: async ({ canvas }) => {
    await waitFor(() => {
      expect(canvas.getByLabelText("Username")).toBeVisible();
    });

    await expect(canvas.getByLabelText("Password")).toBeVisible();
    await expect(canvas.getByRole("button", { name: "Login" })).toBeVisible();
  },
};

export const FilledCredentials: Story = {
  play: async ({ canvas, userEvent }) => {
    await waitFor(() => {
      expect(canvas.getByLabelText("Username")).toBeVisible();
    });

    const usernameInput = canvas.getByLabelText("Username");
    const passwordInput = canvas.getByLabelText("Password");

    await userEvent.type(usernameInput, "storybook-user");
    await userEvent.type(passwordInput, "local-password");

    await expect(usernameInput).toHaveValue("storybook-user");
    await expect(passwordInput).toHaveValue("local-password");
  },
};
