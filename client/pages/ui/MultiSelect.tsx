import Select from 'react-select';
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

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: 'transparent',
    fontFamily: 'Rubik',
    padding: '4px',
    fontSize: '14px',
    border: state.isActive ? '1px solid #2f3240' : '1px solid #9e9ea7',
  }),
  container: (provided: any, state: any) => ({
    margin: '6px 0 6px',
    backgroundColor: 'transparent',
    borderRadius: '4px',
  }),
  multiValueRemove: (provided: any, state: any) => ({
    backgroundColor: '#151515',
    color: '#fafafa',
  }),
  menu: (provided: any, state: any) => ({
    padding: '16px',
    transform: '300ms',
    border: '1px solid #9e9ea7',
    zIndex: 10,
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    borderBottom: '1px dotted #e4e6eb',
    color: state.isSelected ? 'green' : '#151515',
    padding: 5,
  }),
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  },
};

const MultiSelect = ({ handleChange, options, placeholder }: Props) => (
  <Select
    isMulti
    styles={customStyles}
    placeholder={placeholder}
    name="colors"
    options={options}
    onChange={(e: any) => handleChange(e)}
    className={styles.multiSelect}
  />
);

export default MultiSelect;
