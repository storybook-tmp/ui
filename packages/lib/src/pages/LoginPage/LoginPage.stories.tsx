import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";
import { Route, Routes } from "react-router-dom";
import LoginPage from ".";

const meta = {
  component: LoginPage,
  title: "Pages/LoginPage",
} satisfies Meta<typeof LoginPage>;

export default meta;

type Story = StoryObj<typeof meta>;

const LoginPageScenario: React.FC = () => (
  <Routes>
    <Route element={<LoginPage />} path="/login" />
    <Route element={<div>Waterfall</div>} path="/waterfall" />
    <Route element={<div>Home</div>} path="/" />
  </Routes>
);

export const LoadingState: Story = {
  parameters: {
    authProvider: {
      state: "pending-authenticated",
    },
    reactRouter: {
      path: "/*",
      route: "/login",
    },
  },
  render: () => <LoginPageScenario />,
  play: async ({ canvas }) => {
    await expect(await canvas.findByText("LOADING...")).toBeVisible();
  },
};

export const Unauthenticated: Story = {
  parameters: {
    authProvider: {
      state: "anonymous",
    },
    reactRouter: {
      path: "/*",
      route: "/login",
    },
  },
  render: () => <LoginPageScenario />,
  play: async ({ canvas }) => {
    await expect(
      await canvas.findByLabelText("Username", { selector: "input" }),
    ).toBeVisible();
    await expect(
      await canvas.findByLabelText("Password", { selector: "input" }),
    ).toBeVisible();
    await expect(await canvas.findByRole("button", { name: "Login" })).toBeVisible();
  },
};

export const SuccessfulLocalLogin: Story = {
  parameters: {
    authProvider: {
      state: "anonymous-login",
    },
    reactRouter: {
      path: "/*",
      route: "/login",
    },
  },
  render: () => <LoginPageScenario />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(
      await canvas.findByLabelText("Username", { selector: "input" }),
      "storybook-user",
    );
    await userEvent.type(
      await canvas.findByLabelText("Password", { selector: "input" }),
      "password123",
    );
    await userEvent.click(await canvas.findByRole("button", { name: "Login" }));

    await waitFor(async () => {
      await expect(await canvas.findByText("Home")).toBeVisible();
    });
  },
};
