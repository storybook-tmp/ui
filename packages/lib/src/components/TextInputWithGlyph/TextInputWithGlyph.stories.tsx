import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { TextInputWithGlyph } from '.';

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
    const input = canvas.getByRole('textbox', { name: /search/i });
    await expect(input).toHaveAttribute('placeholder', 'Type to search...');
  },
};

export const WithTyping: Story = {
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole('textbox', { name: /search/i });
    await userEvent.type(input, 'hello world');
    await expect(input).toHaveValue('hello world');
  },
};

export const WithPersistentPlaceholder: Story = {
  args: {
    persistentPlaceholder: <span>regex:</span>,
  },
};
