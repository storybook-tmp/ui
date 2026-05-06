import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Icon from '../Icon';
import { TextInputWithGlyph } from './index';

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
    await expect(input).toHaveAttribute('placeholder', 'Type to search...');
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Search Input',
    placeholder: 'Search...',
    icon: <Icon glyph="MagnifyingGlass" />,
  },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('Search Input');
    await expect(input).toBeVisible();
  },
};

export const WithPersistentPlaceholder: Story = {
  args: {
    label: 'Duration',
    persistentPlaceholder: <span>hh:mm:ss</span>,
  },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('Duration');
    await expect(input).toBeVisible();
    await expect(canvas.getByText('hh:mm:ss')).toBeVisible();
  },
};

export const WithValue: Story = {
  args: {
    label: 'Username',
    value: 'admin.user',
  },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('Username');
    await expect(input).toHaveValue('admin.user');
  },
};
