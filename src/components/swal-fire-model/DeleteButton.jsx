import React from 'react';
import Swal from 'sweetalert2';

const DeleteButton = ({ itemId, onDelete }) => {
  const handleDelete = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to undo this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async(result) => {
      if (result.isConfirmed) {
        await onDelete(itemId);
        // Swal.fire(
        //   'Deleted!',
        //   'The item has been deleted.',
        //   'success'
        // );
      }
    });
  };

  return (
    <button onClick={handleDelete} className="btn btn-danger">
      Delete
    </button>
  );
};

export default DeleteButton;
