import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { useState, useRef } from 'react';
import { Button } from '@leafygreen-ui/button';
import styled from '@emotion/styled';
import Popconfirm from './index';

const meta = {
  component: Popconfirm,
  title: 'Components/Popconfirm',
} satisfies Meta<typeof Popconfirm>;

export default meta;
type Story = StoryObj<typeof meta>;

const Container = styled.div`
  padding: 40px;
`;

const PopconfirmWithState = ({ defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  const [confirmed, setConfirmed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <Container>
      <Button
        ref={buttonRef}
        onClick={() => setOpen(true)}
      >
        Delete Item
      </Button>
      <Popconfirm
        align="top"
        justify="start"
        open={open}
        refEl={buttonRef.current}
        setOpen={setOpen}
        onConfirm={() => setConfirmed(true)}
      >
        <p>Are you sure you want to delete this item?</p>
        <p>This action cannot be undone.</p>
      </Popconfirm>
      {confirmed && <p style={{ marginTop: '16px', color: 'green' }}>✓ Item deleted!</p>}
    </Container>
  );
};

export const Closed: Story = {
  render: () => <PopconfirmWithState defaultOpen={false} />,
  play: async (context) => {
    const canvas = context.canvas;
    const deleteButton = await canvas.findByRole('button', { name: /delete item/i });
    await expect(deleteButton).toBeVisible();
    // Popover content should not be visible when closed
    await expect(canvas.queryByText(/are you sure/i)).not.toBeInTheDocument();
  },
};

export const Open: Story = {
  render: () => <PopconfirmWithState defaultOpen={true} />,
  play: async (context) => {
    const canvas = context.canvas;
    // Confirmation text should be visible
    await expect(canvas.getByText(/are you sure you want to delete/i)).toBeVisible();
    await expect(canvas.getByText(/this action cannot be undone/i)).toBeVisible();
    // Action buttons should be visible
    const cancelBtn = canvas.getByRole('button', { name: /cancel/i });
    const yesBtn = canvas.getByRole('button', { name: /yes/i });
    await expect(cancelBtn).toBeVisible();
    await expect(yesBtn).toBeVisible();
  },
};

export const WithCustomText: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
      <Container>
        <Button
          ref={buttonRef}
          onClick={() => setOpen(true)}
        >
          Confirm Action
        </Button>
        <Popconfirm
          align="top"
          justify="start"
          open={open}
          refEl={buttonRef.current}
          setOpen={setOpen}
          confirmText="Proceed"
          onConfirm={() => {}}
        >
          <p>Do you want to proceed with this action?</p>
        </Popconfirm>
      </Container>
    );
  },
  play: async (context) => {
    const canvas = context.canvas;
    const userEvent = context.userEvent;

    const button = await canvas.findByRole('button', { name: /confirm action/i });
    await expect(button).toBeVisible();

    // Open the popover
    await userEvent.click(button);

    // Custom button text should be visible
    const proceedBtn = canvas.getByRole('button', { name: /proceed/i });
    await expect(proceedBtn).toBeVisible();
    await expect(canvas.getByText(/do you want to proceed/i)).toBeVisible();
  },
};

export const WithConfirmation: Story = {
  render: () => <PopconfirmWithState />,
  play: async (context) => {
    const canvas = context.canvas;
    const userEvent = context.userEvent;

    const deleteButton = await canvas.findByRole('button', { name: /delete item/i });

    // Click to open
    await userEvent.click(deleteButton);
    await expect(canvas.getByText(/are you sure/i)).toBeVisible();

    // Click confirm
    const confirmButton = canvas.getByRole('button', { name: /yes/i });
    await userEvent.click(confirmButton);

    // Should see confirmation message
    await expect(canvas.getByText(/item deleted/i)).toBeVisible();
  },
};

export const WithCancellation: Story = {
  render: () => <PopconfirmWithState />,
  play: async (context) => {
    const canvas = context.canvas;
    const userEvent = context.userEvent;

    const deleteButton = await canvas.findByRole('button', { name: /delete item/i });

    // Click to open
    await userEvent.click(deleteButton);
    await expect(canvas.getByText(/are you sure/i)).toBeVisible();

    // Click cancel
    const cancelButton = canvas.getByRole('button', { name: /cancel/i });
    await userEvent.click(cancelButton);

    // Popover should close
    await expect(canvas.queryByText(/are you sure/i)).not.toBeInTheDocument();
    // No deletion message should appear
    await expect(canvas.queryByText(/item deleted/i)).not.toBeInTheDocument();
  },
};
