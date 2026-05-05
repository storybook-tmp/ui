import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
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
    placeholder: 'Type something...',
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText('Search');
    await userEvent.type(input, 'hello');
    await expect(input).toHaveValue('hello');
  },
};

export const WithPersistentPlaceholder: Story = {
  args: {
    label: 'Duration',
    persistentPlaceholder: <span>hrs</span>,
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Filter',
    icon: <span data-testid="custom-icon">X</span>,
  },
};
