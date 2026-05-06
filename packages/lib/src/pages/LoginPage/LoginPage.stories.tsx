import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { http, HttpResponse } from 'msw';
import LoginPage from '.';

const meta = {
  component: LoginPage,
  tags: ['ai-generated'],
  parameters: {
    msw: {
      handlers: {
        auth: [
          // Override the global auth handler to simulate unauthenticated state
          http.post('http://localhost:9090/graphql/query', () =>
            new HttpResponse(null, { status: 401 }),
          ),
          http.post('http://localhost:9090/login', () =>
            new HttpResponse(null, { status: 200 }),
          ),
        ],
      },
    },
  },
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
    await expect(canvas.getByText('Login')).toBeVisible();
  },
};

export const FilledForm: Story = {
  args: {
    ignoreAuthCheck: true,
  },
  play: async ({ canvas, userEvent }) => {
    const usernameInput = canvas.getByLabelText('Username');
    const passwordInput = canvas.getByLabelText('Password');

    await userEvent.type(usernameInput, 'admin');
    await userEvent.type(passwordInput, 'secret123');

    await expect(usernameInput).toHaveValue('admin');
    await expect(passwordInput).toHaveValue('secret123');
  },
};

export const SubmitForm: Story = {
  args: {
    ignoreAuthCheck: true,
  },
  play: async ({ canvas, userEvent }) => {
    const usernameInput = canvas.getByLabelText('Username');
    const passwordInput = canvas.getByLabelText('Password');
    const loginButton = canvas.getByRole('button', { name: /login/i });

    await userEvent.type(usernameInput, 'testuser');
    await userEvent.type(passwordInput, 'password');

    // Verify the form is populated and the login button is actionable
    await expect(usernameInput).toHaveValue('testuser');
    await expect(passwordInput).toHaveValue('password');
    await expect(loginButton).toBeEnabled();
  },
};
