import { Icon } from '@leafygreen-ui/icon';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { TextInputWithGlyph } from './index';

const meta = {
  component: TextInputWithGlyph,
  tags: ['ai-generated'],
  args: {
    label: 'Search',
    placeholder: 'Enter value...',
  },
} satisfies Meta<typeof TextInputWithGlyph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('Search')).toBeVisible();
  },
};

export const WithIcon: Story = {
  args: {
    icon: <Icon glyph="MagnifyingGlass" />,
  },
};

export const WithPersistentPlaceholder: Story = {
  args: {
    persistentPlaceholder: <span>prefix/</span>,
  },
};

export const CssCheck: Story = {
  args: {
    label: 'Styled Input',
  },
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('Styled Input');
    // The global styles from the preview set font-family via bodyStyles.
    // Asserting the input inherits the Euclid Circular A font family proves CSS loaded.
    await expect(getComputedStyle(input).fontFamily).toContain('Euclid Circular A');
  },
};
