import react from 'react'
import './HomePage.css'
import { Link } from 'react-router-dom'

 function HomePage(){
 return (
     <div>
         <p>HomePage</p>
         <div>
             <p>
                 <Link to='/login'>Login</Link>
             </p>
         </div>
     </div>
 )
    
}
export default HomePage;