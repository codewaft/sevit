import React, { PureComponent } from "react";
import { compact, find, map } from "lodash";
import Button from "./Button";
import MultiSelect from "./MultiSelect";
import { Option as SelectOption } from "./Select";
import { Group } from "./BroadcastCreate";

interface Props {}

interface State {
  selectedGroups: Group[];
  groups: Group[];
}

export default class ContactEdit extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedGroups: [],
      groups: [],
    };
    this.handleMultiSelectChange = this.handleMultiSelectChange.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
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

  handleEditClick() {}

  get groupsSelectOptions(): SelectOption[] {
    return map(this.state.groups, (group) => {
      return { name: group.title, value: String(group.id) };
    });
  }

  readContact() {}

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
    this.readContact();
    this.listGroups();
  }

  render() {
    return (
      <div className="px-10 pb-10">
        <MultiSelect
          options={this.groupsSelectOptions}
          name="selectedGroups"
          label="Groups"
          placeholder="Select group"
          onChange={this.handleMultiSelectChange}
        />
        <Button
          size="regular"
          text="Edit contact"
          icon="ri-pencil-line"
          onClick={this.handleEditClick}
        />
      </div>
    );
  }
}
