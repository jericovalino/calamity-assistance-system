import './ToggleSwitch.css';

type Props = {
  name: string;
  isOn?: boolean;
  onToggle?: (isOn: boolean) => void;
  testId?: string;
  label?: string | ((isOn: boolean) => string);
};

const ToggleSwitch = ({
  name,
  isOn = false,
  onToggle,
  testId,
  label,
}: Props) => {
  return (
    <div className="flex items-center">
      {label && (
        <p className="mr-3 text-sm leading-4 text-gray-600">
          {typeof label === 'function' ? label(isOn) : label}
        </p>
      )}
      <div className="toggle-switch">
        <input
          id={'id-' + name}
          data-test-id={testId}
          type="checkbox"
          checked={isOn}
          onChange={(e) => onToggle?.(e.target.checked)}
        />
        <label htmlFor={'id-' + name} />
      </div>
    </div>
  );
};

export default ToggleSwitch;
