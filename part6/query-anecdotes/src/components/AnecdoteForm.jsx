import { createAnecdote } from "../services/anecdotes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "../contexts/NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const [, notificationDispatch] = useNotification();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(newAnecdote));
      notificationDispatch({
        type: "NOTICE",
        payload: `Anecdote '${newAnecdote.content}' created!`,
      });
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR" });
      }, 5000);
    },
    onError: (error) => {
      notificationDispatch({
        type: "NOTICE",
        payload: `${error.response.data.error}`,
      });
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR" });
      }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
