import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as yup from "yup";
import { Form, Formik, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from "../../redux/action/Product.action";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid } from "@mui/x-data-grid";
import { getCategory } from "../../redux/action/Category.action";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function Product(props) {
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([]);
  const [dopen, setDopen] = React.useState(false);
  const [did, setDid] = useState(0);
  const [update, setUpdate] = useState(false);

  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const category = useSelector((state) => state.category);
  const ProductCategory = category.category

  const handleDClickOpen = () => {
    setDopen(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDopen(false);
  };

  const handleInsert = (values) => {
    dispatch(addProduct(values));

    loadData();
    handleClose();
    formik.resetForm();
  };

  const handleDelete = (params) => {
    dispatch(deleteProduct(did));
    loadData();
  };

  const handleUpdate = (values) => {
    dispatch(updateProduct(values));
    loadData();
    handleClose();
    formik.resetForm();
  };

  const handleEdit = (params) => {
    handleClickOpen();
    console.log(params);
    setUpdate(true);
    formik.setValues(params.row);
  };

  let schema = yup.object().shape({
    categoryname: yup.string().required(), 
    name: yup.string().required(),
    price: yup.number().required().positive().integer(),
    product_img: yup.mixed().required(), 
  });

  const formik = useFormik({
    initialValues: {
      categoryname:'',
      name: "",
      price: "",
      product_img: ""
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (update) {
        handleUpdate(values);
      } else {
        handleInsert(values);
      }
    },
  });

  const columns = [

    { field: "name", headerName: "Name", width: 130 },
    { field: "price", headerName: "Price", width: 130 },
    { field: "categoryname", headerName: "CategoryName", width: 130 },
    {
      field: "product_img",
      headerName: "product_img",
      width: 130,
      renderCell: (params) => (
        <img src={params.row.product_img} width={50} height={50} alt="" />
        ),
      },
      {
        field: "action",
        headerName: "Action",
        width: 130,
        renderCell: (params) => (
          <>
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => {
              handleDClickOpen();
              setDid(params.row);
            }}
            >
            <DeleteIcon />
          </IconButton>

          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => handleEdit(params)}
            >
            <EditIcon />
          </IconButton>
        </>
      ),
     
    },
  ];

  const loadData = () => {
    let localData = JSON.parse(localStorage.getItem("product"));

    if (localData !== null) {
      setData(localData);
    }
  };

  useEffect(() => {
    loadData();
    dispatch(getProduct());
    dispatch(getCategory())
  }, []);

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    errors,
    setFieldValue,
    values,
  } = formik;
  return (
    <div>
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Open form dialog
        </Button>

        <Dialog
          open={dopen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are You Sure to delete?"}
          </DialogTitle>

          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={handleDelete} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>

        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={product.product}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>

        <Dialog fullWidth open={open} onClose={handleClose}>
          <Formik values={formik}>
            <Form onSubmit={handleSubmit}>
              <DialogTitle>Product</DialogTitle>
              <DialogContent>

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Category"
                  name="categoryname"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.categoryname}
                >
                  <MenuItem value="">Select category</MenuItem>
                  {
                    ProductCategory.map((d)=>{
                      return(
                        <MenuItem value={d.name} >{d.name}</MenuItem>
                      )
                    })
                  }
                </Select>
              </FormControl>
              <p>{errors.categoryname && touched.categoryname ? errors.categoryname : ''}</p>
             
                <TextField
                  value={values.name}
                  margin="dense"
                  name="name"
                  label="Product Name"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p>{errors.name && touched.name ? errors.name : ""}</p>
             
                <TextField
                  value={values.price}
                  margin="dense"
                  name="price"
                  label="Price"
                  type="number"
                  fullWidth
                  variant="standard"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p>{errors.price && touched.price ? errors.price : ""}</p>
             
             
                <TextField
                  value={values.Product_img}
                  margin="dense"
                  name="product_img"
                  label="Product_img"
                  type="file"
                  fullWidth
                  variant="standard"
                  onChange={(e) =>
                    setFieldValue("product_img", e.target.files[0])
                  }
                  onBlur={handleBlur}
                />
                <p>
                  {errors.product_img && touched.product_img
                    ? errors.product_img
                    : ""}
                </p>
              </DialogContent>
           
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                {update ? (
                  <Button type="submit">update</Button>
                ) : (
                  <Button type="submit">submit</Button>
                )}
              </DialogActions>
            </Form>
          </Formik>
        </Dialog>
      </div>
    </div>
  );
}

export default Product;
