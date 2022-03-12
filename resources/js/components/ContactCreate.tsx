import React, { PureComponent } from "react";
import { compact, find, map } from "lodash";
import Button from "./Button";
import Input from "./Input";
import MultiSelect from "./MultiSelect";
import { Option as SelectOption } from "./Select";
import { Group } from "./BroadcastCreate";

interface Props {}

interface State {
  phone: string;
  selectedGroups: Group[];
  groups: Group[];
}

export default class ContactCreate extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      phone: "",
      selectedGroups: [],
      groups: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleMultiSelectChange = this.handleMultiSelectChange.bind(this);
    this.handleCreateClick = this.handleCreateClick.bind(this);
  }

  handleInputChange(name: string, value: string) {
    if (name === "phone") this.setState({ phone: value });
  }

  handleMultiSelectChange(options: SelectOption[]) {
    const selectedGroups = compact(
      map(options, (option) => {
        const id = Number(option.value);
        return find(this.state.groups, ["id", id]);
      })
    );
    this.setState({ selectedGroups });
  }

  handleCreateClick() {}

  get groupsSelectOptions(): SelectOption[] {
    return map(this.state.groups, (group) => {
      return { name: group.title, value: String(group.id) };
    });
  }

  listGroups() {
    this.setState({
      groups: [
        { id: 1, title: "VIP" },
        { id: 2, title: "Student" },
        { id: 3, title: "Employee" },
      ],
    });
  }

  componentDidMount() {
    this.listGroups();
  }

  render() {
    return (
      <div className="px-10 pb-10">
        <Input
          type="text"
          name="phone"
          label="Phone"
          value={this.state.phone}
          placeholder="Enter phone number"
          onChange={this.handleInputChange}
        />
        <MultiSelect
          options={this.groupsSelectOptions}
          name="selectedGroups"
          label="Groups"
          placeholder="Select group"
          onChange={this.handleMultiSelectChange}
        />
        <Button
          size="regular"
          text="Create contact"
          icon="ri-add-circle-line"
          onClick={this.handleCreateClick}
        />
      </div>
    );
  }
}
