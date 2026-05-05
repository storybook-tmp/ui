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
    placeholder: 'Enter a value...',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('Search')).toBeVisible();
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Filter',
    placeholder: 'Type to filter...',
    icon: <Icon glyph="MagnifyingGlass" />,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('Filter')).toBeVisible();
  },
};

export const CssCheck: Story = {
  args: {
    label: 'Styled Input',
    placeholder: 'Check styles...',
  },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('Styled Input');
    // TextInput uses the Euclid Circular A font from LeafyGreen tokens
    await expect(getComputedStyle(input).fontFamily).toContain('Euclid Circular A');
  },
};
