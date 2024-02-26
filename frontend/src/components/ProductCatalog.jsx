import React, { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';

import { IconButton, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { FaSearch, FaPlus, FaSave, FaTimes } from 'react-icons/fa';
import { FiMoreVertical, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [editStates, setEditStates] = useState({});
  const [selectedProduct, setSelectedProduct] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddRow, setShowAddRow] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    currency: '',
  });
  const [sortOrder, setSortOrder] = useState(true);

  const fetchData = async (sort="", order="") => {
    try {
      const response = await fetch(
        `https://gcit-assignment.onrender.com/products?sort=${sort}&order=${order ? 'asc' : 'desc'}`
      );
      const data = await response.json();
      setProducts(data.products);
      setEditStates({});
    } catch (error) {
      console.error(error);
    }
  };

  const handleSort = (key) => {
    setSortOrder((prevSortOrder) => !prevSortOrder);
    fetchData(key, sortOrder);
  };

  const handleEditClick = (product) => {
    setEditStates((prevEditStates) => ({
      ...prevEditStates,
      [product._id]: true,
    }));
    setSelectedProduct(product);
  };

  const handleSaveEdit = async () => {
    // for(let i in selectedProduct) {
    //   if(!i){
    //     alert(`${i} can't be empty, please fill.`)
    //     return;
    //   }
    // }
    await fetch(`https://gcit-assignment.onrender.com/products/${selectedProduct._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedProduct),
    });
    fetchData();
    setSelectedProduct({});
  };

  const handleCancelEdit = () => {
    setEditStates((prevEditStates) => ({
      ...prevEditStates,
      [selectedProduct._id]: false,
    }));
    setSelectedProduct({});
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setOpenDeleteDialog(true);
  };

  const handleDelete = async () => {
    await fetch(`https://gcit-assignment.onrender.com/products/${selectedProduct._id}`, {
      method: 'DELETE',
    });
    fetchData();
    setOpenDeleteDialog(false);
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if(!value){
      alert(`${name} is empty, fill it.`)
    }
    setSelectedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setFilteredProducts([]);
  };

  const handleAddRow = () => {
    setShowAddRow(true);
  };

  const handleSaveNewProduct = async () => {
    try {
      // for(let i in newProduct) {
      //   if(!i)
      //   alert(`${i} is empty, Please fill it.`)
      //   console.log("inside for loop")
      // return;
      // }
      await fetch('https://gcit-assignment.onrender.com/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
      fetchData();
      setNewProduct({
        name: '',
        description: '',
        price: '',
        currency: '',
      });
      setShowAddRow(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelNewProduct = () => {
    setNewProduct({
      name: '',
      description: '',
      price: '',
      currency: '',
    });
    setShowAddRow(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <InputGroup w={'50%'} m={'2% auto'}>
        <Input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm((pre) => e.target.value);
            handleSearch();
          }}
        />
        
        <InputRightElement
        cursor="pointer"
        children={<FaTimes color="darkyellow" />}
        onClick={handleClearSearch}
        />
        
        <InputRightElement
          cursor="pointer"
          children={<FaPlus color="#8bc632" />}
          onClick={handleAddRow}
          mr={-12}
        />
        <InputRightElement
          pointerEvents="none"
          children={<FaSearch />}
          mr={10}
          backgroundColor="#d6c401"
        />
      </InputGroup>
      {filteredProducts.length === 0 && searchTerm ? (
        <Text>No Matches Found.</Text>
      ) : (
        <Table variant="simple" size="md" borderWidth="1px" borderRadius="lg" m={"auto"} w={"90%"}>
          <Thead>
            <Tr fontWeight="800">
              <Th border="1px solid #E2E8F0">
                Action
              </Th>
              <Th onClick={() => handleSort('name')} border="1px solid #E2E8F0">
                Product Name <Text as="span" color="red.500">*</Text>
                {sortOrder ? <FiChevronUp /> : <FiChevronDown />}
              </Th>
              <Th onClick={() => handleSort('description')} border="1px solid #E2E8F0">
                Description <Text as="span" color="red.500">*</Text>
                {sortOrder ? <FiChevronUp /> : <FiChevronDown />}
              </Th>
              <Th onClick={() => handleSort('price')} border="1px solid #E2E8F0">
                Price <Text as="span" color="red.500">*</Text>
                {sortOrder ? <FiChevronUp /> : <FiChevronDown />}
              </Th>
              <Th onClick={() => handleSort('currency')} border="1px solid #E2E8F0">
                Currency <Text as="span" color="red.500">*</Text>
                {sortOrder ? <FiChevronUp /> : <FiChevronDown />}
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {showAddRow && (
              <Tr border="1px solid #E2E8F0">
                <Td border="1px solid #E2E8F0">
                  <IconButton
                    icon={<FaSave style={{ color: '#8bc632' }} />}
                    onClick={handleSaveNewProduct}
                    aria-label="Save"
                    mr={2}
                    style={{ backgroundColor: 'white' }}
                  />
                  <IconButton
                    icon={<FaTimes />}
                    colorScheme="red"
                    onClick={handleCancelNewProduct}
                    aria-label="Cancel"
                  />
                </Td>
                <Td border="1px solid #E2E8F0">
                  <Input
                    name="name"
                    border="1px solid #8bc632"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="Product Name"
                  />
                </Td>
                <Td border="1px solid #E2E8F0">
                  <Input
                    name="description"
                    border="1px solid #8bc632"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    placeholder="Description"
                  />
                </Td>
                <Td border="1px solid #E2E8F0">
                  <Input
                    name="price"
                    border="1px solid #8bc632"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    placeholder="Price"
                  />
                </Td>
                <Td border="1px solid #E2E8F0">
                  <Input
                    name="currency"
                    border="1px solid #8bc632"
                    value={newProduct.currency}
                    onChange={(e) => setNewProduct({ ...newProduct, currency: e.target.value })}
                    placeholder="Currency"
                  />
                </Td>
              </Tr>
            )}
            {(filteredProducts.length > 0 ? filteredProducts : products).map((product) => (
              <Tr key={product._id}>
                <Td>
                  {editStates[product._id] ? (
                    <>
                      <IconButton
                        icon={<FaSave style={{ color: '#8bc632' }} />}
                        onClick={handleSaveEdit}
                        aria-label="Save"
                        mr={2}
                        style={{ backgroundColor: 'white' }}
                      />
                      <IconButton
                        icon={<FaTimes />}
                        colorScheme="red"
                        onClick={handleCancelEdit}
                        aria-label="Cancel"
                      />
                    </>
                  ) : (
                    <Menu>
                      <MenuButton as={IconButton} icon={<FiMoreVertical />} variant="ghost" />
                      <MenuList style={{ boxShadow: '0px 0px 10px grey' }}>
                        <MenuItem onClick={() => handleEditClick(product)} color="#8bc632">
                          Edit
                        </MenuItem>
                        <MenuItem onClick={() => handleDeleteClick(product)} color="#8bc632">
                          Delete
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  )}
                </Td>
                <Td>
                  {editStates[product._id] ? (
                    <Input
                      name="name"
                      border="1px solid #8bc632"
                      value={selectedProduct.name}
                      onChange={handleInputChange}
                      placeholder="Product Name"
                    />
                  ) : (
                    product.name
                  )}
                </Td>
                <Td>
                  {editStates[product._id] ? (
                    <Input
                      name="description"
                      border="1px solid #8bc632"
                      value={selectedProduct.description}
                      onChange={handleInputChange}
                      placeholder="Description"
                    />
                  ) : (
                    product.description
                  )}
                </Td>
                <Td>
                  {editStates[product._id] ? (
                    <Input
                      name="price"
                      border="1px solid #8bc632"
                      value={selectedProduct.price}
                      onChange={handleInputChange}
                      placeholder="Price"
                    />
                  ) : (
                    product.price
                  )}
                </Td>
                <Td>
                  {editStates[product._id] ? (
                    <Input
                      name="currency"
                      border="1px solid #8bc632"
                      value={selectedProduct.currency}
                      onChange={handleInputChange}
                      placeholder="Currency"
                    />
                  ) : (
                    product.currency
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      {/* Delete Dialog */}
      <Modal isOpen={openDeleteDialog} onClose={handleCancelDelete}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Product</ModalHeader>
          <ModalBody>Are you sure you want to delete the product "{selectedProduct.name}"?</ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleDelete}>
              Delete
            </Button>
            <Button onClick={handleCancelDelete}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ProductCatalog;
