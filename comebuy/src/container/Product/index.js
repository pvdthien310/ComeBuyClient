import React, {
    useState,
    useEffect,
    useMemo,
    useCallback,
    memo
} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { styled } from '@mui/material/styles';
import {
    DataGrid,
    GridActionsCellItem
} from '@mui/x-data-grid';
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Stack, Grid, Box } from '@mui/material';
// icons 
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';

//components
import DetailProductModal from "../../components/DetailProductModal/DetailProductModal";
import { renderImportantTag } from "../../GridDataCellTemplate/ImportantTag";

// variables
import { productListSelector } from './../../redux/selectors'

//function 
import { getAll } from './../../redux/slices/productSlice'
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";

const BGImg = styled('img')({
    height: '100%',
    width: '100%',
    position: 'absolute',
    resize: true,
})
const ProductTable = styled(DataGrid)(({ theme }) => ({
    height: 700,
    top: '10%',
    left: '10%',
    width: 1200,
    position: 'relative',
    backgroundColor: 'white',
   
}));

const Product = () => {

    const _productList = useSelector(productListSelector)  // list get from store
    const dispatch = useDispatch()
    const [productList, setProductList] = useState(_productList)
    const navigate = useNavigate()
    const initalValue = {index : 0, value: null}

    /// For modal
    const [openModal, setOpenModal] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(initalValue);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    /// For GridData
    const [pageSize, setPageSize] = useState(25);
    const deleteProduct = useCallback(
        (id) => () => {
        },
        [],
    );

    const editProduct = useCallback(
        (value) => () => {
            navigate('/product/edit', { state: value })
        }, [],
    );

    const showDetail = useCallback(
        (value) => () => {
            setCurrentProduct({index : Math.random(), value : value})
            // handleOpenModal()
        }, [],
    );

    const columns = useMemo(
        () => [
            { field: 'id', hide: true },
            { field: 'brand', headerName: 'Brand', width: 120 },
            { field: 'name', headerName: 'Name', width: 150 },
            { field: 'memory', headerName: 'Memory', width: 100 },
            { field: 'gpu', headerName: 'GPU', width: 150 },
            { field: 'cpu', headerName: 'CPU', width: 200 },
            { field: 'weight', headerName: 'Weight', width: 100 },
            {
                field: 'price', headerName: 'Price', width: 120, renderCell: (params) => (
                    renderImportantTag(params.value, 300)
                )
            },
            { field: 'origin', headerName: 'Origin', width: 120 },
            {
                field: 'actions',
                type: 'actions',
                headerName: 'Actions',
                width: 80,
                getActions: (params) => [
                    <GridActionsCellItem
                        icon={<InfoIcon />}
                        label="Details"
                        onClick={showDetail(params.row)}
                        showInMenu
                    />,
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        onClick={editProduct(params.row)}
                        showInMenu
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={deleteProduct(params.id)}
                        showInMenu
                    />,
                ],
            },
        ],
        [editProduct, showDetail, deleteProduct]
    );

    useEffect(() => {
        if (_productList.length === 0) {

            dispatch(getAll())
                .unwrap()
                .then((originalPromiseResult) => {
                    setProductList(originalPromiseResult)
                })
                .catch((rejectedValueOrSerializedError) => {
                    console.log("Error load product")
                })
        }
        if (_productList.length > 0)
            setProductList(_productList)
        return () => { setProductList({}) }
    }, [_productList])

    const handleOnCellClick = async (e) => {
        if (e.value != undefined) {
            setCurrentProduct({index : Math.random(), value : e.row})
        }
    };

    useEffect(() => {
        if (currentProduct != initalValue)
            setOpenModal(true)
    }, [currentProduct])

    return (
        <div style={{
            width: '100%',
            height: '100%',
        }}>
            <BGImg src='https://images.unsplash.com/photo-1490810194309-344b3661ba39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1448&q=80' />
            <DetailProductModal open={openModal} onClose={handleCloseModal} product={currentProduct.value} />
            <ProductTable
                pageSize={pageSize}
                onPageSizeChange={(newPage) => setPageSize(newPage)}
                pagination
                columns={columns}
                rows={productList}
                getRowId={(row) => row.productID}
                onCellClick={handleOnCellClick}
            />
            <Box sx={{ height: 50 }}></Box>
            <Routes>
                <Route path='add' element={<AddProduct />}></Route>
                <Route path='edit' element={<EditProduct />}></Route>
            </Routes>
        </div>
    );
}

export default memo(Product);