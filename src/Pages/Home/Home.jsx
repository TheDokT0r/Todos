import React, { useEffect, useState } from 'react'
import axios from 'axios';
import styles from './Home.module.scss';
import className from 'classnames';
const cx = className.bind(styles);

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState('');
  const [IP, setIP] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    axios.get('http://localhost:47/getTodosFromDB').then(res => {
      setTodos(res.data);
      setIsLoading(false);

      if (!res.data || res.data.length === 0) {
        alert('No todos found');
      }
    }).catch(err => {
      console.log(err);
      setIsLoading(false);
    });

    getMyIP();


    //Init theme
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      setIsDarkMode(true);
    }
  }, [])

  //We then sell your data to the highest bidder :)
  const getMyIP = () => {
    // axios.get('https://localhost:47/fetchIP').then(res => {
    //   console.log(res.data);
    //   setIP(res.data);
    // }).catch(err => {
    //   console.log(err);
    // });

    fetch('http://ip-api.com/json')
      .then(response => response.json())
      .then(data => {
        setIP(data.query);
      })
  }


  const change_complete_state = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  }

  const remove_todo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);

    if (newTodos.length === 0) {
      reset_server();
    }
  }


  const reset_server = () => {
    axios.get('http://localhost:47/resetTodos').then(res => {
      if (!res.data) {
        return;
      }
    }).catch(err => {
      console.log(err);
    });
  }


  const submit_to_server = () => {
    axios.post('http://localhost:47/sendTodosToDB', { todos: todos, IP: IP }).then(res => {
      if (!res.data) {
        return;
      }
      // alert('Todos submitted successfully');
    }).catch(err => {
      console.log(err);
    });
  }

  const add_to_list = (e) => {
    e.preventDefault();
    if (currentTodo === '') {
      alert('Please enter a todo');
      return;
    }

    setTodos([...todos, { txt: currentTodo, completed: false }]);
    setCurrentTodo('');
  }


  const input_change_handler = (e) => {
    setCurrentTodo(e.target.value)
  }

  //Such a stupid way to submit to server. But it doesn't work when I try to do that inside the add_to_list function
  //Fuck my life them I guess lol
  useEffect(() => {
    if (todos.length > 0) {
      submit_to_server();
    }
  }, [todos])


  //Stupid fucking function. But it doesn't work when I try to do that inside the html element
  const isChecked = (index) => {
    return todos[index].completed;
  }


  if (isLoading) return (<div>Loading...</div>);

  return (
    <div className={isDarkMode ? styles.body_dark : styles.body}>
      <div className={cx(styles.center_div)}>
        <h1>Todos</h1>

        <button onClick={() => {
          setIsDarkMode(!isDarkMode);
          localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
        }}>Change theme</button>
        <div className={styles.todos}>
          <ul>
            {/* Prints the todos */}
            {todos.map((todo, index) => (
              <div key={index} className={styles.todo_container}>
                {isChecked(index) ?
                  <p><del className={styles.cross_font}>{todo.txt}</del></p> :
                  <p>{todo.txt}</p>
                }
                {/* <li>{todo.txt}</li> */}
                <input type="checkbox" onChange={() => change_complete_state(index)} checked={isChecked(index)} />
                <button onClick={() => remove_todo(index)}>X</button>
              </div>
            ))}
          </ul>
        </div>
      </div>

      <div className={cx(styles.center_div, styles.form)}>
        <form>
          <input
            value={currentTodo}
            onChange={input_change_handler}
            placeholder='Enter a todo'
            className={cx(styles.form, styles.submit_button)}
            type="text" />
          <button
            className={styles.form}
            onClick={add_to_list}
            type="submit">
            Add Todo</button>
        </form>
      </div>

      <br />
      {/* <button onClick={submit_to_server}>Submit</button> */}
    </div >
  )
}
