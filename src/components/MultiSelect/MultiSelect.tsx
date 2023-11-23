import { useController } from 'react-hook-form';
import Select from 'react-select';
import 'react-quill/dist/quill.snow.css';
interface MultiSelectProps {
  control: any;
  errorMessage?: any;
  options?: any;
  [key: string]: any;
}
const MultiSelect = ({
  control,
  errorMessage,
  options,
  ...props
}: MultiSelectProps) => {
  const { field } = useController({
    name: props.name,
    control,

    defaultValue: '',
  });
  return (
    <div className="mb-2">
      <label
        htmlFor={props.id || props.name}
        className="block capitalize mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {props.label}
      </label>
      <Select isMulti options={options} {...field} {...props} />

      <div className="text-sm text-red-500">{errorMessage}</div>
    </div>
  );
};

export default MultiSelect;
