import { Link } from 'react-router-dom';
import CustomButton from '../components/general/CustomButton';

const Page403Screen = () => {
    return (
        <>
            <div className='bg-gradient-to-br from-black via-secondary_color to-primary_color h-screen flex justify-center items-center'>
                <div className='bg-gray-100 p-20 mx-4'>
                    <div className='text-center'>
                        <h1 className='mb-2 text-5xl font-bold'>403</h1>
                        <h3 className='uppercase mb-4 text-xl font-bold'>Opps! Access forbidden</h3>
                        <p>You do not have permission to access this page</p>
                    </div>
                    <div className='flex justify-center items-center mt-5'>
                        <Link to='/' className='uppercase'>
                            <CustomButton
                                type={"submit"}
                                variant={"solid"}
                            >
                                Return to home
                            </CustomButton>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page403Screen