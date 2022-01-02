import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import styles from './MultiSelect.module.scss';
interface OptionType {
  value: string;
  label: string;
  icon: string | null;
}
interface Props {
  handleChange: any;
  placeholder: string;
  options: Array<OptionType> | [];
}

const animatedComponents = makeAnimated();

const MultiSelect = ({ handleChange, options, placeholder }: Props) => (
  <Select
    isMulti
    placeholder={placeholder}
    name="colors"
    components={animatedComponents}
    options={options}
    onChange={(e: any) => handleChange(e)}
    className={styles.multiSelect}
  />
);

export default MultiSelect;
