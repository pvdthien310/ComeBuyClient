import react from 'react'
import './HomePage.css'
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router'
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { currentUser } from '../../redux/selectors';


 function HomePage(){
    const NavigateLogin = () => {
        navigate('/login')
    }
    const _currentUser = useSelector(currentUser)
     const navigate = useNavigate()
 return (
     <div>
         <p>HomePage</p>
         <div>
             <p>
                 <p>{_currentUser.name}</p>
                 
                 <Button onClick={NavigateLogin}>click me</Button>
             </p>
         </div>
     </div>
 )
    
}
export default HomePage;