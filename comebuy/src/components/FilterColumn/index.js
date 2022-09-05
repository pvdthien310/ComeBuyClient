import { ContactSupportOutlined } from "@material-ui/icons";
import { Button, Grid, Stack, styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FeatureSelect } from "../../components";
import { getAllFeature } from "../../redux/slices/featureSlice";
import FilterAccordion from "../FilterAccordion";
import { AirbnbSlider, AirbnbThumbComponent } from "./style";

const FilerByPriceBtn = styled(Button)({
    color: 'white',
    backgroundColor: 'black',
    borderRadius: '5px',
    borderWidth: '3px',
    marginBottom: '5px',
    '&:hover': {
        color: 'white',
        backgroundColor: 'grey',
    }
})

const FilterColumn = (props) => {
    const dispatch = useDispatch()
    const [currentFeature, setCurrentFeature] = useState([])
    const [featureList, setFeatureList] = useState([])
    const handleChange = (event, newValue) => {
        const arr = newValue.map(ite => ite*30)
        props.changeSelectedPrices(arr)
    };

    const marks = [
        {
            value: 0,
            label: '0',
        },
        {
            value: 50,
            label: '1500',
        },
        {
            value: 67,
            label: '2000',
        },
        {
            value: 100,
            label: '3000',
        },
    ];

    useEffect(() => {
        // Load Product
        dispatch(getAllFeature())
            .unwrap()
            .then((_originalPromiseResult) => {
                setFeatureList(_originalPromiseResult)
            })
            .catch((_rejectedValueOrSerializedError) => {
                console.log("Error load product")
            })
        return () => {
            setFeatureList([])
        }
    }, [])

    const handleFeatureChosen = (event) => {
        const {
            target: { value },
        } = event;
        setCurrentFeature(
            typeof value === 'string' ? value.split(',') : value,
        );
        props.handleFeatureChosen(event)
    };
    return (
        <Stack sx={{ backgroundColor: '#C69AD9', justifyContent: 'center' }}>
            <Typography variant="h6" sx={{ m: 1, color: 'white', width: '100%' }} fontWeight={'bold'} >Filter</Typography>
            <Box sx={{ backgroundColor: 'white', height: 5, width: '100%' }}></Box>
            <Stack sx={{ p: 2 }}>
                <Typography variant="h6" fontWeight={'bold'} color={'white'} sx={{ pb: 1 }}>Demand</Typography>
                <FeatureSelect features={featureList} currentFeature={currentFeature} handleFeatureChange={handleFeatureChosen}></FeatureSelect>
                <Box sx={{ backgroundColor: 'white', height: 2, width: '100%' }}></Box>
            </Stack>
            <Stack sx={{ pr: 2, pl: 2 }}>
                <Typography variant="h6" fontWeight={'bold'} color={'white'} sx={{ pb: 1 }}>Price</Typography>
                <AirbnbSlider
                    valueLabelDisplay="auto"
                    components={{ Thumb: AirbnbThumbComponent }}
                    getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
                    defaultValue={[0, 3000]}
                    onChange={handleChange}
                    step={10}
                    marks={marks}
                />
                <Box sx={{ backgroundColor: 'white', height: 2, marginTop: 2, width: '100%' }}></Box>
            </Stack>
            <Stack sx={{ p: 2 }}>
                <Typography variant="h6" fontWeight={'bold'} color={'white'} sx={{ pb: 1 }}>Choose With Your Option</Typography>
                <FilterAccordion handleFilter={props.handleFilter} />
                <Box sx={{ backgroundColor: 'white', height: 2, width: '100%' }}></Box>
            </Stack>
            <FilerByPriceBtn onClick={() => props.getRecords(1)}  variant="contained" sx={{ p: 1, m: 2 }}>Filter</FilerByPriceBtn>
        </Stack>
    )
}
export default FilterColumn;