import { ContactSupportOutlined } from "@material-ui/icons";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FeatureSelect } from "../../components";
import { getAllFeature } from "../../redux/slices/featureSlice";
import FilterAccordion from "../FilterAccordion";
import { AirbnbSlider, AirbnbThumbComponent } from "./style";

const FilterColumn = (props) => {
    const dispatch = useDispatch()
    const [currentFeature, setCurrentFeature] = useState([])
    const [featureList, setFeatureList] = useState([])
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
    };
    return (
        <Stack sx={{ backgroundColor: '#C69AD9', justifyContent:'center' }}>
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
                    defaultValue={[200, 3000]}
                />
                <Box sx={{ backgroundColor: 'white', height: 2, marginTop: 2, width: '100%' }}></Box>
            </Stack>
            <Stack sx={{ p:2 }}>
                <Typography variant="h6" fontWeight={'bold'} color={'white'} sx={{ pb: 1 }}>Choose With Your Option</Typography>
                <FilterAccordion product={props.product} handleFilter={props.handleFilter}/>
                <Box sx={{ backgroundColor: 'white', height: 2, width: '100%' }}></Box>
            </Stack>

        </Stack>
    )
}
export default FilterColumn;