import { format } from 'date-fns';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import React, { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteToDo, updateToDo } from '../slices/todoSlice';
import styles from '../styles/modules/todoItem.module.scss';
import { getClasses } from '../utils/getClasses';
import CheckButton from './CheckButton';
import ToDoModal from './ToDoModal';

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function ToDoItem({ toDo }) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  // if the task is being marked as complete, the checkmark button will appear, otherwise it will not
  useEffect(() => {
    if (toDo.status === 'complete') {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [toDo.status]);

  const handleCheck = () => {
    setChecked(!checked);
    dispatch(
      updateToDo({ ...toDo, status: checked ? 'incomplete' : 'complete' })
    );
  };

  // prompts deletion message && added to original project by prompting user to confirm deletion to prevent accidental deletions
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteToDo(toDo.id));
      toast.success('Task Deleted Successfully');
    }
  };

  // opens the task modal to edit
  const handleUpdate = () => {
    setUpdateModalOpen(true);
  };

  return (
    <>
      <motion.div className={styles.item} variants={child}>
        <div className={styles.toDoDetails}>
          <CheckButton checked={checked} handleCheck={handleCheck} />
          <div className={styles.texts}>
            <p
              className={getClasses([
                styles.toDoText,
                toDo.status === 'complete' && styles['toDoText--completed'],
              ])}
            >
              {toDo.title}
            </p>
            <p className={styles.time}>
              {format(new Date(toDo.time), 'p, MM/dd/yyyy')}
            </p>
          </div>
        </div>
        <div className={styles.toDoActions}>
          <div
            className={styles.icon}
            onClick={() => handleDelete()}
            onKeyDown={() => handleDelete()}
            tabIndex={0}
            role="button"
          >
            <MdDelete />
          </div>
          <div
            className={styles.icon}
            onClick={() => handleUpdate()}
            onKeyDown={() => handleUpdate()}
            tabIndex={0}
            role="button"
          >
            <MdEdit />
          </div>
        </div>
      </motion.div>
      <ToDoModal
        type="update"
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
        toDo={toDo}
      />
    </>
  );
}

export default ToDoItem;
