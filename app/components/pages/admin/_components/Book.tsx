import { Table, ActionIcon, Image } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useState, useCallback } from 'react';
import { UnstyledConfirmButton } from '~/components/elements/UnstyledConfirmButton';
import { UnstyledModalButton } from '~/components/elements/UnstyledModalButton';
import { deleteBook } from '~/models/book';
import { notify } from '~/utils/mantine/notifications';
import type { Book as BookType } from '@local/shared';

export const Book = ({ book }: { book: BookType }) => {
  const [loading, setLoading] = useState(false);
  const handleConfirm = useCallback(async () => {
    setLoading(true);
    try {
      await deleteBook(book);
      notify.info({ message: '書籍を削除しました' });
    } catch (e) {
      console.error(e);
      notify.error({ message: '削除に失敗しました' });
    } finally {
      setLoading(false);
    }
  }, [book]);

  return (
    <Table.Tr>
      <Table.Td>
        <ActionIcon.Group>
          <ActionIcon
            variant='white'
            color='secondary'
            component={UnstyledModalButton}
            modalContent={() => '更新フォーム'}
            modalProps={{ title: '書籍' }}
          >
            <IconEdit />
          </ActionIcon>
          <ActionIcon
            variant='white'
            color='red'
            component={UnstyledConfirmButton}
            message='本当に削除しますか？'
            onConfirm={handleConfirm}
            loading={loading}
          >
            <IconTrash />
          </ActionIcon>
        </ActionIcon.Group>
      </Table.Td>
      <Table.Td>{book.id}</Table.Td>
      <Table.Td>
        <Image src={book.image.url} h={100} w='auto' alt='表紙' />
      </Table.Td>
      <Table.Td>{book.title}</Table.Td>
      <Table.Td className='tw-whitespace-pre-wrap'>
        {book.description}
      </Table.Td>
    </Table.Tr>
  );
};
