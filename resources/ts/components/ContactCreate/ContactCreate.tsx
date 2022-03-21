import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { map } from "lodash";
import { RootDispatch, RootState } from "../../store/store";
import { replaceFormGroups, replaceFormPhone } from "./ContactCreate.slice";
import { createContact, listGroups } from "./ContactCreate.thunk";
import { Option as SelectOption } from "../Select";
import Button from "../Button";
import Input from "../Input";
import MultiSelect from "../MultiSelect";

interface Props extends StateProps, DispatchProps {}

class ContactCreate extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleGroupsSelect = this.handleGroupsSelect.bind(this);
    this.handleCreateClick = this.handleCreateClick.bind(this);
  }

  get groupsSelectOptions(): SelectOption[] {
    return map(this.props.groups, (group) => {
      return { name: group.title, value: String(group.id) };
    });
  }

  handleFieldChange(name: string, value: string) {
    if (name === "phone") this.props.replaceFormPhone(value);
  }

  handleGroupsSelect(name: string, values: string[]) {
    const groups = map(values, (id: string) => Number(id));
    this.props.replaceFormGroups(groups);
  }

  handleCreateClick() {
    this.props.createContact();
  }

  componentDidMount() {
    this.props.listGroups();
  }

  render() {
    return (
      <div className="px-10 pb-10">
        <Input
          type="text"
          name="phone"
          label="Phone"
          value={this.props.form.phone}
          placeholder="Enter phone number"
          onChange={this.handleFieldChange}
        />
        <MultiSelect
          options={this.groupsSelectOptions}
          name="selectedGroups"
          label="Groups"
          placeholder="Select group"
          onChange={this.handleGroupsSelect}
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

const mapStateToProps = (state: RootState) => ({
  groups: state.contactCreate.groups,
  form: state.contactCreate.form,
});

const mapDispatchToProps = (dispatch: RootDispatch) => ({
  listGroups: () => dispatch(listGroups()),
  replaceFormPhone: (phone: string) => dispatch(replaceFormPhone(phone)),
  replaceFormGroups: (groups: number[]) => dispatch(replaceFormGroups(groups)),
  createContact: () => dispatch(createContact()),
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(ContactCreate);
