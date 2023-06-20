import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar/SearchBar';
import Table from './components/Table/Table';
import DeleteSelectedButton from './components/DeleteSelectedButton/DeleteSelectedButton';
import Pagination from './components/Pagination/Pagination';

function App() {
  const [data, setData] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // Fetch data from the API
    axios.get(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`).then((res) => {
      setData(res.data);
    });
  }, []);

  const handleDelete = (id) => {
    // Delete an item from the data
    setData((prevData) => prevData.filter((data) => data.id !== id));
  };

  const handleEdit = (item) => {
    // Set the ID of the item being edited
    setEditItemId(item.id);
  };

  const handleSave = () => {
    // Clear the ID of the item being edited
    setEditItemId(null);
  };

  const handleInputChange = (e, item) => {
    // Handle input change in the table cells
    const { name, value } = e.target;
    const updatedData = data.map((dataItem) => {
      if (dataItem.id === item.id) {
        return {
          ...dataItem,
          [name]: value,
        };
      }
      return dataItem;
    });
    setData(updatedData);
  };

  const handleToggleAll = () => {
    // Toggle selection of all items
    if (selectedItems.length === data.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(data.map((item) => item.id));
    }
  };

  const handleToggleItem = (itemId) => {
    // Toggle selection of an individual item
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleDeleteSelected = () => {
    // Delete selected items
    const itemsToDelete = selectedItems.filter((itemId) =>
      paginatedData.some((item) => item.id === itemId)
    );

    setData((prevData) => prevData.filter((data) => !itemsToDelete.includes(data.id)));
    setSelectedItems([]);
  };

  const filteredData = data.filter((item) => {
    // Filter data based on search query
    const { name, email, role } = item;
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      name.toLowerCase().includes(lowerCaseQuery) ||
      email.toLowerCase().includes(lowerCaseQuery) ||
      role.toLowerCase().includes(lowerCaseQuery)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    // Handle page change in the pagination component
    setCurrentPage(page);
  };

  return (
    <div>
      <SearchBar
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
      />
      <Table
        data={paginatedData}
        editItemId={editItemId}
        selectedItems={selectedItems}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onSave={handleSave}
        onInputChange={handleInputChange}
        onToggleAll={handleToggleAll}
        onToggleItem={handleToggleItem}
      />
      <DeleteSelectedButton onDeleteSelected={handleDeleteSelected} />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredData.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
