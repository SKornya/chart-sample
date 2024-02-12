import React, { FormEvent, FunctionComponent, useRef } from 'react';
import { AxisInterface } from '../Chart/Chart';

interface SettingsProps {
  setYAxis: React.Dispatch<React.SetStateAction<AxisInterface>>;
}

const Settings: FunctionComponent<SettingsProps> = ({ setYAxis }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const setSettings = (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(formRef.current!);

    const formDataObject: { [key: string]: number | null } = {};
    formData.forEach((value, key) => {
      const data = value as string;
      formDataObject[key] = Number(data) || null;
    });

    console.log(formDataObject);

    setYAxis(formDataObject);
  };

  return (
    <div className="plot__settings">
      <form ref={formRef} onSubmit={setSettings}>
        <input type="text" name="min" />
        <input type="text" name="max" />
        <input type="text" name="minorTickInterval" />
        <button>Save settings</button>
      </form>
    </div>
  );
};

export default Settings;
