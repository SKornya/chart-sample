import { FunctionComponent, useState, useRef, useEffect } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import options from '../../utils/commonPlotOptions';
import Settings from '../Settings/Settings';

export interface AxisInterface {
  // min: number | null;
  // max: number | null;
  // minorTickInterval: number | null;
  [key: string]: number | null;
}

const Chart: FunctionComponent = () => {
  const [data, setData] = useState<Array<number>>([]);
  const [categories, setCategories] = useState<Array<string>>([]);
  const [yAxis, setYAxis] = useState<AxisInterface>({
    min: null,
    max: null,
    minorTickInterval: null,
  });

  const extendedOptions = {
    ...options,

    xAxis: {
      categories,
      minorTicks: true,
    },
    yAxis: {
      ...yAxis,
      minorTick: true,
    },
    series: [
      {
        type: 'spline',
        data,
        name: 'Plot',
        marker: {
          enabled: false,
        },
      },
    ],
    tooltip: {
      headerFormat: '<b>{series.name}</b><br/>',
      pointFormat: '{point.x}: {point.y}',
    },
  };

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const addPoint = () => {
    const date = new Date();
    const hours = date.getHours();
    const mins = date.getMinutes();

    setData([...data, Math.round(Math.random() * 1000) / 100]);
    setCategories([...categories, `${hours}:${mins}`]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      addPoint();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="plot">
      <Settings setYAxis={setYAxis} />

      <HighchartsReact
        highcharts={Highcharts}
        options={extendedOptions}
        ref={chartComponentRef}
        className="plot__picture"
      />

      <button onClick={addPoint} className="plot__button">
        Add point
      </button>
    </div>
  );
};

export default Chart;
