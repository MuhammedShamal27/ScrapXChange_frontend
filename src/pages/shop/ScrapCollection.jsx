import React, { useEffect, useState } from 'react'
import ShopNavBar from '../../componets/shop/ShopNavBar'
import HeadingAndProfile from '../../componets/HeadingAndProfile'
import FooterOfAdminAndShop from '../../componets/FooterOfAdminAndShop'
import { Pencil } from 'lucide-react'
import todaypending from '../../assets/todaypending.png'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchScrapList, scrapCollected } from '../../services/api/shop/shopApi'
import { toast } from 'sonner'

const ScrapCollection = () => {
    const { id } = useParams();
    const [product, setProduct] = useState('');
    const [quantity, setQuantity] = useState('');
    const [productsList, setProductsList] = useState([]);
    const [error,setError] = useState();
    const [formData,setFormData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async ()  => {
            try {
                const response = await fetchScrapList();
                setProductsList(response);
            }catch (err){
                console.error('the error',err)
                setError(err)
                toast(error.message || "An error occurred while fetching products");
            }
        }
        fetchProducts();
    },[]);

    const handleAddProduct = (e) => {
        e.preventDefault()
        if (product && quantity) {
            const selectedProduct = productsList.find(p => p.id === parseInt(product));
            setFormData([...formData, { id: selectedProduct.id,name: selectedProduct.name, quantity }]);
            setProduct('');
            setQuantity('');
        }
    };    
        
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            console.log('formData', formData,id);
            const Data={id,formData}
            const response = await scrapCollected(id,Data);
            console.log('the response', response);
            const t_id = response.id;  
            navigate(`/shop/confirm/${t_id}/`)
        } catch (err) {
            console.error('Error while submitting data', err);
            toast.error('Submission failed');
        }
    };

  return (
    <>
    <div className='flex bg-bgColor '>
        <ShopNavBar />
        <div className=' w-8/12'>
            <HeadingAndProfile />
            <div className='text-xs bg-white p-10 rounded-lg shadow-lg justify-center m-10 '>
                <h1 className='font-semibold text-xl'>Scrap Collection:{id}</h1>
                <div className='flex justify-between mt-7'>
                    <div className='flex flex-col gap-7 w-2/6'>
                        <div className='flex flex-col gap-3'>
                            <label htmlFor="">Name</label>
                            <select className='rounded-lg text-xs border-gray-300 p-2' value={product} onChange={(e) => setProduct(e.target.value)}> 
                                <option value="">Select a product</option>
                                {productsList.map((product) => (<option key={product.id} value={product.id}>{product.name}</option>))}
                            </select>
                            {/* <input className='rounded-lg text-xs border-gray-300 p-2' type="text" placeholder='Product name' /> */}
                        </div>
                        <div className='flex flex-col gap-3'>
                            <label htmlFor="">Quantity</label>
                            <input className='rounded-lg text-xs border-gray-300 p-2' type="text" 
                            value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder='Quantity' />
                        </div>
                        <div className='flex justify-between mt-4'>
                            <button onClick={handleAddProduct} className='bg-black text-white py-2 px-4 rounded-3xl text-xs'>Add More</button>
                            <button onClick={handleSubmit} className='bg-myBlue text-white py-2 px-4 rounded-3xl text-xs'>Submit</button>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 w-3/6 '>
                    {formData.map((item, index) => (
                        <div key={index} className='flex rounded-2xl shadow-lg h-24 items-center justify-between p-3'>
                            <div className='flex items-center space-x-3'>
                                <img className='w-16 h-16 rounded-xl ' src={todaypending} alt="Product" />
                                <p className='font-medium'>{item.name}</p>
                            </div>
                            <p className='font-medium'>{item.quantity} Kg</p>
                            <Pencil color="#a3aed0" />
                        </div>
                    ))}
                    </div>
                
                </div>
            </div>
        </div>
    </div>
    <FooterOfAdminAndShop />
</>

  )
}

export default ScrapCollection;