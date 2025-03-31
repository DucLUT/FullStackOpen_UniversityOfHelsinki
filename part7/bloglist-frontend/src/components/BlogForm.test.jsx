import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';
import blogService from '../services/blogs';

vi.mock('../services/blogs');

describe('BlogForm component', () => {
  test('testing when submitting the form it should work', async () => {
    const mockSetBlogs = vi.fn();
    const mockSetMessage = vi.fn();
    const mockToggleVisibility = vi.fn();

    blogService.create.mockResolvedValue({
      title: 'how to train dragon',
      author: 'Duc',
      url: 'www.http',
      id: 'mock-id',
    });

    render(
      <BlogForm
        blogs={[]}
        setBlogs={mockSetBlogs}
        setMessage={mockSetMessage}
        blogFormRef={{ current: { toggleVisibility: mockToggleVisibility } }}
      />
    );

    const titleInput = screen.getByPlaceholderText('titlehere');
    await userEvent.type(titleInput, 'how to train dragon');

    const authorInput = screen.getByPlaceholderText('authorhere');
    await userEvent.type(authorInput, 'Duc');

    const urlInput = screen.getByPlaceholderText('urlhere');
    await userEvent.type(urlInput, 'www.http');

    const submitButton = screen.getByRole('button', { name: 'create' });
    await userEvent.click(submitButton);

    expect(titleInput).toHaveValue('');
    expect(authorInput).toHaveValue('');
    expect(urlInput).toHaveValue('');

    expect(mockToggleVisibility).toHaveBeenCalledTimes(1);

    expect(blogService.create).toHaveBeenCalledTimes(1);
    expect(blogService.create).toHaveBeenCalledWith({
      title: 'how to train dragon',
      author: 'Duc',
      url: 'www.http',
    });

    expect(mockSetBlogs).toHaveBeenCalledTimes(1);
    expect(mockSetBlogs).toHaveBeenCalledWith([
      {
        title: 'how to train dragon',
        author: 'Duc',
        url: 'www.http',
        id: 'mock-id',
      },
    ]);

    expect(mockSetMessage).toHaveBeenCalledTimes(1);
    expect(mockSetMessage).toHaveBeenCalledWith(
      'a new blog how to train dragon by Duc'
    );
  });
});