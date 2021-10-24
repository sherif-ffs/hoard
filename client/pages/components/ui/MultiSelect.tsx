import Select from 'react-select';

interface OptionType {
  value: string;
  label: string;
  icon: string | null;
}
interface Props {
  handleMultiSelectChange: any;
  options: Array<OptionType> | [];
}
const MultiSelect = ({ handleMultiSelectChange, options }: Props) => (
  <Select
    isMulti
    name="colors"
    options={options}
    onChange={(e: any) => handleMultiSelectChange(e)}
    className="basic-multi-select"
    classNamePrefix="select"
  />
);

export default MultiSelect;
