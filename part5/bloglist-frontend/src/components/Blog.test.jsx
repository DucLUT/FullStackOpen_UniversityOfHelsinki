import { render, screen } from '@testing-library/react';
import Blog from './Blog';
import userEvent from '@testing-library/user-event';

describe('Blog component', () => {

  test('testing the render of the blog by default', () => {
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

  test('simulating button in blog', async () => {
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
    const showButton = screen.getByText('show');
    const user = userEvent.setup();
    await user.click(showButton);
    const hideButton = screen.getByText('hide');
    screen.debug();
    expect(hideButton).toBeDefined();
    const titleDiv = document.querySelector('.fortest2');
    expect(titleDiv).toHaveTextContent('how to train dragon');
    expect(titleDiv).toHaveTextContent('Duc');
    expect(titleDiv).toHaveTextContent('www.http');
    expect(titleDiv).toHaveTextContent('likes 0');
    expect(titleDiv).not.toHaveStyle('display:none');
  });
});