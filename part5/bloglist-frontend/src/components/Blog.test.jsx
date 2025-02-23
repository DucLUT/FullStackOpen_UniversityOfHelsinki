import { render, screen } from '@testing-library/react';
import Blog from './Blog';
import userEvent from '@testing-library/user-event';

test('testing the render of the blog by default',  () => {
  const blog = {
    author: 'Duc',
    title: 'how to train dragon',
    url: 'www.http',
    likes: 0,
    user: {
      name: 'Test User',
      id: '12345',
    },
  };

  render(<Blog blog={blog} blogs={[]} setBlogs={() => {}} user={{ id: '12345' }} />);

  const titleDiv = screen.getByRole('button', { name: 'show' }).closest('.fortest1');
  expect(titleDiv).toHaveTextContent('how to train dragon Duc');
  expect(titleDiv).not.toHaveStyle('display:none');
  const showButton = screen.getByText('show');
  expect(showButton).toBeDefined();
});