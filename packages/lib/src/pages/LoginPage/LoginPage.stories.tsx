import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { http, HttpResponse } from 'msw';
import { AuthProvider } from '../../context/AuthProvider';
import { EVERGREEN_APP_URL } from '../../../.storybook/msw-handlers';
import LoginPage from '.';

// Override auth to return unauthenticated so LoginPage stays on the login form
const unauthenticatedHandlers = [
  http.post(`${EVERGREEN_APP_URL}/graphql/query`, () =>
    new HttpResponse(null, { status: 401 }),
  ),
  http.get(`${EVERGREEN_APP_URL}/logout`, () =>
    HttpResponse.json({ message: 'ok' }),
  ),
];

const meta = {
  component: LoginPage,
  tags: ['ai-generated'],
  decorators: [
    (Story) => (
      <AuthProvider
        evergreenAppURL={EVERGREEN_APP_URL}
        remoteAuthURL={`${EVERGREEN_APP_URL}/login`}
        localAuthRoute="/login"
        shouldUseLocalAuth
      >
        <Story />
      </AuthProvider>
    ),
  ],
  parameters: {
    msw: {
      handlers: unauthenticatedHandlers,
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
    await expect(canvas.getByRole('button', { name: /login/i })).toBeVisible();
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
    await userEvent.type(passwordInput, 'password123');
    await expect(usernameInput).toHaveValue('admin');
    await expect(passwordInput).toHaveValue('password123');
  },
};

export const LoginFormLayout: Story = {
  args: {
    ignoreAuthCheck: true,
  },
  play: async ({ canvas }) => {
    const submitButton = canvas.getByRole('button', { name: /login/i });
    await expect(submitButton).toBeVisible();
    await expect(canvas.getByLabelText('Username')).toBeVisible();
    await expect(canvas.getByLabelText('Password')).toBeVisible();
  },
};
