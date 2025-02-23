import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

test('test blog form work when submit', async () => {
  const mockBlogFormRef = { current: { toggleVisibility: vi.fn() } };
  render(<BlogForm blogs={[]} setBlogs={() => {}} setMessage={() => {}} blogFormRef={mockBlogFormRef} />);
  const user = userEvent.setup();
  const authorinput = screen.getByPlaceholderText('authorhere');
  const titleinput = screen.getByPlaceholderText('titlehere');
  const urlinput = screen.getByPlaceholderText('urlhere');
  const button = screen.getByRole('button', { name: 'create' });

  await user.type(authorinput, 'author');
  await user.type(titleinput, 'title');
  await user.type(urlinput, 'url');

  expect(authorinput).toHaveValue('author');
  expect(titleinput).toHaveValue('title');
  expect(urlinput).toHaveValue('url');

  await user.click(button);

  expect(authorinput).toHaveValue('');
  expect(titleinput).toHaveValue('');
  expect(urlinput).toHaveValue('');
});