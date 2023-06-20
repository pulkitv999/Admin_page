// components/Table.js
import React from 'react';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteOutlineSharpIcon from '@mui/icons-material/DeleteOutlineSharp';
import SaveSharpIcon from '@mui/icons-material/SaveSharp';
import "./Table.css"

function Table({
  data,
  editItemId,
  selectedItems,
  onDelete,
  onEdit,
  onSave,
  onInputChange,
  onToggleAll,
  onToggleItem,
}) {
  return (
    <table className='table'>
      <thead>
        <tr>
          <th>
            <input
              type='checkbox'
              checked={selectedItems.length === data.length}
              onChange={onToggleAll}
            />
          </th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>
              <input
                type='checkbox'
                checked={selectedItems.includes(item.id)}
                onChange={() => onToggleItem(item.id)}
              />
            </td>
            <td>
              <div className='table-cell'>
                {editItemId === item.id ? (
                  <input
                    type='text'
                    name='name'
                    value={item.name}
                    onChange={(e) => onInputChange(e, item)}
                  />
                ) : (
                  item.name
                )}
              </div>
            </td>
            <td>
              <div className='table-cell'>
                {editItemId === item.id ? (
                  <input
                    type='text'
                    name='email'
                    value={item.email}
                    onChange={(e) => onInputChange(e, item)}
                  />
                ) : (
                  item.email
                )}
              </div>
            </td>
            <td>
              <div className='table-cell'>
                {editItemId === item.id ? (
                  <input
                    type='text'
                    name='role'
                    value={item.role}
                    onChange={(e) => onInputChange(e, item)}
                  />
                ) : (
                  item.role
                )}
              </div>
            </td>
            <td>
              <div className='table-cell'>
                {editItemId === item.id ? (
                  <SaveSharpIcon onClick={onSave} fontSize='small' />
                ) : (
                  <EditNoteOutlinedIcon onClick={() => onEdit(item)} />
                )}
                <DeleteOutlineSharpIcon onClick={() => onDelete(item.id)} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
