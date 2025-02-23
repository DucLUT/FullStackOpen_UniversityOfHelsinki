import { render, screen } from '@testing-library/react';
import Blog from './Blog';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import blogService from '../services/blogs';

vi.mock('../services/blogs');

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
    const hideButton = await screen.findByText('hide');
    screen.debug();
    expect(hideButton).toBeDefined();
    const titleDiv = document.querySelector('.fortest2');
    expect(titleDiv).toHaveTextContent('how to train dragon');
    expect(titleDiv).toHaveTextContent('Duc');
    expect(titleDiv).toHaveTextContent('www.http');
    expect(titleDiv).toHaveTextContent('likes 0');
    expect(titleDiv).not.toHaveStyle('display:none');
  });
  test('like button calls event handler twice when clicked twice', async () => {
    const blog = {
      author: 'Duc',
      title: 'how to train dragon',
      url: 'www.http',
      likes: 0,
      id: '123',
      user: {
        name: 'Test User',
        id: '12345',
      },
    };
  
    // Mock blogService.update to simulate API behavior
    blogService.update.mockResolvedValue({ ...blog, likes: blog.likes + 1 });
  
    render(<Blog blog={blog} blogs={[blog]} setBlogs={() => {}} user={{ id: '12345' }} />);
  
    const user = userEvent.setup();
    await user.click(screen.getByText('show'));
  
    const likeButton = await screen.findByText('like');
    await user.click(likeButton);
    await user.click(likeButton);
    expect(blogService.update).toHaveBeenCalledTimes(2);
  });
});