import React, { FormEvent, FunctionComponent, useRef } from 'react';
// import { AxisInterface } from '../Chart/Chart';
import Input from '../Input/Input';

import './Settings.less';

interface SettingsProps {
  setYAxis: React.Dispatch<React.SetStateAction<Highcharts.YAxisOptions>>;
}

const Settings: FunctionComponent<SettingsProps> = ({ setYAxis }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const setSettings = (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(formRef.current!);

    const formDataObject: { [key: string]: number | null } = {};
    formData.forEach((value, key) => {
      const data = value as string;
      const numberedData = Number(data);
      formDataObject[key] = isNaN(numberedData) ? null : numberedData;
    });

    console.log(formDataObject);

    setYAxis(formDataObject as Highcharts.YAxisOptions);
  };

  return (
    <div className="settings">
      <form ref={formRef} onSubmit={setSettings}>
        <Input name="min" />
        <Input name="max" />
        <Input name="tickInterval" />

        <button className='settings__button'>Save settings</button>
      </form>
    </div>
  );
};

export default Settings;
