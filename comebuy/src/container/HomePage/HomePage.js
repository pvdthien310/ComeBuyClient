
import './HomePage.css'
import { BrandNavBar, Slider, NavBar, BrandLine } from '../../components'


function HomePage() {
    const brandList = [
        {
            title: 'Apple',
            url: 'https://images.unsplash.com/photo-1598972428564-8dbf76afc2ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
        },
        {
            title: 'Dell',
            url: 'https://cf.shopee.vn/file/b02801b98dbe4ba4a99e7ab48dc38e83_tn',
        },
        {
            title: 'HP',
            url: 'https://www.macitynet.it/wp-content/uploads/2016/04/HPlogo.jpg',
        },
        {
            title: 'Lenovo',
            url: 'https://images.unsplash.com/photo-1601406984081-44d85ce92f90?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        },
        {
            title: 'Acer',
            url: 'https://wallpaperaccess.com/full/6464636.jpg',
        }
    ]
    return (
        <div style={{ position: 'relative' }}>
            <a href='#Line_Apple'> aaaaa</a>
            <NavBar ></NavBar>
            <BrandNavBar brandLine={brandList} ></BrandNavBar>

            <Slider></Slider>
                {
                    brandList.map((item) => {
                        const stringID = 'Line_' + item.title
                        return (
                            <BrandLine id={stringID} brandName={item.title} url ={item.url} ></BrandLine>
                        );
                    })
                }
            


        </div>
    )

}
export default HomePage;