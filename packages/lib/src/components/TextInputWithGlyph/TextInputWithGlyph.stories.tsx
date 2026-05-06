import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Icon from '../Icon';
import { TextInputWithGlyph } from '.';

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
    const input = canvas.getByLabelText('Search');
    await expect(input).toBeVisible();
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Filter',
    placeholder: 'Enter filter...',
    icon: <Icon glyph="MagnifyingGlass" />,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('Filter')).toBeVisible();
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
