import { createSlice } from '@reduxjs/toolkit';

const getInitialToDo = () => {
  // getting toDo list
  const localToDoList = window.localStorage.getItem('toDoList');
  // if toDo list is not empty
  if (localToDoList) {
    return JSON.parse(localToDoList);
  }
  window.localStorage.setItem('toDoList', []);
  return [];
};

const initialValue = {
  filterStatus: 'all',
  toDoList: getInitialToDo(),
};

export const todoSlice = createSlice({
  name: 'toDo',
  initialState: initialValue,
  reducers: {
    addToDo: (state, action) => {
      state.toDoList.push(action.payload);
      const toDoList = window.localStorage.getItem('toDoList');
      if (toDoList) {
        const toDoListArr = JSON.parse(toDoList);
        toDoListArr.push({
          ...action.payload,
        });
        window.localStorage.setItem('toDoList', JSON.stringify(toDoListArr));
      } else {
        window.localStorage.setItem(
          'toDoList',
          JSON.stringify([
            {
              ...action.payload,
            },
          ])
        );
      }
    },
    updateToDo: (state, action) => {
      const toDoList = window.localStorage.getItem('toDoList');
      if (toDoList) {
        const toDoListArr = JSON.parse(toDoList);
        toDoListArr.forEach((toDo) => {
          if (toDo.id === action.payload.id) {
            toDo.status = action.payload.status;
            toDo.title = action.payload.title;
          }
        });
        window.localStorage.setItem('toDoList', JSON.stringify(toDoListArr));
        state.toDoList = [...toDoListArr];
      }
    },
    deleteToDo: (state, action) => {
      const toDoList = window.localStorage.getItem('toDoList');
      if (toDoList) {
        const toDoListArr = JSON.parse(toDoList);
        toDoListArr.forEach((toDo, index) => {
          if (toDo.id === action.payload) {
            toDoListArr.splice(index, 1);
          }
        });
        window.localStorage.setItem('toDoList', JSON.stringify(toDoListArr));
        state.toDoList = toDoListArr;
      }
    },
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
});

export const { addToDo, updateToDo, deleteToDo, updateFilterStatus } =
  todoSlice.actions;
export default todoSlice.reducer;
