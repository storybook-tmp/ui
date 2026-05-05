import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { http, HttpResponse } from 'msw';
import LoginPage from './index';
import { AuthProvider } from '../../context/AuthProvider';

const meta = {
  component: LoginPage,
  tags: ['ai-generated'],
  args: {
    ignoreAuthCheck: true,
  },
  parameters: {
    msw: {
      handlers: [
        // Return auth failure so LoginPage renders the form instead of redirecting
        http.post('http://localhost:9090/graphql/query', () =>
          new HttpResponse(null, { status: 401 }),
        ),
      ],
    },
  },
  decorators: [
    (Story) => (
      <AuthProvider
        evergreenAppURL="http://localhost:9090"
        remoteAuthURL="http://localhost:9090/login"
        localAuthRoute="/login"
        shouldUseLocalAuth={true}
      >
        <Story />
      </AuthProvider>
    ),
  ],
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
    await userEvent.type(passwordInput, 'secret');

    await waitFor(() => {
      expect(usernameInput).toHaveValue('admin');
    });
    await waitFor(() => {
      expect(passwordInput).toHaveValue('secret');
    });
  },
};

export const SubmitButton: Story = {
  play: async ({ canvas }) => {
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: /login/i })).toBeVisible();
    });
    const loginButton = canvas.getByRole('button', { name: /login/i });
    // LeafyGreen Button renders with display flex
    await expect(getComputedStyle(loginButton).display).toBe('flex');
  },
};
