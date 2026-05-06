import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { http, delay, HttpResponse } from 'msw';
import { AuthProvider } from '../../context/AuthProvider';
import LoginPage from './index';

const meta = {
  component: LoginPage,
  tags: ['ai-generated'],
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
        // Keep the auth check pending so the login form stays visible
        http.post('*/graphql/query', async () => {
          await delay('infinite');
          return HttpResponse.json({});
        }),
      ],
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
    await waitFor(() => {
      expect(canvas.getByLabelText('Username')).toBeVisible();
    });
    await expect(canvas.getByLabelText('Password')).toBeVisible();
    await expect(canvas.getByRole('button', { name: /login/i })).toBeVisible();
  },
};

export const FilledForm: Story = {
  args: {
    ignoreAuthCheck: true,
  },
  play: async ({ canvas, userEvent }) => {
    await waitFor(() => {
      expect(canvas.getByLabelText('Username')).toBeVisible();
    });
    const usernameInput = canvas.getByLabelText('Username');
    const passwordInput = canvas.getByLabelText('Password');
    await userEvent.type(usernameInput, 'admin');
    await waitFor(() => {
      expect(usernameInput).toHaveValue('admin');
    });
    await userEvent.type(passwordInput, 'password123');
    await waitFor(() => {
      expect(passwordInput).toHaveValue('password123');
    });
  },
};

export const SubmitLogin: Story = {
  args: {
    ignoreAuthCheck: true,
  },
  play: async ({ canvas, userEvent }) => {
    await waitFor(() => {
      expect(canvas.getByLabelText('Username')).toBeVisible();
    });
    const usernameInput = canvas.getByLabelText('Username');
    const passwordInput = canvas.getByLabelText('Password');
    await userEvent.type(usernameInput, 'admin');
    await waitFor(() => {
      expect(usernameInput).toHaveValue('admin');
    });
    await userEvent.type(passwordInput, 'secret');
    await waitFor(() => {
      expect(passwordInput).toHaveValue('secret');
    });
  },
};
