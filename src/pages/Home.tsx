import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    const titleAlreadyExists = tasks.find(
      (task) => task.title.toUpperCase() === newTaskTitle.toUpperCase()
    );

    if (titleAlreadyExists) {
      return Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
    }

    setTasks((oldTasks) => [...oldTasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const updateTasks = tasks.map((task) => ({ ...task }));

    const foundItem = updateTasks.find((item) => item.id === id);

    if (!foundItem) return;

    foundItem.done = !foundItem.done;

    setTasks(updateTasks);
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    Alert.alert(
      "Remover Item",
      "Tem certeza que você deseja remover esse item?",
      [
        { text: "Não", style: "cancel" },
        {
          text: "Sim",
          onPress: () => {
            const newTasks = tasks.filter((task) => task.id !== id);

            setTasks(newTasks);
          },
        },
      ]
    );
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const updateTasks = tasks.map((task) => ({ ...task }));

    const foundItem = updateTasks.find((item) => item.id === taskId);

    if (!foundItem) return;

    foundItem.title = taskNewTitle;

    setTasks(updateTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
