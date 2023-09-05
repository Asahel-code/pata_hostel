import PropTypes from 'prop-types';

const Breadcrumb = ({ title, icon, subtitle }) => {
    return (
        <div className="flex items-center gap-2">
            <div className="bg-primary_color_light p-2 text-2xl">
                {icon}
            </div>
            <div className="flex items-end">
                <p className="font-semibold text-xl">
                    {title}
                </p>
                &nbsp;
                {subtitle && (
                    <p className="text-lg capitalize">
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    )
}

Breadcrumb.propTypes = {
    title: PropTypes.string.isRequired, 
    icon: PropTypes.element.isRequired, 
    subtitle: PropTypes.string
}

export default Breadcrumb