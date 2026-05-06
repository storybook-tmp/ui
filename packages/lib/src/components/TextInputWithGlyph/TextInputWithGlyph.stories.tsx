import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { TextInputWithGlyph } from './index';
import Icon from '../Icon';

const meta = {
  component: TextInputWithGlyph,
  tags: ['ai-generated'],
} satisfies Meta<typeof TextInputWithGlyph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Search',
    placeholder: 'Type to search...',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('Search')).toBeVisible();
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    icon: <Icon glyph="MagnifyingGlass" />,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('Search')).toBeVisible();
  },
};

export const WithPersistentPlaceholder: Story = {
  args: {
    label: 'Duration',
    persistentPlaceholder: <span>hh:mm:ss</span>,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('Duration')).toBeVisible();
    await expect(canvas.getByText('hh:mm:ss')).toBeVisible();
  },
};

export const WithTyping: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText('Username');
    await userEvent.type(input, 'admin-user');
    await expect(input).toHaveValue('admin-user');
  },
};
