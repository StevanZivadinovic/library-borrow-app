import { HexColorInput, HexColorPicker } from "react-colorful";

interface Props {
  value?: string;
  onPickerChange: (color: string) => void;
}

const ColorPicker = ({ value, onPickerChange }: Props) => {
  const onPickerChangeForm = (newColor: string) => {
      onPickerChange(newColor);
    }
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-2">
        <p>#</p>
        <HexColorInput
          color={value}
          onChange={onPickerChangeForm}
          className="hex-input"
        />
      </div>
      <HexColorPicker color={value} onChange={onPickerChangeForm} />
    </div>
  );
};

export default ColorPicker;