import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { http, HttpResponse } from 'msw';
import { AuthProvider } from '../../context/AuthProvider';
import LoginPage from './index';

const meta = {
  component: LoginPage,
  tags: ['ai-generated'],
  parameters: {
    msw: {
      handlers: [
        // Override the default auth handler to return 401 so LoginPage stays visible
        http.post('*/graphql/query', () =>
          new HttpResponse(null, { status: 401 }),
        ),
        http.post('*/login', () =>
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

export const FormSubmit: Story = {
  args: {
    ignoreAuthCheck: true,
  },
  play: async ({ canvas, userEvent }) => {
    const usernameInput = canvas.getByLabelText('Username');
    const passwordInput = canvas.getByLabelText('Password');

    await userEvent.type(usernameInput, 'admin');
    await userEvent.type(passwordInput, 'secret');

    const submitButton = canvas.getByRole('button', { name: /login/i });
    await expect(submitButton).toBeVisible();
  },
};
