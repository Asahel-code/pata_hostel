import PropTypes from "prop-types";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';

  ChartJS.register(CategoryScale, LinearScale, PointElement,  BarElement, Tooltip, Legend);

export function BarChart({ options, data }) {
    return <Bar options={options} data={data} />;
}

BarChart.propTypes = {
  options: PropTypes.any,
  data: PropTypes.any
}