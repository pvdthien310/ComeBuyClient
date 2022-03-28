import react from 'react'
import './HomePage.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { currentUser } from '../../redux/selectors';
import Slider from '../../components/Slider/slider';


function HomePage() {
    const NavigateLogin = () => {
        navigate('/login')
    }
    const _currentUser = useSelector(currentUser)
    const navigate = useNavigate()
    return (
        <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '0', left: '0', zIndex: '10' }}>
                <p>
                    <p>{_currentUser.name}</p>

                    <Button onClick={NavigateLogin}>click me</Button>
                </p>
            </div>
            <Slider style={{ position: 'relative' }}></Slider>

        </div>
    )

}
export default HomePage;