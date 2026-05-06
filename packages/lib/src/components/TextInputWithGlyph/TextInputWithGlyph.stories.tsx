import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { TextInputWithGlyph } from './index';

const meta = {
  component: TextInputWithGlyph,
  tags: ['ai-generated'],
  args: {
    label: 'Search',
    placeholder: 'Type to search...',
  },
} satisfies Meta<typeof TextInputWithGlyph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    const input = canvas.getByLabelText('Search');
    await expect(input).toBeVisible();
  },
};

export const WithIcon: Story = {
  args: {
    icon: <span data-testid="custom-icon">X</span>,
  },
};

export const WithPersistentPlaceholder: Story = {
  args: {
    persistentPlaceholder: <span>prefix/</span>,
  },
};
