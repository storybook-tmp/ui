import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { http, HttpResponse } from 'msw';
import { AuthProvider } from '../../context/AuthProvider';
import LoginPage from './index';

const meta = {
  component: LoginPage,
  tags: ['ai-generated'],
  args: {
    ignoreAuthCheck: true,
  },
  decorators: [
    (Story) => (
      <AuthProvider
        evergreenAppURL="https://mock-evergreen.example.com"
        remoteAuthURL="https://mock-auth.example.com"
        localAuthRoute="/login"
        shouldUseLocalAuth={true}
      >
        <Story />
      </AuthProvider>
    ),
  ],
  parameters: {
    msw: {
      handlers: [
        http.post('*/graphql/query', () => {
          return HttpResponse.json(
            { errors: [{ message: 'unauthorized' }] },
            { status: 401 },
          );
        }),
        http.post('*/login', () => {
          return HttpResponse.json({ ok: true }, { status: 200 });
        }),
        http.get('*/logout', () => {
          return new HttpResponse(null, { status: 200 });
        }),
      ],
    },
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
    await userEvent.click(usernameInput);
    await userEvent.keyboard('admin');
    await waitFor(() => {
      expect(usernameInput).not.toHaveValue('');
    });
    const loginButton = canvas.getByRole('button', { name: /login/i });
    await expect(loginButton).toBeEnabled();
  },
};

export const LayoutCheck: Story = {
  play: async ({ canvas }) => {
    await waitFor(() => {
      expect(canvas.getByLabelText('Username')).toBeVisible();
    });
    const loginButton = canvas.getByRole('button', { name: /login/i });
    await expect(loginButton).toBeVisible();
    await expect(loginButton).toBeEnabled();
  },
};
