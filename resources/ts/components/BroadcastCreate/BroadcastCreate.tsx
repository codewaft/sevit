import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { map } from "lodash";
import { RootDispatch, RootState } from "../../store/store";
import {
  replaceFormGroups,
  replaceFormSchedule,
  replaceFormTarget,
  replaceFormTemplate,
  replaceFormTitle,
  resetFormGroups,
} from "./BroadcastCreate.slice";
import { createBroadcast, listGroups, listTemplates } from "./BroadcastCreate.thunk";
import {
  groupOptions,
  messagePreviewText,
  scanShowGroupsSelect,
  selectedGroupOptions,
  templateOptions,
} from "./BroadcastCreate.select";
import Select, { Option as SelectOption } from "../Select";
import Button from "../Button";
import DateTime from "../DateTime";
import Input from "../Input";
import MessagePreview from "../MessagePreview";
import MultiSelect from "../MultiSelect";

interface Props extends StateProps, DispatchProps {}

class BroadcastCreate extends PureComponent<Props> {
  get targetSelectOptions(): SelectOption[] {
    return [
      { name: "All", value: "all" },
      { name: "Groups", value: "groups" },
    ];
  }

  get groupsSelect() {
    return (
      this.props.canShowGroupsSelect && (
        <MultiSelect
          options={this.props.groupOptions}
          selectedOptions={this.props.selectedGroupOptions}
          name="selectedGroups"
          label="Groups"
          placeholder="Select group"
          onChange={this.handleGroupsSelectChange}
        />
      )
    );
  }

  handleInputChange = (name: string, value: string) => {
    if (name === "title") this.props.replaceFormTitle(value);
    if (name === "schedule") this.props.replaceSchedule(value);
  };

  handleSelectChange = (name: string, value: string) => {
    if (name === "template") {
      this.props.replaceFormTemplate(value);
    }
    if (name === "target") {
      if (value === "all") this.props.resetFormGroups();
      this.props.replaceFormTarget(value);
    }
  };

  handleGroupsSelectChange = (name: string, options: SelectOption[]) => {
    const groups = map(options, (option) => Number(option.value));
    this.props.replaceFormGroups(groups);
  };

  componentDidMount() {
    this.props.listTemplates();
    this.props.listGroups();
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
            text="Create broadcast"
            icon="ri-add-circle-line"
            onClick={this.props.createBroadcast}
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
  form: state.broadcastCreate.form,
  canShowGroupsSelect: scanShowGroupsSelect(state),
  groupOptions: groupOptions(state),
  selectedGroupOptions: selectedGroupOptions(state),
  templateOptions: templateOptions(state),
  messagePreviewText: messagePreviewText(state),
});

const mapDispatchToProps = (dispatch: RootDispatch) => ({
  replaceFormTitle: (title: string) => dispatch(replaceFormTitle(title)),
  replaceSchedule: (schedule: string) => dispatch(replaceFormSchedule(schedule)),
  replaceFormTemplate: (template: string) => dispatch(replaceFormTemplate(template)),
  resetFormGroups: () => dispatch(resetFormGroups()),
  replaceFormTarget: (target: string) => dispatch(replaceFormTarget(target)),
  replaceFormGroups: (groups: number[]) => dispatch(replaceFormGroups(groups)),
  listTemplates: () => dispatch(listTemplates()),
  listGroups: () => dispatch(listGroups()),
  createBroadcast: () => dispatch(createBroadcast()),
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(BroadcastCreate);
