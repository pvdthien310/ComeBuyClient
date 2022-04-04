import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { productListSelector } from './../../redux/selectors'
import { getAll } from './../../redux/slices/productSlice'
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
    GridRowsProp,
    GridColDef
} from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { renderProgress } from './../../GridDataCellTemplate/ProgressBar'
import { renderStatus } from "../../GridDataCellTemplate/StatusTag";
function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
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
    console.log(data)
    const columns = [
        { field: 'id', hidden: true },
        {
            field: 'price', headerName: 'Price', width: 150, renderCell: (params) => (
              renderProgress(params.value)
            )
        },
        { field: 'memory', headerName: 'Memory', width: 150 },
        { field: 'name', headerName: 'Name', width: 150 },

    //     { field: 'col2', headerName: 'Column 2', width: 150, renderCell: (params) => (
    //         renderStatus(params.value)
    //       )
    // },
        { field: 'col2', headerName: 'Column 2', width: 150 },
    ];

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
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                // {...data}
                pageSize={pageSize}
                onPageSizeChange={(newPage) => setPageSize(newPage)}
                pagination
                columns={columns}
                rows={productList}
                component={{
                    Toolbar: CustomToolbar,
                }}
                getRowId={(row) => row.productID}
                onCellClick={handleOnCellClick}
            />
        </div>
    );
}

export default Product;