import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Popconfirm from './index';

const meta = {
  title: 'AI Generated/Complex/Popconfirm',
  component: Popconfirm,
} satisfies Meta<typeof Popconfirm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  render: () => (
    <Popconfirm
      title="Delete this item?"
      description="This action cannot be undone."
      confirmText="Delete"
      onConfirm={() => console.log('Confirmed')}
    >
      <button>Delete</button>
    </Popconfirm>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <Popconfirm
        title="Are you sure?"
        confirmText="Yes"
        open={isOpen}
        setOpen={setIsOpen}
        onConfirm={() => {
          setIsOpen(false);
          console.log('Confirmed');
        }}
        onClose={() => setIsOpen(false)}
      >
        <button onClick={() => setIsOpen(true)}>Show Popconfirm</button>
      </Popconfirm>
    );
  },
};
