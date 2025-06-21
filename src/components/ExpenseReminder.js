import React, { useEffect } from 'react';

const ExpenseReminder = ({ message, interval = 60000 }) => {
  useEffect(() => {
    const reminderInterval = setInterval(() => {
      alert(message);
    }, interval);

    return () => clearInterval(reminderInterval);
  }, [message, interval]);

  return null;
};

export default ExpenseReminder;
