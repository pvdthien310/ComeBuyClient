
import { BrandNavBar, Slider, NavBar, BrandLine, FeatureBar } from '../../components'
import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';




const ImgFeatureLine = styled('img')(({ theme }) => ({
    width: '100%',
    height: 700,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute',
    

    [theme.breakpoints.down('sm')]: {
        display: 'none',
    },

}));

const Container = styled(Grid)(({ theme }) => ({
    display: 'flex',
    height: 700,
    position: 'relative',
    justifyContent: 'top',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor:'white'
}))

const Text = styled(Typography)(({ theme }) => ({
    color: 'white',
    zIndex: '3',
    height: 'auto',
    fontSize: '60px',
    fontWeight: 'bold',
    marginTop: '4%',
    display: 'flex',
}))
const SmallText = styled(Typography)(({ theme }) => ({
    
    color: 'darkgrey',
    zIndex: '3',
    height: 100,
    fontSize: '20px',
    fontWeight: 'bold',
    
}))

const CustomButton = styled(Button)(({ theme }) => ({
    variant: 'outlined',
    color: 'darkgrey',
    zIndex: '3',
    fontWeight: 'bold',
    border: '2px solid white',
    marginTop: '18%',
    bottom: 0
}))



export default function FeatureImage(props) {
    return (
        <Container>
            <ImgFeatureLine src={props.urlImage}></ImgFeatureLine>
            <Text item xs={12} >{props.BigText}</Text>
            <SmallText item xs={12}>{props.SmallText}</SmallText>
            <CustomButton endIcon={<ArrowRightIcon />}>See More</CustomButton>
        </Container>
    )
}