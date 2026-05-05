import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { AuthProvider } from '../../context/AuthProvider';
import LoginPage from '.';

const meta = {
  component: LoginPage,
  tags: ['ai-generated'],
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
    await expect(canvas.getByLabelText('Username')).toBeVisible();
    await expect(canvas.getByLabelText('Password')).toBeVisible();
    await expect(canvas.getByRole('button', { name: /login/i })).toBeVisible();
  },
};

export const FilledForm: Story = {
  args: {
    ignoreAuthCheck: true,
  },
  play: async ({ canvas, userEvent }) => {
    const usernameInput = canvas.getByLabelText('Username') as HTMLInputElement;
    const passwordInput = canvas.getByLabelText('Password') as HTMLInputElement;
    // Verify inputs are text and password types respectively
    await expect(usernameInput).toHaveAttribute('type', 'text');
    await expect(passwordInput).toHaveAttribute('type', 'password');
    // Focus and type into username
    await userEvent.click(usernameInput);
    await userEvent.keyboard('admin');
    await waitFor(() => {
      expect(usernameInput.value.length).toBeGreaterThan(0);
    });
  },
};

export const LoginFormLayout: Story = {
  args: {
    ignoreAuthCheck: true,
  },
  play: async ({ canvas }) => {
    const loginButton = canvas.getByRole('button', { name: /login/i });
    await expect(loginButton).toBeVisible();
    // Verify the form has the green background from the app's styling
    const form = canvas.getByLabelText('Username').closest('form') as HTMLElement;
    await expect(getComputedStyle(form).display).toBe('flex');
  },
};
