import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { http, HttpResponse } from 'msw';
import LoginPage from './index';
import { evergreenAppURL } from '../../../.storybook/msw-handlers';

const meta = {
  component: LoginPage,
  tags: ['ai-generated'],
  parameters: {
    msw: {
      handlers: [
        // Override the global auth handler to return 401 so the user stays unauthenticated
        http.post(`${evergreenAppURL}/graphql/query`, () =>
          new HttpResponse(null, { status: 401 }),
        ),
        http.post(`${evergreenAppURL}/login`, () =>
          new HttpResponse(null, { status: 401 }),
        ),
      ],
    },
  },
  args: {
    ignoreAuthCheck: true,
  },
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await waitFor(() => {
      expect(canvas.getByLabelText('Username')).toBeVisible();
    });
    await expect(canvas.getByLabelText('Password')).toBeVisible();
    await expect(canvas.getByRole('button', { name: /login/i })).toBeVisible();
  },
};

export const FilledForm: Story = {
  play: async ({ canvas, userEvent }) => {
    await waitFor(() => {
      expect(canvas.getByLabelText('Username')).toBeVisible();
    });
    const usernameInput = canvas.getByLabelText('Username');
    const passwordInput = canvas.getByLabelText('Password');

    await userEvent.type(usernameInput, 'admin');
    await userEvent.type(passwordInput, 'password123');

    await expect(usernameInput).toHaveValue('admin');
    await expect(passwordInput).toHaveValue('password123');
  },
};

export const SubmitForm: Story = {
  play: async ({ canvas, userEvent }) => {
    await waitFor(() => {
      expect(canvas.getByLabelText('Username')).toBeVisible();
    });
    const usernameInput = canvas.getByLabelText('Username');
    const passwordInput = canvas.getByLabelText('Password');

    await userEvent.type(usernameInput, 'testuser');
    await userEvent.type(passwordInput, 'testpass');

    const loginButton = canvas.getByRole('button', { name: /login/i });
    await expect(loginButton).toBeVisible();
  },
};
