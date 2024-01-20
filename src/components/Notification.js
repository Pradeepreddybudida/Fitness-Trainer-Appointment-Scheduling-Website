import React, { useEffect } from 'react';

const Notification = ({ message, duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div style={{ position: 'fixed', bottom: 10, left: '40%', backgroundColor: 'rgb(72, 190, 61)', padding: '10px', borderRadius: '5px', color: 'white',  fontWeight: 'bold'}}>
      {message}
    </div>
  );
};

export default Notification;
