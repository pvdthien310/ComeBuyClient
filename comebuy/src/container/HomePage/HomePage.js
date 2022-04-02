
import './HomePage.css'
import {
    BrandNavBar,
    Slider,
    NavBar,
    BrandLine,
    FeatureBar,
    FeatureImage,
    BrandLineImage,
    LaptopImageLine
} from '../../components'

const HomePage = () => {

    const brandList = [
        {
            title: 'Apple',
            url: 'https://images.unsplash.com/photo-1494698853255-d0fa521abc6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1228&q=80',
        },
        {
            title: 'Dell',
            url: 'https://images.unsplash.com/photo-1622286346003-c5c7e63b1088?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        },
        {
            title: 'HP',
            url: 'https://images.unsplash.com/photo-1579362243176-b746a02bc030?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1181&q=80',
        },
        {
            title: 'Lenovo',
            url: 'https://images.unsplash.com/photo-1601406984081-44d85ce92f90?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        },
        {
            title: 'Acer',
            url: 'https://images.unsplash.com/photo-1629751372750-3ddb8f8bfd0b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1130&q=80',
        }
    ]
    return (
        <div >
            <NavBar ></NavBar>
            <BrandNavBar brandLine={brandList} ></BrandNavBar>
            <Slider></Slider>
            <FeatureImage
                urlImage='https://images.unsplash.com/photo-1537498425277-c283d32ef9db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1178&q=80'
                BigText='Which one is right for you?'
                SmallText='ComeBuy Store. The best way to buy the products you love.'
            ></FeatureImage>
            <FeatureBar></FeatureBar>
            <BrandLineImage
                urlImage='https://images.unsplash.com/photo-1615750173609-2fbf12fd1d2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
                BigText='CHOOSE AND GET YOUR WORK EFFECTIVELY'
                SmallText='ComeBuy Store. The best way to buy the products you love.'
            ></BrandLineImage>
            <div>
                {
                    brandList.map((item, i) => {
                        const stringID = 'Line_' + item.title

                        return (
                            <BrandLine key={i} id={stringID} brandName={item.title} url={item.url} ></BrandLine>
                        );
                    })
                }
            </div>
            <LaptopImageLine></LaptopImageLine>
        </div>
    )

}
export default HomePage;