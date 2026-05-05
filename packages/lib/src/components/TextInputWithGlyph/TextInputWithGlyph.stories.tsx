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
    await expect(canvas.getByLabelText('Search')).toBeVisible();
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Filter',
    placeholder: 'Filter results...',
    icon: <Icon glyph="MagnifyingGlass" />,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('Filter')).toBeVisible();
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

export const WithValue: Story = {
  args: {
    label: 'Task name',
    value: 'compile_task',
  },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('Task name');
    await expect(input).toBeVisible();
    await expect(input).toHaveValue('compile_task');
  },
};
