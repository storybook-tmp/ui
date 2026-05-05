import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { http, HttpResponse } from 'msw';
import { AuthProvider } from '../../context/AuthProvider';
import LoginPage from './index';

const unauthenticatedHandlers = [
  http.post('*/graphql/query', () =>
    HttpResponse.json(
      { errors: [{ message: 'not authenticated' }] },
      { status: 401 },
    ),
  ),
  http.get('*/logout', () => HttpResponse.json({ ok: true })),
];

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
  args: {
    ignoreAuthCheck: true,
  },
  parameters: {
    msw: {
      handlers: unauthenticatedHandlers,
    },
  },
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('Username')).toBeVisible();
    await expect(canvas.getByLabelText('Password')).toBeVisible();
    await expect(canvas.getByText('Login')).toBeVisible();
  },
};

export const FilledForm: Story = {
  play: async ({ canvas, userEvent }) => {
    const usernameInput = canvas.getByLabelText('Username');
    const passwordInput = canvas.getByLabelText('Password');

    await userEvent.click(usernameInput);
    await userEvent.keyboard('admin');
    await userEvent.click(passwordInput);
    await userEvent.keyboard('secret123');

    await expect(usernameInput).toHaveValue('admin');
    await expect(passwordInput).toHaveValue('secret123');
  },
};

export const LoginButtonVisible: Story = {
  play: async ({ canvas }) => {
    const loginButton = canvas.getByRole('button', { name: /login/i });
    await expect(loginButton).toBeVisible();
    await expect(loginButton).toBeEnabled();
  },
};
