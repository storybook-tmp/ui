import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import { http, HttpResponse } from 'msw';
import LoginPage from './index';

const meta = {
  component: LoginPage,
  tags: ['ai-generated'],
  parameters: {
    msw: {
      handlers: [
        // Override auth check to return unauthenticated so LoginPage shows the form
        http.post('*/graphql/query', () =>
          new HttpResponse(null, { status: 401 }),
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
    await waitFor(() => {
      expect(canvas.getByLabelText('Username')).toBeVisible();
    });
    await expect(canvas.getByLabelText('Password')).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: /login/i }),
    ).toBeVisible();
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

    await userEvent.click(usernameInput);
    await userEvent.type(usernameInput, 'admin');
    await waitFor(() => {
      expect(usernameInput).toHaveValue('admin');
    });

    await userEvent.click(passwordInput);
    await userEvent.type(passwordInput, 'secret');
    await waitFor(() => {
      expect(passwordInput).toHaveValue('secret');
    });
  },
};

export const SubmitForm: Story = {
  args: {
    ignoreAuthCheck: true,
  },
  play: async ({ canvas }) => {
    await waitFor(() => {
      expect(canvas.getByRole('button', { name: /login/i })).toBeVisible();
    });
    await expect(canvas.getByLabelText('Username')).toBeVisible();
    await expect(canvas.getByLabelText('Password')).toBeVisible();
  },
};
