import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory,deleteCategory,updateCategory,getCategory} from '../../redux/action/Category.action';



function Category(props) {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState([]);
    const [dopen, setDopen] = React.useState(false);
    const [did, setDid] = useState(0);
    const [update, setUpdate] = useState(false);
    const [filterData, setFilterData] = useState([]);

    const dispatch = useDispatch();
    const category = useSelector(state => state.category);

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
        // let id = Math.floor(Math.random() * 1000);

        // let data = {
        //     id: id,
        //     ...values
        // }

        // const localData = JSON.parse(localStorage.getItem('category'));
        // // console.log(values)

        // if (localData === null) {

        //     localStorage.setItem("category", JSON.stringify([data]));
        // }
        // else {
        //     localData.push(data);
        //     localStorage.setItem("category", JSON.stringify(localData));
        // }
       dispatch(addCategory(values))

        loadData();
        handleClose();
        formikObj.resetForm();
    }

    const handleDelete = (params) => {
        // let localData = JSON.parse(localStorage.getItem('category'));
        // // console.log(params.id);

        // let fData = localData.filter((l) => l.id !== did)

        // // console.log(fData);
        // localStorage.setItem("category", JSON.stringify(fData));
        dispatch(deleteCategory(did))
        loadData();
    }

    const handleUpdate = (values) => {

        // const localData = JSON.parse(localStorage.getItem('category'));
        // let uData = localData.map((l) => {
        //     if (l.id === values.id) {
        //         return values;
        //     }
        //     else {
        //         return l;
        //     }
        // })

        // localStorage.setItem("category", JSON.stringify(uData));
        // setUpdate(false);
        dispatch(updateCategory(values))
        loadData();
        handleClose();
        formikObj.resetForm();

    }


    const handleEdit = (params) => {
        handleClickOpen();
        console.log(params);
        setUpdate(true);
        formikObj.setValues(params.row);

    }

    const handleSearch = (val) => {
        // console.log(val);
        let localData = JSON.parse(localStorage.getItem("category"));
        // console.log(localData);
        let fData = localData.filter((l) => (
            l.name.toLowerCase().includes(val.toLowerCase()) 
            
        ))
        setFilterData(fData);
    }
    let finaleData = filterData.lenght > 0 ? filterData : data

    let schema = yup.object().shape({
        name: yup.string().required(" please enter category name"),
        category_img: yup.mixed().required()

    });

    const formikObj = useFormik({
        initialValues: {
            name: '',
            category_img: ''

        },
        validationSchema: schema,
        onSubmit: values => {
            if (update) {
                handleUpdate(values);
            }
            else {

                handleInsert(values);
            }

        },
    });

    const columns = [

        { field: 'name', headerName: 'Name', width: 130 },
        {
            field: 'category_img',
            headerName: 'Category_Image',
            width: 130,
            renderCell: (params) => (
                <img src={params.row.category_img} width={50} height={50} alt='' />
            )
        },
        {

            field: 'action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" size="large" onClick={() => { handleDClickOpen(); setDid(params.row) }}>
                        <DeleteIcon />
                    </IconButton>

                    <IconButton aria-label="delete" size="large" onClick={() => handleEdit(params)}>
                        <EditIcon />
                    </IconButton>
                </>

            )

        }
    ];

    const loadData = () => {
        let localData = JSON.parse(localStorage.getItem('category'));

        if (localData !== null) {

            setData(localData);
        }
    }


    useEffect(() => {
        loadData();
        dispatch(getCategory());
    }, [])


    const { errors, handleChange, handleSubmit, handleBlur, touched,setFieldValue ,values} = formikObj
    return (
        <div>

            <Button variant="outlined" onClick={handleClickOpen}>
                Add Category
            </Button>
            <TextField
                margin="dense"
                id="search"
                name="search"
                label="category search"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => handleSearch(e.target.value)}
            />

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={category.category}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>

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


            <Dialog open={open} onClose={handleClose}>
                <Formik values={formikObj}>
                    <Form onSubmit={handleSubmit}>
                        <DialogTitle> Add category</DialogTitle>
                        <DialogContent>

                            <TextField
                                value={values.name}
                                margin="dense"
                                id="name"
                                name="name"
                                label="category Name"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.name && touched.name ? <p>{errors.name}</p> : ''}

                            
                            <input
                            name ="category_img"
                            type="file"
                            onChange={(e)=>setFieldValue("category_img",e.target.files[0])}
                            />
                            {errors.category_img && touched.category_img ? <p>{errors.category_img}</p> : ''}


                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            {
                                update ?
                                    <Button type='submit'>update</Button>
                                    :
                                    <Button type='submit'>submit</Button>
                            }
                        </DialogActions>
                    </Form>
                </Formik>
            </Dialog>


        </div>
    );
}

export default Category;