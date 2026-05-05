import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fireEvent, waitFor } from "storybook/test";
import LoginPage from "./index";

const meta = {
  component: LoginPage,
  tags: ["ai-generated"],
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ignoreAuthCheck: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText("Username")).toBeVisible();
    await expect(canvas.getByLabelText("Password")).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: /login/i }),
    ).toBeVisible();
  },
};

export const FilledForm: Story = {
  args: {
    ignoreAuthCheck: true,
  },
  play: async ({ canvas }) => {
    const usernameInput = canvas.getByLabelText("Username", {
      selector: "input",
    });
    const passwordInput = canvas.getByLabelText("Password", {
      selector: "input",
    });

    fireEvent.change(usernameInput, { target: { value: "admin" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    await waitFor(() => {
      expect(usernameInput).toHaveValue("admin");
    });
    await waitFor(() => {
      expect(passwordInput).toHaveValue("password123");
    });
  },
};

export const LoginFormLayout: Story = {
  args: {
    ignoreAuthCheck: true,
  },
  play: async ({ canvas }) => {
    const loginButton = canvas.getByRole("button", { name: /login/i });
    await expect(loginButton).toBeVisible();
    await expect(getComputedStyle(loginButton).alignSelf).toBe("flex-end");
  },
};
