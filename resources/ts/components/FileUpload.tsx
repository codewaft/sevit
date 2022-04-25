import React, { ChangeEvent, createRef, PureComponent, RefObject } from "react";
import FormLabel from "./FormLabel";
import Icon from "./Icon";

interface Props {
  name: string;
  label: string;
  placeholder: string;
  accept: string;
  onChange: (name: string, file: File | null) => void;
}

interface State {
  filename: string | null;
}

export default class FileUpload extends PureComponent<Props, State> {
  inputRef: RefObject<HTMLInputElement> = createRef();

  constructor(props: Props) {
    super(props);
    this.state = {
      filename: null,
    };
  }

  get filenameClass() {
    const colorClass = this.filename === this.props.placeholder ? "text-slate-400" : "";
    return colorClass;
  }

  get filename() {
    return this.state.filename || this.props.placeholder;
  }

  handleFakeInputClick = () => {
    const input = this.inputRef.current;
    if (input) input.click();
  };

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, name } = this.props;
    const { files } = event.target;
    const file = files && files[0];
    onChange(name, file);
    const filename = file ? file.name : null;
    this.setState({ filename });
  };

  render() {
    return (
      <div className="block w-full">
        <FormLabel text={this.props.label} />
        <div
          className="w-full bg-white px-5 py-[10px] text-md rounded-md drop-shadow-md outline-none text-slate-900 mb-4 cursor-pointer"
          onClick={this.handleFakeInputClick}
        >
          <div className="flex justify-between items-center">
            <span className={this.filenameClass}>{this.filename}</span>
            <Icon className="text-slate-400" size="medium" name="ri-file-line" />
          </div>
          <input
            className="hidden"
            type="file"
            onChange={this.handleChange}
            ref={this.inputRef}
            accept={this.props.accept}
          />
        </div>
      </div>
    );
  }
}
