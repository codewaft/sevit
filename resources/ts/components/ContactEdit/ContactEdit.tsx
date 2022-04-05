import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { map } from "lodash";
import { RootDispatch, RootState } from "../../store/store";
import { editContact, listGroups, readContact } from "./ContactEdit.thunk";
import { groupOptions, selectedGroupOptions } from "./ContactEdit.select";
import { replaceFormGroups } from "./ContactEdit.slice";
import Button from "../Button";
import MultiSelect from "../MultiSelect";
import { Option as SelectOption } from "../Select";

interface Props extends StateProps, DispatchProps {}

class ContactEdit extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.handleGroupsChange = this.handleGroupsChange.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  handleGroupsChange(name: string, options: SelectOption[]) {
    const selectedGroups = map(options, (option) => Number(option.value));
    this.props.replaceFormGroups(selectedGroups);
  }

  handleEditClick() {
    this.props.editContact();
  }

  componentDidMount() {
    this.props.readContact();
    this.props.listGroups();
  }

  render() {
    return (
      <div className="px-5 md:px-10 pb-10">
        <MultiSelect
          options={this.props.groupOptions}
          selectedOptions={this.props.selectedGroupOptions}
          name="selectedGroups"
          label="Groups"
          placeholder="Select group"
          onChange={this.handleGroupsChange}
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

const mapStateToProps = (state: RootState) => ({
  groups: state.contactEdit.groups,
  groupOptions: groupOptions(state),
  selectedGroupOptions: selectedGroupOptions(state),
  form: state.contactEdit.form,
});

const mapDispatchToProps = (dispatch: RootDispatch) => ({
  readContact: () => dispatch(readContact()),
  listGroups: () => dispatch(listGroups()),
  replaceFormGroups: (groups: number[]) => dispatch(replaceFormGroups(groups)),
  editContact: () => dispatch(editContact()),
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(ContactEdit);
