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

export const WithValue: Story = {
  args: {
    label: 'Username',
    value: 'admin.user',
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText('Username');
    await expect(input).toBeVisible();
    await expect(input).toHaveValue('admin.user');
  },
};
