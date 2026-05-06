import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import LoginPage from './index';
import { AuthProvider } from '../../context/AuthProvider';

const meta = {
  component: LoginPage,
  tags: ['ai-generated'],
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
    await expect(canvas.getByText('Login')).toBeVisible();
  },
};

export const FormInteraction: Story = {
  args: {
    ignoreAuthCheck: true,
  },
  play: async ({ canvas, userEvent }) => {
    const usernameInput = canvas.getByLabelText('Username', { selector: 'input' });
    await expect(usernameInput).toHaveValue('');
    await userEvent.click(usernameInput);
    // Verify the input is focusable and the form layout is correct
    await expect(usernameInput).toHaveFocus();
    const loginButton = canvas.getByText('Login');
    await expect(loginButton).toBeVisible();
  },
};
