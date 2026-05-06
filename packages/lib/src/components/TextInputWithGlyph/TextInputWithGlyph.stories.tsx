import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Icon from '../Icon';
import { TextInputWithGlyph } from '.';

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
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole('textbox');
    await userEvent.type(input, 'hello');
    await expect(input).toHaveValue('hello');
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    icon: <Icon glyph="MagnifyingGlass" />,
  },
};

export const WithPersistentPlaceholder: Story = {
  args: {
    label: 'Duration',
    persistentPlaceholder: <span>seconds</span>,
  },
};
