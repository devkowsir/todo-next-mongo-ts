interface TodoProps {
  todo: ITodo;
}

export const Todo = ({ todo }: TodoProps) => {
  return <li className="flex gap-2">{todo.title}</li>;
};
