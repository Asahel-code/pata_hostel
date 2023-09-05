import PropTypes from 'prop-types';

const Wrapper = ({ children, ...rest}) => {
  return (
    <div className={`rounded-xl bg-white p-3 my-2 ${rest}`}>
        {children}
    </div>
  )
}

Wrapper.propTypes = {
  children: PropTypes.node
}

export default Wrapper