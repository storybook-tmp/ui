import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from ".";

const meta = {
  args: {
    children: <div />,
    loginPageRoute: "/login",
  },
  component: ProtectedRoute,
  title: "Components/ProtectedRoute",
} satisfies Meta<typeof ProtectedRoute>;

export default meta;

type Story = StoryObj<typeof meta>;

const ProtectedRouteScenario: React.FC = () => (
  <Routes>
    <Route
      element={
        <ProtectedRoute loginPageRoute="/login">
          <div>Protected Content</div>
        </ProtectedRoute>
      }
      path="/protected"
    />
    <Route element={<div>Login Page</div>} path="/login" />
  </Routes>
);

export const Authenticated: Story = {
  parameters: {
    authProvider: {
      state: "authenticated",
    },
    reactRouter: {
      path: "/*",
      route: "/protected",
    },
  },
  render: () => <ProtectedRouteScenario />,
  play: async ({ canvas }) => {

    await expect(await canvas.findByText("Protected Content")).toBeVisible();
  },
};

export const PendingAuthCheck: Story = {
  parameters: {
    authProvider: {
      state: "pending-authenticated",
    },
    reactRouter: {
      path: "/*",
      route: "/protected",
    },
  },
  render: () => <ProtectedRouteScenario />,
  play: async ({ canvas }) => {

    await expect(await canvas.findByText("Protected Content")).toBeVisible();
  },
};

export const RedirectsToLogin: Story = {
  parameters: {
    authProvider: {
      state: "anonymous",
    },
    reactRouter: {
      path: "/*",
      route: "/protected",
    },
  },
  render: () => <ProtectedRouteScenario />,
  play: async ({ canvas }) => {

    await waitFor(async () => {
      await expect(await canvas.findByText("Login Page")).toBeVisible();
    });
  },
};
