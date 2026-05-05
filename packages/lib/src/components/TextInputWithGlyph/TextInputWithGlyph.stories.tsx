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
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    icon: <Icon glyph="MagnifyingGlass" />,
  },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('Search');
    await expect(input).toBeVisible();
  },
};

export const WithPersistentPlaceholder: Story = {
  args: {
    label: 'Filter',
    persistentPlaceholder: 'regex:',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('regex:')).toBeVisible();
    await expect(canvas.getByLabelText('Filter')).toBeVisible();
  },
};

export const Typing: Story = {
  args: {
    label: 'Name',
    placeholder: 'Enter your name',
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText('Name');
    await userEvent.type(input, 'Jane Doe');
    await expect(input).toHaveValue('Jane Doe');
  },
};
