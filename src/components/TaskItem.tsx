import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";

import Icon from "react-native-vector-icons/Feather";

import trashIcon from "../assets/icons/trash/trash.png";
import editIcon from "../assets/icons/edit/edit.png";
import xIcon from "../assets/icons/close/close.png";

import { ItemWrapper } from "./ItemWrapper";

import { Task } from "./TasksList";

interface TaskItemProps {
  item: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, editedTitle: string) => void;
}

export function TaskItem({
  item,
  index,
  toggleTaskDone,
  removeTask,
  editTask,
}: TaskItemProps) {
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [editedTask, setEditedTask] = useState(item.title);
  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditingTask(!isEditingTask);
  }

  function handleCancelEditing() {
    setEditedTask(item.title);
    setIsEditingTask(false);
  }

  function handleSubmitEditing() {
    editTask(item.id, editedTask);
    setIsEditingTask(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditingTask) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditingTask]);

  return (
    <ItemWrapper index={index}>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          //TODO - use onPress (toggle task) prop
          onPress={() => toggleTaskDone(item.id)}
        >
          <View
            testID={`marker-${index}`}
            //TODO - use style prop
            style={!item.done ? styles.taskMarker : styles.taskMarkerDone}
          >
            {item.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          {isEditingTask ? (
            <TextInput
              value={editedTask}
              onChangeText={setEditedTask}
              editable={isEditingTask}
              onSubmitEditing={handleSubmitEditing}
              style={styles.taskText}
              ref={textInputRef}
            />
          ) : (
            <Text style={item.done ? styles.taskTextDone : styles.taskText}>
              {editedTask}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.iconsGroup}>
        {isEditingTask ? (
          <TouchableOpacity
            style={{ paddingHorizontal: 24 }}
            onPress={handleCancelEditing}
          >
            <Image source={xIcon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ paddingHorizontal: 24 }}
            onPress={handleStartEditing}
          >
            <Image source={editIcon} />
          </TouchableOpacity>
        )}

        <View
          style={{
            width: 2,
            height: 24,
            backgroundColor: "rgba(196, 196, 196, 0.24)",
          }}
        />

        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingHorizontal: 24 }}
          //TODO - use onPress (remove task) prop
          onPress={() => removeTask(item.id)}
          disabled={isEditingTask}
          activeOpacity={isEditingTask ? 0.2 : undefined}
        >
          <Image source={trashIcon} style={{ opacity: isEditingTask ? 0.2 : 1}} />
        </TouchableOpacity>
      </View>
    </ItemWrapper>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  iconsGroup: {
    display: "flex",
    flexDirection: "row",
    padding: 0,
    margin: 0,
  }
});
