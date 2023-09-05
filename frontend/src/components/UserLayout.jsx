import PropTypes from 'prop-types'
import Footer from './Footer'
import Header from './Header'

const UserLayout = ({ children }) => {
    return (
        <>
            <Header />
            <div>
                {children}
            </div>
            <Footer />
        </>
    )
}

UserLayout.propTypes = {
    children: PropTypes.element.isRequired
}


export default UserLayout