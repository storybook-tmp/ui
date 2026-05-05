import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { TextInputWithGlyph } from './index';

const meta = {
  component: TextInputWithGlyph,
  tags: ['ai-generated'],
  args: {
    label: 'Search',
    'aria-label': 'Search input',
  },
} satisfies Meta<typeof TextInputWithGlyph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole('textbox');
    await userEvent.type(input, 'hello');
    await expect(input).toHaveValue('hello');
  },
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Type to search...',
  },
};

export const WithPersistentPlaceholder: Story = {
  args: {
    persistentPlaceholder: <span>prefix://</span>,
  },
};
