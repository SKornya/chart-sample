import { FunctionComponent, useState, useRef, useEffect } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import exportingOption from 'highcharts/modules/exporting';
import offlineOption from 'highcharts/modules/offline-exporting';

import options from '../../utils/commonPlotOptions';
import Settings from '../Settings/Settings';

import './Chart.less';

const Chart: FunctionComponent = () => {
  const [data, setData] = useState<Array<number>>([]);
  const [categories, setCategories] = useState<Array<string>>([]);
  const [yAxis, setYAxis] = useState<Highcharts.YAxisOptions>({
    min: null,
    max: null,
    tickInterval: 1,
  });

  exportingOption(Highcharts);
  offlineOption(Highcharts);

  const desiredTickCount = 10;

  const extendedOptions: Highcharts.Options = {
    ...options,

    xAxis: {
      categories,
      tickInterval: Math.ceil(categories.length / desiredTickCount),
      gridLineWidth: 1,
      gridLineColor: '#595959',
      title: {
        text: 'Time',
      },
      labels: {
        style: {
          color: '#fff',
        },
      },
    },
    yAxis: {
      ...yAxis,
      title: {
        text: 'Watts',
      },
      gridLineColor: '#595959',
      labels: {
        style: {
          color: '#fff',
        },
      },
      grid: {

      },
    },
    series: [
      {
        type: 'spline',
        data,
        name: 'Power',
        marker: {
          enabled: false,
        },
      },
    ],
    tooltip: {
      headerFormat: '<b>{series.name}</b><br/>',
      pointFormat: '{point.x}: {point.y}',
    },
    exporting: {
      chartOptions: {
        chart: {
          width: 1000,
          height: 500,
        },
      },
      buttons: {
        contextButton: {
          menuItems: [
            'downloadPNG',
            'downloadJPEG',
            'downloadPDF',
            'downloadSVG',
          ],
        },
      },
    },
  };

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const addPoint = () => {
    const date = new Date();
    const hours = date.getHours();
    const mins = date.getMinutes();

    setData([...data, Math.round(Math.random() * 1000) / 100]);
    setCategories([
      ...categories,
      `${hours}:${mins >= 10 ? mins : `0${mins}`}`,
    ]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      addPoint();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="plot">
      <Settings setYAxis={setYAxis} />

      <div className="plot__container">
        <HighchartsReact
          highcharts={Highcharts}
          options={extendedOptions}
          ref={chartComponentRef}
        />
      </div>
    </div>
  );
};

export default Chart;
