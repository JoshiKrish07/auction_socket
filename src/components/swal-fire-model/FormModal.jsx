import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useState, useCallback } from 'react';

// Throttling function
const useThrottle = (callback, delay) => {
  const [lastCall, setLastCall] = useState(0);

  return useCallback((...args) => {
    const now = new Date().getTime();
    if (now - lastCall >= delay) {
      setLastCall(now);
      callback(...args);
    }
  }, [callback, delay, lastCall]);
};

const FormModal = ({ onSubmitForm }) => {
  const dispatch = useDispatch();
  const { data: allUsers } = useSelector((state) => state.tablesData.allusers);

  // Local state to hold input values
  const [newBid, setNewBid] = useState('');
  const [handleName, setHandleName] = useState('');
  const [isNameValid, setIsNameValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangeBid = (e) => {
    setNewBid(e.target.value);
    validateInputs(newBid, handleName);
  };

  const checkHandleName = (name) => {
    const exists = allUsers?.data?.some(user => user.handlename === name);
    setIsNameValid(exists);
    setErrorMessage(exists ? '' : 'User Not Found');
  };

  // Throttled version of checkHandleName
  const throttledCheckHandleName = useThrottle(checkHandleName, 300); // 300ms delay

  const handleChangeName = (e) => {
    const nameValue = e.target.value;
    setHandleName(nameValue);
    throttledCheckHandleName(nameValue);
    validateInputs(newBid, nameValue);
  };

  const validateInputs = (bid, name) => {
    const isValid = bid && name && isNameValid;
    Swal.getConfirmButton().disabled = !isValid;
  };

  const showModal = () => {
    Swal.fire({
      title: 'Enter Details',
      html: `
        <input type="text" id="newbid" class="swal2-input" placeholder="New Bid" value="${newBid}">
        <input type="text" id="handlename" class="swal2-input" placeholder="Handle Name" value="${handleName}">
        <div id="error-message" style="color: red; margin-top: 5px;">${errorMessage}</div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Submit',
      preConfirm: () => {
        const bidValue = Swal.getPopup().querySelector('#newbid').value;
        const nameValue = Swal.getPopup().querySelector('#handlename').value;

        if (!bidValue || !nameValue || !isNameValid) {
          Swal.showValidationMessage(`Please enter valid fields`);
        }

        return { newBid: bidValue, handleName: nameValue };
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        const formData = result.value; // Get the form data
        await onSubmitForm(formData);
      }
    });

    // Attach event listeners after the modal is rendered
    setTimeout(() => {
      const newBidInput = document.getElementById('newbid');
      const handleNameInput = document.getElementById('handlename');
      const errorMessageDiv = document.getElementById('error-message');

      newBidInput.addEventListener('input', (e) => {
        handleChangeBid(e);
        errorMessageDiv.textContent = errorMessage; // Update error message
      });

      handleNameInput.addEventListener('input', (e) => {
        handleChangeName(e);
        errorMessageDiv.textContent = errorMessage; // Update error message
      });
    }, 0);
  };

  return (
    <button onClick={showModal} className="btn btn-primary">Floor Bid</button>
  );
};

export default FormModal;
