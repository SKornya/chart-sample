import { FunctionComponent } from 'react';

import inputsTranslation from '../../utils/inputsTranslations';
import './Input.less';

interface InputProps {
  name: string;
}

const Input: FunctionComponent<InputProps> = ({ name }) => {
  return (
    <div className="settings__inputs">
      <label htmlFor={name}>{inputsTranslation[name]}</label>

      <input type="text" name={name} id={name} autoComplete="false" />
    </div>
  );
};

export default Input;
