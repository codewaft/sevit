import React, { PureComponent } from "react";
import { compact, find, map } from "lodash";
import { Group } from "../apis/group.api";
import { Template } from "../apis/template.api";
import Button from "./Button";
import DateTime from "./DateTime";
import Input from "./Input";
import MessagePreview from "./MessagePreview";
import MultiSelect from "./MultiSelect";
import Select, { Option as SelectOption } from "./Select";

interface Props {}

interface State {
  title: string;
  templateId: string;
  target: string;
  selectedGroups: Group[];
  schedule: string;
  templates: Template[];
  groups: Group[];
}

export default class BroadcastEdit extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      title: "",
      templateId: "",
      target: "",
      selectedGroups: [],
      schedule: "",
      templates: [],
      groups: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleMultiSelectChange = this.handleMultiSelectChange.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  handleInputChange(name: string, value: string) {
    if (name === "title") this.setState({ title: value });
    if (name === "schedule") this.setState({ schedule: value });
  }

  handleSelectChange(name: string, value: string) {
    if (name === "template") this.setState({ templateId: value });
    if (name === "target") {
      if (value === "all") this.setState({ selectedGroups: [] });
      this.setState({ target: value });
    }
  }

  handleMultiSelectChange(name: string, options: SelectOption[]) {
    const selectedGroups = compact(
      map(options, (option) => {
        const id = Number(option);
        return find(this.state.groups, ["id", id]);
      })
    );
    this.setState({ selectedGroups });
  }

  handleEditClick() {}

  get templateSelectOptions(): SelectOption[] {
    return map(this.state.templates, (template) => {
      return { name: template.title, value: String(template.id) };
    });
  }

  get targetSelectOptions(): SelectOption[] {
    return [
      { name: "All", value: "all" },
      { name: "Groups", value: "groups" },
    ];
  }

  get groupsSelectOptions(): SelectOption[] {
    return map(this.state.groups, (group) => {
      return { name: group.title, value: String(group.id) };
    });
  }

  get templateMessage() {
    const template = find(this.state.templates, ["id", Number(this.state.templateId)]);
    if (!template) return "";
    return template.content;
  }

  get groupsSelect() {
    const canShow = this.state.target === "groups";
    return (
      canShow && (
        <MultiSelect
          options={this.groupsSelectOptions}
          selectedOptions={[]}
          name="selectedGroups"
          label="Groups"
          placeholder="Select group"
          onChange={this.handleMultiSelectChange}
        />
      )
    );
  }

  readBroadcast() {}

  listTemplates() {}

  listGroups() {}

  componentDidMount() {
    this.readBroadcast();
    this.listTemplates();
    this.listGroups();
  }

  render() {
    return (
      <div className="grid grid-cols-2 gap-5 px-10">
        <div className="pb-10">
          <Input
            type="text"
            name="title"
            label="Title"
            value={this.state.title}
            placeholder="Enter message title"
            onChange={this.handleInputChange}
          />
          <Select
            options={this.templateSelectOptions}
            name="template"
            label="Template"
            value={this.state.templateId}
            placeholder="Select template"
            onChange={this.handleSelectChange}
          />
          <Select
            options={this.targetSelectOptions}
            name="target"
            label="Target"
            value={this.state.target}
            placeholder="Select target"
            onChange={this.handleSelectChange}
          />
          {this.groupsSelect}
          <DateTime
            name="schedule"
            label="Schedule"
            value={this.state.schedule}
            onChange={this.handleInputChange}
          />
          <Button
            size="regular"
            text="Edit broadcast"
            icon="ri-pencil-line"
            onClick={this.handleEditClick}
          />
        </div>
        <div className="flex items-end justify-center">
          <MessagePreview text={this.templateMessage} />
        </div>
      </div>
    );
  }
}
