import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useStore } from "../store";
import "./index.css";
import uuid from "react-uuid";
function Task() {
  const { taskStore } = useStore();
  // 单选受控
  // 思想：mobx Store 去维护状态 input只需要把e.target.value 交给store让它来进行修改
  function onChange(e, id) {
    console.log(e.target.value, id);
    taskStore.singleCheck(id, e.target.checked);
  }
  // 全选
  function allChange(e) {
    console.log(e);
    taskStore.allCheck(e.target.checked);
  }
  // 删除
  function delTask(id) {
    console.log(id);
    taskStore.delTask(id);
  }
  // 新增
  const [taskValue, setTaskValue] = useState("");
  function addTask(e) {
    if (e.keyCode === 13) {
      taskStore.addTask({
        id: uuid(),
        name: taskValue,
        idDone: false,
      });
      setTaskValue("");
    }
  }
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        {/**新增输入框 */}
        <input
          className="new-todo"
          autoFocus
          autoComplete="off"
          value={taskValue}
          onChange={(e) => setTaskValue(e.target.value)}
          onKeyUp={addTask}
          placeholder="What needs to be done?"
        />
      </header>
      <section className="main">
        {/**全选 */}
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          checked={taskStore.isAll}
          onChange={allChange}
        />
        <label htmlFor="toggle-all"></label>
        <ul className="todo-list">
          {/**completed 类名标识 */}
          {taskStore.list.map((item) => (
            <li
              className={item.isDone ? "todo completed" : "todo"}
              key={item.id}
            >
              <div className="view">
                {/**单选框 受控和非受控 受控的方式 */}
                <input
                  className="toggle"
                  type="checkbox"
                  // defaultChecked={item.isDone}
                  onChange={(e) => onChange(e, item.id)}
                  checked={item.isDone}
                />
                <label>{item.name}</label>
                <button
                  className="destroy"
                  onClick={() => delTask(item.id)}
                ></button>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <footer className="footer">
        <span className="todo-count">
          任务总数：{taskStore.list.length} 已完成数：
          {taskStore.isFinishedLength()}
        </span>
      </footer>
    </section>
  );
}

export default observer(Task);
