import { useCallback, useState } from "react";
import styled from "styled-components";
import "./index.css";
const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const Button = styled.button`
  display: inline-block;
  flex: 1;
  border: none;
  background-color: ${(props) => (props.disabled ? "red" : "teal")};
  color: white;
  height: 30px;
  width: 50px;
  border-radius: 2px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")}; ;
`;
const Text = styled.input`
  border: 2px solid #000;
  width: 200px;
  padding: 5px;
  border-radius: 2px;
  margin: 5px;
  cursor: "pointer";
`;
const TaskCount = styled.span`
  margin: 10px;
`;
const Tasks = styled.div``;
const LIST = styled.li`
  liststyle: "numbered";
  text-decoration: "line-through";
  cursor: "pointer";
`;
const App = () => {
  const [input, setInput] = useState("");
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [todoList, setTodoList] = useState([]);
  const handleClick = useCallback(() => {
    if (input === "" || input.trim().length === 0) return;
    console.log(input);
    const id = todoList.length + 1;
    setTodoList((prev) => [
      ...prev,
      {
        id: id,
        task: input,
        complete: false,
      },
    ]);
    setInput("");
  }, [input]);

  const handleComplete = (id) => {
    let list = todoList.map((task) => {
      let item = {};
      if (task.id === id) {
        if (!task.complete) {
          //Task is pending, modifying it to complete and increment the count
          setCompletedTaskCount(completedTaskCount + 1);
        } else {
          //Task is complete, modifying it back to pending, decrement Complete count
          setCompletedTaskCount(completedTaskCount - 1);
        }
        item = { ...task, complete: !task.complete };
      } else item = { ...task };
      return item;
    });
    setTodoList(list);
  };

  const handleKeyDown = (e) => {
    if (e?.code === "Enter" || e?.code === "NumpadEnter") handleClick();
  };
  return (
    <Container>
      <div>
        <h2>Todo List</h2>
        <Text value={input} onInput={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} />
        <Button onClick={handleClick} disabled={input.trim().length === 0}>
          Add
        </Button>
        <Tasks>
          <TaskCount>
            <b>Pending Tasks</b> {todoList.length - completedTaskCount}
          </TaskCount>
          <TaskCount>
            <b>Completed Tasks</b> {completedTaskCount}
          </TaskCount>
        </Tasks>
        <div>
          <ol type="1">
            {todoList.map((todo, index) => {
              return (
                <LIST
                  key={`key-${index}`}
                  complete={todo.complete}
                  id={todo.id}
                  onClick={() => handleComplete(todo.id)}
                  style={{
                    listStyle: "square",
                    textDecoration: todo.complete && "line-through",
                    cursor: "pointer",
                  }}
                >
                  {todo.task}
                </LIST>
              );
            })}
          </ol>
        </div>
      </div>
    </Container>
  );
};
export default App;
