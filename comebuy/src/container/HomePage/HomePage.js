
import './HomePage.css'
import { useNavigate } from 'react-router'
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { currentUser } from '../../redux/selectors';
import {BrandNavBar, Slider, NavBar} from '../../components'


function HomePage() {
    const NavigateLogin = () => {
        navigate('/login')
    }
    const _currentUser = useSelector(currentUser)
    const navigate = useNavigate()
    return (
        <div style={{ position: 'relative' }}>
            {/* <div style={{ position: 'absolute', top: '0', left: '0', zIndex: '10' }}>
                <p>
                    <p>{_currentUser.name}</p>

                    <Button onClick={NavigateLogin}>Login</Button>
                </p>
            </div> */}
            <NavBar ></NavBar>
            <BrandNavBar ></BrandNavBar>
            <Slider></Slider>

        </div>
    )

}
export default HomePage;