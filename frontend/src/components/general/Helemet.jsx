import React from 'react'
import PropTypes from 'prop-types'

const Helmet = ({ title, children }) => {

    document.title = `${title} | Pata Hostel`

    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div>
            {children}
        </div>
    )
}

Helmet.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
}

export default Helmet