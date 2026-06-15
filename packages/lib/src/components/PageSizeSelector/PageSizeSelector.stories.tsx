import type { Meta, StoryObj } from '@storybook/react-vite';
import PageSizeSelector from './index';

const meta = {
  title: 'AI Generated/Medium/PageSizeSelector',
  component: PageSizeSelector,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof PageSizeSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 10,
    onChange: () => {},
  },
};

export const Disabled: Story = {
  args: {
    value: 25,
    onChange: () => {},
    disabled: true,
  },
};
