import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
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
        evergreenAppURL="https://evergreen.example.com"
        localAuthRoute="/login"
        remoteAuthURL="https://auth.example.com"
        shouldUseLocalAuth
      >
        <Story />
      </AuthProvider>
    ),
  ],
  parameters: {
    msw: {
      handlers: [
        // Auth check fails so the login form stays visible
        http.post('*/graphql/query', () =>
          HttpResponse.json({ errors: [{ message: 'not authenticated' }] }, { status: 401 }),
        ),
      ],
    },
  },
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const usernameInput = await canvas.findByLabelText('Username');
    const passwordInput = canvas.getByLabelText('Password');
    await userEvent.type(usernameInput, 'admin');
    await userEvent.type(passwordInput, 'secret');
    await expect(usernameInput).toHaveValue('admin');
    await expect(passwordInput).toHaveValue('secret');
  },
};
