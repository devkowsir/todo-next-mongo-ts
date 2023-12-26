interface TodoListProps {
  todos: ITodo[];
}

export const TodoList = ({ todos }: TodoListProps) => {
  return (
    <ul className="flex flex-col items-center gap-2">
      {todos.map((todo) => (
        <li key={todo._id}>{todo.title}</li>
      ))}
    </ul>
  );
};
