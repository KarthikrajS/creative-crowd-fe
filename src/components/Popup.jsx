// import React from 'react';

// const Popup = ({ handleClose, show, children }) => {
//   const showHideClassName = show ? 'fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center' : 'hidden';

//   return (
//     <div className={showHideClassName}>
//       <div className="bg-white rounded-lg p-4">
//         <button onClick={handleClose} className="float-right text-gray-400 hover:text-gray-700">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Popup;

// import React from 'react';
// import { Modal } from '@material-ui/core';

// const Popup = ({ handleClose, show, children }) => {
//   const handleCloseModal = () => {
//     handleClose(false);
//   };

//   return (
//     <Modal open={show} onClose={handleCloseModal}>
//       <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
//         <div className="bg-white p-5 rounded-lg shadow-lg">{children}</div>
//       </div>
//     </Modal>
//   );
// };

// export default Popup;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    // backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(5, 3, 3, 3),
    borderRadius: "10px",
    maxWidth: "90%",
    overflow: "scroll",
    maxHeight: "90%",
  },
}));

const Popup = ({ handleClose, show, children }) => {
  const classes = useStyles();

  return (
    <Modal
      open={show}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className={classes.modal}
    >
      <div className={`${classes.paper} bg-white dark:bg-slate-400`}>
        {children}
      </div>
    </Modal>
  );
};

export default Popup;
