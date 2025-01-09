import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import styles from '../styles/modules/app.module.scss';
import ToDoItem from './ToDoItem';

// Creating the motion effect when opening and closing the add task modal

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function AppContent() {
  const toDoList = useSelector((state) => state.todo.toDoList);
  const filterStatus = useSelector((state) => state.todo.filterStatus);

  const sortedToDoList = [...toDoList];
  sortedToDoList.sort((a, b) => new Date(b.time) - new Date(a.time));

  const filteredToDoList = sortedToDoList.filter((item) => {
    if (filterStatus === 'all') {
      return true;
    }
    return item.status === filterStatus;
  });

  return (
    <motion.div
      className={styles.content__wrapper}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {filteredToDoList && filteredToDoList.length > 0 ? (
          filteredToDoList.map((toDo) => <ToDoItem key={toDo.id} toDo={toDo} />)
        ) : (
          <motion.p variants={child} className={styles.emptyText}>
            NO TASKS
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default AppContent;
