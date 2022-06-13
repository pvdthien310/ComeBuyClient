
import { BrandNavBar, Slider, NavBar, BrandLine, FeatureBar } from '../../components'
import { styled } from '@mui/material/styles';
import { Grid, Stack } from '@mui/material';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';




const ImgFeatureLine = styled('img')(({ theme }) => ({
    width: '100%',
    height: 450,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 10,
    boxShadow: 10,


    [theme.breakpoints.down('sm')]: {
        display: 'none',
    },

}));

const Container = styled(Stack)(({ theme }) => ({
    spacing: 2,
    display: 'flex',
    height: 500,
    position: 'relative',
    justifyContent: 'top',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
    p: 5,
    mt: 10,
    borderRadius: 10,
    boxShadow:50

}))

const Text = styled(Typography)(({ theme }) => ({
    color: 'white',
    zIndex: '3',
    height: 'auto',
    fontSize: '50px',
    fontWeight: 'bold',
    marginTop: '4%',
    display: 'flex',
}))
const SmallText = styled(Typography)(({ theme }) => ({

    color: 'darkgrey',
    zIndex: '3',
    height: 70,
    fontSize: '15px',
    fontWeight: 'bold',
}))

const CustomButton = styled(Button)(({ theme }) => ({
    variant: 'outlined',
    color: 'black',
    zIndex: '3',
    fontWeight: 'bold',
    border: '2px solid black',
    marginTop: '3%',
    bottom: 0,
}))



export default function FeatureImage(props) {
    return (
        <Container>
            <ImgFeatureLine src={props.urlImage}></ImgFeatureLine>
            {/* <Stack sx={{ position: 'absolute', alignItems: 'center' }}>
                <Text xs={12} >{props.BigText}</Text>
                <SmallText xs={12}>{props.SmallText}</SmallText>
            </Stack> */}
            <CustomButton endIcon={<ArrowRightIcon />} onClick={props.onNavigate}>See More</CustomButton>
        </Container>
    )
}