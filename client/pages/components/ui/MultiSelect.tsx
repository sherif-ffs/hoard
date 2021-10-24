import Select from 'react-select';

interface OptionType {
  value: string;
  label: string;
  icon: string | null;
}
interface Props {
  handleChange: any;
  options: Array<OptionType> | [];
}
const MultiSelect = ({ handleChange, options }: Props) => (
  <Select
    isMulti
    name="colors"
    options={options}
    onChange={(e: any) => handleChange(e)}
    className="basic-multi-select"
    classNamePrefix="select"
  />
);

export default MultiSelect;
