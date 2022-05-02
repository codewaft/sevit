import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { map } from "lodash";
import { RootDispatch, RootState } from "../../store/store";
import {
  groupOptions,
  messagePreviewText,
  scanShowGroupsSelect,
  selectedGroupOptions,
  templateOptions,
} from "./BroadcastEdit.select";
import {
  replaceFormGroups,
  replaceFormSchedule,
  replaceFormTarget,
  replaceFormTemplate,
  replaceFormTitle,
  resetFormGroups,
} from "./BroadcastEdit.slice";
import { updateBroadcast, listGroups, listTemplates, readBroadcast } from "./BroadcastEdit.thunk";
import Button from "../Button";
import DateTime from "../DateTime";
import Input from "../Input";
import MessagePreview from "../MessagePreview";
import MultiSelect from "../MultiSelect";
import Select, { Option as SelectOption } from "../Select";

interface Props extends StateProps, DispatchProps {}

class BroadcastEdit extends PureComponent<Props> {
  get targetSelectOptions(): SelectOption[] {
    return [
      { name: "All", value: "all" },
      { name: "Groups", value: "groups" },
    ];
  }

  get groupsSelect() {
    const { canShowGroupsSelect, groupOptions, selectedGroupOptions } = this.props;
    return (
      canShowGroupsSelect && (
        <MultiSelect
          options={groupOptions}
          selectedOptions={selectedGroupOptions}
          name="selectedGroups"
          label="Groups"
          placeholder="Select group"
          onChange={this.handleGroupsSelectChange}
        />
      )
    );
  }

  handleInputChange = (name: string, value: string) => {
    const { replaceFormTitle, replaceSchedule } = this.props;
    if (name === "title") replaceFormTitle(value);
    else if (name === "schedule") replaceSchedule(value);
  };

  handleSelectChange = (name: string, value: string) => {
    const { replaceFormTemplate, resetFormGroups, replaceFormTarget } = this.props;
    if (name === "template") {
      replaceFormTemplate(value);
    } else if (name === "target") {
      if (value === "all") resetFormGroups();
      replaceFormTarget(value);
    }
  };

  handleGroupsSelectChange = (name: string, options: SelectOption[]) => {
    const groups = map(options, (option) => Number(option.value));
    this.props.replaceFormGroups(groups);
  };

  componentDidMount() {
    const { readBroadcast, listTemplates, listGroups } = this.props;
    readBroadcast();
    listTemplates();
    listGroups();
  }

  render() {
    return (
      <div className="grid grid-cols-1 gap-5 px-5 md:px-10 md:grid-cols-2">
        <div className="md:pb-10">
          <Input
            type="text"
            name="title"
            label="Title"
            value={this.props.form.title}
            placeholder="Enter message title"
            onChange={this.handleInputChange}
          />
          <Select
            options={this.props.templateOptions}
            name="template"
            label="Template"
            value={this.props.form.template}
            placeholder="Select template"
            onChange={this.handleSelectChange}
          />
          <Select
            options={this.targetSelectOptions}
            name="target"
            label="Target"
            value={this.props.form.target}
            placeholder="Select target"
            onChange={this.handleSelectChange}
          />
          {this.groupsSelect}
          <DateTime
            name="schedule"
            label="Schedule"
            value={this.props.form.schedule}
            onChange={this.handleInputChange}
          />
          <Button
            size="regular"
            text="Update broadcast"
            icon="ri-pencil-line"
            onClick={this.props.updateBroadcast}
          />
        </div>
        <div className="flex items-end justify-center">
          <MessagePreview text={this.props.messagePreviewText} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  form: state.broadcastEdit.form,
  canShowGroupsSelect: scanShowGroupsSelect(state),
  groupOptions: groupOptions(state),
  selectedGroupOptions: selectedGroupOptions(state),
  templateOptions: templateOptions(state),
  messagePreviewText: messagePreviewText(state),
});

const mapDispatchToProps = (dispatch: RootDispatch) => ({
  readBroadcast: () => dispatch(readBroadcast()),
  replaceFormTitle: (title: string) => dispatch(replaceFormTitle(title)),
  replaceSchedule: (schedule: string) => dispatch(replaceFormSchedule(schedule)),
  replaceFormTemplate: (template: string) => dispatch(replaceFormTemplate(template)),
  resetFormGroups: () => dispatch(resetFormGroups()),
  replaceFormTarget: (target: string) => dispatch(replaceFormTarget(target)),
  replaceFormGroups: (groups: number[]) => dispatch(replaceFormGroups(groups)),
  listTemplates: () => dispatch(listTemplates()),
  listGroups: () => dispatch(listGroups()),
  updateBroadcast: () => dispatch(updateBroadcast()),
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(BroadcastEdit);
