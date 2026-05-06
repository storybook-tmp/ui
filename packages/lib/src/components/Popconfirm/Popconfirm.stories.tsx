import { useRef, useState } from 'react';
import { Button } from '@leafygreen-ui/button';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import Popconfirm from './index';

const PopconfirmWithTrigger = ({
  confirmDisabled,
  confirmText,
}: {
  confirmDisabled?: boolean;
  confirmText?: string;
}) => {
  const [open, setOpen] = useState(true);
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <>
      <Button ref={ref} onClick={() => setOpen(!open)}>
        Delete item
      </Button>
      <Popconfirm
        confirmDisabled={confirmDisabled}
        confirmText={confirmText}
        open={open}
        refEl={ref as React.RefObject<HTMLElement>}
        setOpen={setOpen}
      >
        Are you sure you want to delete this item?
      </Popconfirm>
    </>
  );
};

const meta = {
  component: Popconfirm,
  tags: ['ai-generated'],
  args: {
    children: 'Confirm action?',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '100px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Popconfirm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <PopconfirmWithTrigger />,
};

export const CustomConfirmText: Story = {
  render: () => <PopconfirmWithTrigger confirmText="Confirm Delete" />,
};

export const ConfirmDisabled: Story = {
  render: () => <PopconfirmWithTrigger confirmDisabled />,
  play: async ({ canvasElement }) => {
    // LeafyGreen Tooltip renders in a portal; query the document body
    const body = canvasElement.ownerDocument.body;
    const confirmBtns = body.querySelectorAll('button');
    const yesBtn = Array.from(confirmBtns).find((btn) => btn.textContent === 'Yes');
    await expect(yesBtn).toBeTruthy();
    await expect(yesBtn!.getAttribute('aria-disabled')).toBe('true');
  },
};
