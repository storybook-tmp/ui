import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { http, HttpResponse } from "msw";
import { AuthProvider } from "../../context/AuthProvider";
import LoginPage from ".";

const authFailHandler = http.post("*/graphql/query", () =>
  HttpResponse.json({ errors: [{ message: "not authenticated" }] }, { status: 401 }),
);

const meta = {
  component: LoginPage,
  tags: ["ai-generated"],
  parameters: {
    msw: {
      handlers: [authFailHandler],
    },
  },
  decorators: [
    (Story) => (
      <AuthProvider
        evergreenAppURL="http://localhost:9090"
        remoteAuthURL="http://localhost:9090/login"
        localAuthRoute="/login"
        shouldUseLocalAuth
      >
        <Story />
      </AuthProvider>
    ),
  ],
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

export const WithFormInput: Story = {
  args: {
    ignoreAuthCheck: true,
  },
  play: async ({ canvas, userEvent }) => {
    const usernameInput = canvas.getByLabelText("Username");
    await userEvent.click(usernameInput);
    await expect(usernameInput).toHaveFocus();
    const passwordInput = canvas.getByLabelText("Password");
    await userEvent.click(passwordInput);
    await expect(passwordInput).toHaveFocus();
    await expect(passwordInput).toHaveAttribute("type", "password");
  },
};

export const LoginFormStyling: Story = {
  args: {
    ignoreAuthCheck: true,
  },
  play: async ({ canvas }) => {
    const loginButton = canvas.getByRole("button", { name: /login/i });
    await expect(loginButton).toBeVisible();
    await expect(loginButton).toBeEnabled();
  },
};
