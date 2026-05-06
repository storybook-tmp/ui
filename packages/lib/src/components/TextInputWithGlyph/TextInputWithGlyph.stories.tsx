import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { TextInputWithGlyph } from './index';
import Icon from '../Icon';

const meta = {
  component: TextInputWithGlyph,
  tags: ['ai-generated'],
  args: {
    label: 'Input',
  },
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
  render: () => (
    <TextInputWithGlyph
      label="Search with icon"
      placeholder="Search..."
      icon={<Icon glyph="MagnifyingGlass" />}
    />
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByLabelText('Search with icon')).toBeVisible();
  },
};

export const WithTyping: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByLabelText('Username');
    await userEvent.type(input, 'hello-world');
    await expect(input).toHaveValue('hello-world');
  },
};
