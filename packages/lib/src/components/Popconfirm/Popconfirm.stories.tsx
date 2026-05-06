import { useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, waitFor } from 'storybook/test';
import Popconfirm from './index';

const meta = {
  component: Popconfirm,
  tags: ['ai-generated'],
  args: {
    children: 'Placeholder',
  },
} satisfies Meta<typeof Popconfirm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const PopconfirmExample = () => {
      const triggerRef = useRef<HTMLButtonElement>(null);
      return (
        <div style={{ padding: '100px' }}>
          <button ref={triggerRef}>Delete Item</button>
          <Popconfirm
            open={true}
            setOpen={() => {}}
            refEl={triggerRef}
          >
            Are you sure you want to delete this item?
          </Popconfirm>
        </div>
      );
    };
    return <PopconfirmExample />;
  },
  play: async ({ canvasElement }) => {
    const doc = canvasElement.ownerDocument;
    await waitFor(() => {
      expect(doc.body.querySelector('[role="tooltip"]')).not.toBeNull();
    });
    await waitFor(() => {
      const cancelButton = Array.from(doc.querySelectorAll('button')).find(
        (btn) => btn.textContent === 'Cancel',
      );
      expect(cancelButton).toBeTruthy();
    });
  },
};

export const WithCustomConfirmText: Story = {
  render: () => {
    const PopconfirmExample = () => {
      const triggerRef = useRef<HTMLButtonElement>(null);
      return (
        <div style={{ padding: '100px' }}>
          <button ref={triggerRef}>Remove</button>
          <Popconfirm
            open={true}
            setOpen={() => {}}
            refEl={triggerRef}
            confirmText="Confirm"
          >
            Are you sure?
          </Popconfirm>
        </div>
      );
    };
    return <PopconfirmExample />;
  },
  play: async ({ canvasElement }) => {
    const doc = canvasElement.ownerDocument;
    await waitFor(() => {
      const confirmButton = Array.from(doc.querySelectorAll('button')).find(
        (btn) => btn.textContent === 'Confirm',
      );
      expect(confirmButton).toBeTruthy();
    });
  },
};

export const ConfirmDisabled: Story = {
  render: () => {
    const PopconfirmExample = () => {
      const triggerRef = useRef<HTMLButtonElement>(null);
      return (
        <div style={{ padding: '100px' }}>
          <button ref={triggerRef}>Action</button>
          <Popconfirm
            open={true}
            setOpen={() => {}}
            refEl={triggerRef}
            confirmDisabled
          >
            This action is not available right now.
          </Popconfirm>
        </div>
      );
    };
    return <PopconfirmExample />;
  },
  play: async ({ canvasElement }) => {
    const doc = canvasElement.ownerDocument;
    await waitFor(() => {
      const yesButton = Array.from(doc.querySelectorAll('button')).find(
        (btn) => btn.textContent === 'Yes',
      );
      expect(yesButton).toBeTruthy();
      expect(yesButton!.getAttribute('aria-disabled')).toBe('true');
    });
  },
};
