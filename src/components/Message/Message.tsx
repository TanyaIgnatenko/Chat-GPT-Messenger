import { useCallback, useState, MouseEvent } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import cn from 'classnames';

import { Message as TMessage } from '../../models/Message';
import { db } from '../../models/db';

import './Message.css';

interface Props {
    message: TMessage;
}

export default function Message({message}: Props) {
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    setContextMenu(
      !contextMenu
        ? {
            mouseX: event.clientX + 20,
            mouseY: event.clientY - 6,
          }
        : null,
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const handleDelete = useCallback(async () => {
    await db.messages.delete(message.id!!);
    handleClose();
  }, []);

  return (
    <div onContextMenu={handleContextMenu} className={cn('message', {
        'user-message': message.role === 'user',
    })}>
      {message.content.text}
      <Menu
        open={!!contextMenu}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          !!contextMenu
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
        disableAutoFocusItem
        elevation={2}
      >
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </div>
  );
}