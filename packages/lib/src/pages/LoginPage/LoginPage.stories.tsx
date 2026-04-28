import type { Meta, StoryObj } from "@storybook/react-vite";
import { http, HttpResponse } from "msw";
import { expect, waitFor } from "storybook/test";
import { AuthProvider } from "../../context/AuthProvider";
import LoginPage from "./index";

const meta: Meta<typeof LoginPage> = {
  component: LoginPage,
  tags: ["ai-generated"],
  decorators: [
    (Story) => (
      <AuthProvider
        evergreenAppURL="http://localhost:9090"
        localAuthRoute="/login"
        remoteAuthURL="http://localhost:9090/login"
        shouldUseLocalAuth
      >
        <Story />
      </AuthProvider>
    ),
  ],
  parameters: {
    msw: {
      handlers: [
        // Return 401 so the user stays on login page (not authenticated)
        http.post("*/graphql/query", () =>
          new HttpResponse(null, { status: 401 }),
        ),
        http.post("*/login", () => new HttpResponse(null, { status: 200 })),
        http.get("*/logout", () => new HttpResponse(null, { status: 200 })),
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof LoginPage>;

export const Default: Story = {
  args: {
    ignoreAuthCheck: true,
  },
  play: async ({ canvas }) => {
    await waitFor(() => {
      expect(canvas.getByLabelText("Username")).toBeVisible();
    });
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
  play: async ({ canvas, userEvent }) => {
    await waitFor(() => {
      expect(canvas.getByLabelText("Username")).toBeVisible();
    });
    const usernameInput = canvas.getByLabelText("Username");
    const passwordInput = canvas.getByLabelText("Password");
    await userEvent.clear(usernameInput);
    await userEvent.type(usernameInput, "admin");
    await expect(usernameInput).toHaveValue("admin");
    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, "secret");
    await expect(passwordInput).toHaveValue("secret");
  },
};

export const CssCheck: Story = {
  args: {
    ignoreAuthCheck: true,
  },
  play: async ({ canvas }) => {
    await waitFor(() => {
      expect(canvas.getByLabelText("Username")).toBeVisible();
    });
    const loginButton = canvas.getByRole("button", { name: /login/i });
    const style = getComputedStyle(loginButton);
    // LeafyGreen baseGreen button should have a green background
    await expect(style.backgroundColor).not.toBe("");
    await expect(style.backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
  },
};
