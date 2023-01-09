import { useCallback, useMemo, useState } from "react";
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
const SmallerButton = styled.button`
  display: inline-block;
  flex: 1;
  border: none;
  background-color: ${(props) => (props.disabled ? "red" : "teal")};
  color: white;
  height: 25px;
  width: 45px;
  border-radius: 2px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")}; ;
`;
const Text = styled.input`
  border: 2px solid #000;
  width: 200px;
  padding: 5px;
  border-radius: 2px;
  margin: 5px;
  cursor: pointer;
`;
const TaskCount = styled.span`
  margin: 10px;
`;
const Tasks = styled.div``;
const ListItem = styled.li`
  cursor: pointer;
  display: flex;
  cursor: pointer;
  width: 100%;
  justify-content: space-between;
`;
const App = () => {
  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState([]);
  const handleClick = useCallback(() => {
    if (input === "" || input.trim().length === 0) return;
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
    const list = todoList.map((task) => {
      let item = {};
      if (task.id === id) {
        item = { ...task, complete: !task.complete };
      } else item = { ...task };
      return item;
    });
    setTodoList(list);
  };

  const handleKeyDown = (e) => {
    if (e?.code === "Enter" || e?.code === "NumpadEnter") handleClick();
  };

  const handleClear = (id) => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  };

  const completedTaskCount = todoList.filter((todo) => todo.complete).length;
  return (
    <Container>
      <div>
        <h2>
          <center>To-do List</center>
        </h2>
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
          <ul style={{ listStyle: "none", padding: "0px", textDecoration: "none" }}>
            {todoList.map((todo, index) => {
              return (
                <ListItem
                  key={`key-${index}`}
                  complete={todo.complete}
                  id={todo.id}
                  onClick={() => handleComplete(todo.id)}
                  style={{ textDecoration: todo.complete && "line-through" }}
                >
                  {todo.task}
                  {
                    <span
                      style={{ textDecoration: "none" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClear(todo.id);
                      }}
                    >
                      <SmallerButton onClick={() => todo.deleteTask()}> X </SmallerButton>
                    </span>
                  }
                </ListItem>
              );
            })}
          </ul>
        </div>
      </div>
    </Container>
  );
};
export default App;
