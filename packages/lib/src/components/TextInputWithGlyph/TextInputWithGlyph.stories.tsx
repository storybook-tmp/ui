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
    await expect(canvas.getByLabelText('Search')).toBeVisible();
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Search with icon',
    placeholder: 'Enter a value...',
    icon: <Icon glyph="MagnifyingGlass" />,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('Search with icon')).toBeVisible();
  },
};

export const WithPersistentPlaceholder: Story = {
  args: {
    label: 'Regex Input',
    persistentPlaceholder: '/regex/',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('Regex Input')).toBeVisible();
    await expect(canvas.getByText('/regex/')).toBeVisible();
  },
};
