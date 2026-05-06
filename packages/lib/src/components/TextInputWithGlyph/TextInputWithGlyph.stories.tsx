import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { TextInputWithGlyph } from '.';
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
    const input = canvas.getByLabelText('Search');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('placeholder', 'Type to search...');
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Search with Icon',
    placeholder: 'Search...',
    icon: <Icon glyph="MagnifyingGlass" />,
  },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('Search with Icon');
    await expect(input).toBeVisible();
  },
};

export const WithPersistentPlaceholder: Story = {
  args: {
    label: 'Duration',
    persistentPlaceholder: 'hours',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('hours')).toBeVisible();
    await expect(canvas.getByLabelText('Duration')).toBeVisible();
  },
};

export const WithTyping: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter email',
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText('Email');
    await userEvent.type(input, 'user@example.com');
    await expect(input).toHaveValue('user@example.com');
  },
};
