import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { http, HttpResponse } from 'msw';
import LoginPage from './index';

const meta = {
  component: LoginPage,
  tags: ['ai-generated'],
  parameters: {
    msw: {
      handlers: [
        // Override the default auth check to simulate unauthenticated state
        http.post('*/graphql/query', () =>
          HttpResponse.json({ errors: [{ message: 'Unauthorized' }] }, { status: 401 }),
        ),
        http.post('*/login', () => new HttpResponse(null, { status: 200 })),
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
    const usernameInput = canvas.getByLabelText('Username');
    const passwordInput = canvas.getByLabelText('Password');
    const loginButton = canvas.getByRole('button', { name: /login/i });

    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(loginButton).toBeVisible();
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

export const FormLayout: Story = {
  args: {
    ignoreAuthCheck: true,
  },
  play: async ({ canvas }) => {
    const loginButton = canvas.getByRole('button', { name: /login/i });
    // LoginPage uses a green background form. Verify the button is visible and styled.
    await expect(loginButton).toBeVisible();
    // The form wrapper uses display: flex and flex-direction: column
    const form = loginButton.closest('form');
    if (form) {
      const styles = getComputedStyle(form);
      await expect(styles.display).toBe('flex');
      await expect(styles.flexDirection).toBe('column');
    }
  },
};
