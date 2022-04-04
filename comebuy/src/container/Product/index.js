import React, {
    useState,
    useEffect,
    useMemo,
    useCallback,
    memo
} from "react";
import { useDispatch, useSelector } from 'react-redux'
import { productListSelector } from './../../redux/selectors'
import { getAll } from './../../redux/slices/productSlice'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import {
    DataGrid,
    GridActionsCellItem
} from '@mui/x-data-grid';
import { renderProgress } from './../../GridDataCellTemplate/ProgressBar'
import { renderStatus } from "../../GridDataCellTemplate/StatusTag";
import { renderImportantTag } from "../../GridDataCellTemplate/ImportantTag";
import DetailProductModal from "../../components/DetailProductModal/DetailProductModal";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid } from "@material-ui/core";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 'auto',
    bgcolor: 'background.paper',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
};

const Product = () => {

    const _productList = useSelector(productListSelector)  // list get from store
    const dispatch = useDispatch()
    const [productList, setProductList] = useState(_productList)

    /// For modal
    const [openModal, setOpenModal] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    /// For GridData
    const [pageSize, setPageSize] = useState(25);
    const deleteProduct = useCallback(
        (id) => () => {
            console.log('a')
        },
        [],
    );

    const editProduct = useCallback(
        (value) => () => {
            console.log(value)
            setCurrentProduct(value.row)
            handleOpenModal()
        }, [],
    );

    const duplicateUser = useCallback(
        (id) => () => {
            console.log('c')
        },
        [],
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
            {
                field: 'actions',
                type: 'actions',
                width: 80,
                getActions: (params) => [
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={deleteProduct(params.id)}
                    />,
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        onClick={editProduct(params)}
                        showInMenu
                    />,
                    <GridActionsCellItem
                        icon={<FileCopyIcon />}
                        label="Duplicate User"
                        onClick={duplicateUser(params.id)}
                        showInMenu
                    />,
                ],
            },
        ],
        [deleteProduct, editProduct, duplicateUser]
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
        return () => {
            setProductList({});
        };
    }, [])

    const handleOnCellClick = async (e) => {
        if (e.value != undefined) {
            setCurrentProduct(e.row)
        }
    };

    // useEffect(() => {
    //     if (currentProduct != null)
    //         setOpenModal(true)
        
    // }, [currentProduct])

    return (
        <div style={{
            height: 600,
            width: '70%',
        }}>

            <DetailProductModal open={openModal} onClose={handleCloseModal} product={currentProduct} />

            <DataGrid
                pageSize={pageSize}
                onPageSizeChange={(newPage) => setPageSize(newPage)}
                pagination
                columns={columns}
                rows={productList}
                getRowId={(row) => row.productID}
                onCellClick={handleOnCellClick}
            />
        </div>
    );
}

export default memo(Product);