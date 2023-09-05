import PropTypes from "prop-types";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChart({ options, data }) {
    return <Pie options={options} data={data} />;
}

PieChart.propTypes = {
    options: PropTypes.any,
    data: PropTypes.any
}