
const EditAndDeleteBtn = (props) => {
    
    return (
      <div className='edit-product-container'>
        <button
          className='delete-product-btn'
          onClick={()=> props.delete(props.itemId)}
        >
          Delete
        </button>
        <button
          className='edit-product-btn'
          onClick={() =>  props.edit(props.itemId)}
        >
          Edit
        </button>
      </div>
    );
}

export default EditAndDeleteBtn;