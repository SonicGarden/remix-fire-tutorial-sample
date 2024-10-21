import { Box, Group, LoadingOverlay } from '@mantine/core';
import { useCollectionData } from '~/hooks/useCollectionData';
import { booksQuery } from '~/models/book';
import { Book } from './_components/Book';

export const Books = () => {
  const { data: books, loading } = useCollectionData(booksQuery());

  return (
    <Box pos='relative'>
      <LoadingOverlay visible={loading} />
      <Group gap='xs' justify='center'>
        {books?.map((book) => <Book key={book.id} book={book} />)}
      </Group>
    </Box>
  );
};
