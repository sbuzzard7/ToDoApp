import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { MdOutlineClose } from 'react-icons/md';
import { v4 as uuid } from 'uuid';
import { format } from 'date-fns';
import styles from '../styles/modules/modal.module.scss';
import Button from './Button';
import { addToDo, updateToDo } from '../slices/todoSlice';

const dropIn = {
  hidden: {
    opacity: 0,
    transform: 'scale(0.9)',
  },
  visible: {
    transform: 'scale(1)',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: 'scale(0.9)',
    opacity: 0,
  },
};

function ToDoModal({ type, modalOpen, setModalOpen, toDo }) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('incomplete');
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === 'update' && toDo) {
      setTitle(toDo.title);
      setStatus(toDo.status);
    } else {
      setTitle('');
      setStatus('incomplete');
    }
  }, [type, toDo, modalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === '') {
      toast.error('Please enter a title');
      return;
    }
    if (title && status) {
      if (type === 'add') {
        dispatch(
          addToDo({
            id: uuid(),
            title,
            status,
            time: format(new Date(), 'p, MM/dd/yyyy'),
          })
        );
        toast.success('Task added successfully');
      }
      if (type === 'update') {
        if (toDo.title !== title || toDo.status !== status) {
          dispatch(updateToDo({ ...toDo, title, status }));
          toast.success('Task Updated successfully');
        } else {
          toast.error('No changes made');
          return;
        }
      }
      setModalOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          className={styles.wrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.container}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className={styles.closeButton}
              onKeyDown={() => setModalOpen(false)}
              onClick={() => setModalOpen(false)}
              role="button"
              tabIndex={0}
              // animation of close button
              initial={{ top: 40, opacity: 0 }}
              animate={{ top: -10, opacity: 1 }}
              exit={{ top: 40, opacity: 0 }}
            >
              <MdOutlineClose />
            </motion.div>

            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
              <h1 className={styles.formTitle}>
                {type === 'add' ? 'ADD' : 'UPDATE'} TASK
              </h1>
              <label htmlFor="title">
                TITLE
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label htmlFor="type">
                STATUS
                <select
                  id="type"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="incomplete">INCOMPLETE</option>
                  <option value="complete">COMPLETE</option>
                </select>
              </label>
              <div className={styles.buttonContainer}>
                <Button type="submit" variant="primary">
                  {type === 'add' ? 'ADD TASK' : 'UPDATE TASK'}
                </Button>
                <Button variant="secondary" onClick={() => setModalOpen(false)}>
                  CANCEL
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ToDoModal;
