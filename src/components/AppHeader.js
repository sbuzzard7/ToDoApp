import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button, { SelectButton } from './Button';
import { updateFilterStatus } from '../slices/todoSlice';
import ToDoModal from './ToDoModal';
import styles from '../styles/modules/app.module.scss';

// Creates the application header with a button to add a new task which when clicked opens the modal
// There is also a status menu to filter tasks based on completion status

function AppHeader() {
  const [modalOpen, setModalOpen] = useState(false);
  const initialFilterStatus = useSelector((state) => state.todo.filterStatus);
  const [filterStatus, setFilterStatus] = useState(initialFilterStatus);
  const dispatch = useDispatch();

  const updateFilter = (e) => {
    setFilterStatus(e.target.value);
    dispatch(updateFilterStatus(e.target.value));
  };

  return (
    <div className={styles.appHeader}>
      <Button variant="primary" onClick={() => setModalOpen(true)}>
        ADD TASK
      </Button>
      <SelectButton
        id="status"
        onChange={(e) => updateFilter(e)}
        value={filterStatus}
      >
        <option value="all">ALL</option>
        <option value="incomplete">INCOMPLETE</option>
        <option value="complete">COMPLETE</option>
      </SelectButton>
      <ToDoModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
}

export default AppHeader;
