import { useState, useEffect } from 'react';
import ProductService from '../../services/product.service';
import { IProduct, ApiResponse } from '../../types/products.type';
import { Box, Button, TextField, Typography, List, ListItem, ListItemText } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { NumericFormat } from 'react-number-format';

const ProductComponent = () => {

  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentProductId, setCurrentProductId] = useState<string | null>(null);
  const [newProduct, setNewProduct] = useState<Omit<IProduct, 'id'>>({
    name: '',
    description: '',
    value: 0,
  });
  const [message, setMessage] = useState<string | null>(null);

  // Setup products pagination
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: ApiResponse = await ProductService.getProducts(page);

        if (response && response.products && Array.isArray(response.products.results)) {
          setProducts(response.products.results);
          setTotalPages(response.pagination.num_pages);
        } else {
          console.error('Unexpected response structure:', response);
          setProducts([]);
        }
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };

    fetchData();
  }, [page]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePriceChange = (values: { floatValue: number | undefined }) => {
    setNewProduct((prev) => ({
      ...prev,
      value: values.floatValue || 0,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (currentProductId) {
        // Edit the product
        await ProductService.updateProduct(currentProductId, newProduct);
        setMessage('Product updated successfully!');
      } else {
        // Create new product
        await ProductService.createProduct(newProduct);
        setMessage('Product created successfully!');
      }
      setNewProduct({ name: '', description: '', value: 0 });
      setCurrentProductId(null);
      setPage(1); // Reset to the first page after creation/edit
      window.location.reload(); // Reload the page to reflect changes
    } catch (error) {
      console.error('Error creating/updating product:', error);
      setMessage('Failed to create/update product.');
    }
  };

  const handleDelete = async (productId: string) => {
    try {
      await ProductService.deleteProduct(productId);
      setMessage('Product deleted successfully!');
      setPage(1); // Reset to the first page after deleting a product
      window.location.reload(); // Reload the page to reflect changes
    } catch (error) {
      console.error('Error deleting product:', error);
      setMessage('Failed to delete product.');
    }
  };

  const handleEdit = (product: IProduct) => {
    setNewProduct({ name: product.name, description: product.description, value: product.value });
    setCurrentProductId(product.id);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {currentProductId ? 'Edit Product' : 'Create Product'}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column' }}
      >
        <TextField
          label="Name"
          name="name"
          value={newProduct.name}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          sx={{ mb: 2 }}
        />
        <TextField
          label="Description"
          name="description"
          value={newProduct.description}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
          sx={{ mb: 2 }}
        />
        <NumericFormat
          value={newProduct.value}
          customInput={TextField}
          thousandSeparator
          decimalScale={2}
          fixedDecimalScale
          prefix="$"
          label="Price"
          name="value"
          onValueChange={handlePriceChange}
          variant="outlined"
          margin="normal"
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<AddCircleIcon />}
        >
          {currentProductId ? 'Update Product' : 'Create Product'}
        </Button>
      </Box>
      {message && <Typography variant="body1" sx={{ mt: 2, color: 'success.main' }}>{message}</Typography>}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Product List
        </Typography>
        <List>
          {products.length > 0 ? (
            products.map((product) => (
              <ListItem
                key={product.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  p: 1,
                  borderBottom: '1px solid #ddd'
                }}
              >
                <ListItemText
                  primary={product.name}
                  secondary={`Description: ${product.description} | Price: $${product.value}`}
                />
                <Box>
                  <Button
                    onClick={() => handleEdit(product)}
                    variant="contained"
                    color="success"
                    startIcon={<EditIcon />}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(product.id)}
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    sx={{ ml: 1 }}
                  >
                    Delete
                  </Button>
                </Box>
              </ListItem>
            ))
          ) : (
            <Typography variant="body1">No products available.</Typography>
          )}
        </List>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            startIcon={<NavigateBeforeIcon />}
          >
            Previous
          </Button>
          <Typography variant="body1">
            Page {page} of {totalPages}
          </Typography>
          <Button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            endIcon={<NavigateNextIcon />}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductComponent;
