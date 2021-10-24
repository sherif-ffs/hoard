import Select from 'react-select';
import { TagOptions } from '../../constants/Tags';

interface Props {
  handleMultiSelectChange: any;
}
const MultiSelect = ({ handleMultiSelectChange }: Props) => {
  return (
    <Select
      isMulti
      name="colors"
      options={TagOptions}
      onChange={(e: any) => handleMultiSelectChange(e)}
      className="basic-multi-select"
      classNamePrefix="select"
    />
  );
};

export default MultiSelect;
