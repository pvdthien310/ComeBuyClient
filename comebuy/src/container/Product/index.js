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
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
    GridActionsCellItem
} from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { renderProgress } from './../../GridDataCellTemplate/ProgressBar'
import { renderStatus } from "../../GridDataCellTemplate/StatusTag";
import { renderImportantTag } from "../../GridDataCellTemplate/ImportantTag";
function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

const Product = () => {

    const _productList = useSelector(productListSelector)  // list get from store
    const dispatch = useDispatch()
    const [productList, setProductList] = useState(_productList)
    const [pageSize, setPageSize] = React.useState(25);

    const { data, loading } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 20,
        maxColumns: 20,
    });
    // console.log(data)

    const deleteProduct = useCallback(
        (id) => () => {
            // setTimeout(() => {
            //     setRows((prevRows) => prevRows.filter((row) => row.id !== id));
            // });
            console.log('a')
        },
        [],

    );

    const editProduct = useCallback(
        (id) => () => {
            // setRows((prevRows) =>
            //     prevRows.map((row) =>
            //         row.id === id ? { ...row, isAdmin: !row.isAdmin } : row,
            //     ),
            // );
            console.log('b')
        },
        [],

    );

    const duplicateUser = useCallback(
        (id) => () => {
            // setRows((prevRows) => {
            //     const rowToDuplicate = prevRows.find((row) => row.id === id);
            //     return [...prevRows, { ...rowToDuplicate, id: Date.now() }];
            // });
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
                        onClick={editProduct(params.id)}
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

    const handleOnCellClick = (e) => {
        console.log(e);
    };

    return (
        <div style={{ height: 600, width: '70%' }}>
            
            <DataGrid
                // {...data}
                pageSize={pageSize}
                onPageSizeChange={(newPage) => setPageSize(newPage)}
                pagination
                columns={columns}
                rows={productList}
                // component={{
                //     Toolbar: CustomToolbar,
                // }}
                getRowId={(row) => row.productID}
                onCellClick={handleOnCellClick}
            />
        </div>
    );
}

export default memo(Product);