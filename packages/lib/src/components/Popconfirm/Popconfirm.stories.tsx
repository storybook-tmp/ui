import { useRef, useState } from 'react';
import { Button } from '@leafygreen-ui/button';
import preview from '#.storybook/preview';
import { expect, waitFor } from 'storybook/test';
import Popconfirm from './index';

const meta = preview.meta({
  component: Popconfirm,
  tags: ['ai-generated'],
  parameters: {
    layout: 'centered',
  },
});

export default meta;

export const Default = meta.story({
  render: () => {
    const [open, setOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);
    return (
      <>
        <Button ref={triggerRef} onClick={() => setOpen((o) => !o)}>
          Delete Item
        </Button>
        <Popconfirm
          onConfirm={() => setOpen(false)}
          open={open}
          setOpen={setOpen}
          refEl={triggerRef}
        >
          Are you sure you want to delete this?
        </Popconfirm>
      </>
    );
  },
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole('button', { name: /delete item/i });
    await expect(trigger).toBeVisible();
  },
});

export const WithCustomConfirmText = meta.story({
  render: () => {
    const [open, setOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);
    return (
      <>
        <Button ref={triggerRef} onClick={() => setOpen((o) => !o)}>
          Remove Task
        </Button>
        <Popconfirm
          confirmText="Delete"
          onConfirm={() => setOpen(false)}
          open={open}
          setOpen={setOpen}
          refEl={triggerRef}
        >
          This action cannot be undone.
        </Popconfirm>
      </>
    );
  },
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole('button', { name: /remove task/i });
    await expect(trigger).toBeVisible();
  },
});

export const ConfirmDisabled = meta.story({
  render: () => {
    const [open, setOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);
    return (
      <>
        <Button ref={triggerRef} onClick={() => setOpen((o) => !o)}>
          Archive
        </Button>
        <Popconfirm
          confirmDisabled
          onConfirm={() => {}}
          open={open}
          setOpen={setOpen}
          refEl={triggerRef}
        >
          Confirm is disabled until conditions are met.
        </Popconfirm>
      </>
    );
  },
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole('button', { name: /archive/i });
    await expect(trigger).toBeVisible();
  },
});
