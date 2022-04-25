import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { map } from "lodash";
import { RootDispatch, RootState } from "../../store/store";
import { updateContact, listGroups, readContact } from "./ContactEdit.thunk";
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
  }

  handleGroupsChange(name: string, options: SelectOption[]) {
    const selectedGroups = map(options, (option) => Number(option.value));
    this.props.replaceFormGroups(selectedGroups);
  }

  componentDidMount() {
    const { readContact, listGroups } = this.props;
    readContact();
    listGroups();
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
          text="Update contact"
          icon="ri-pencil-line"
          onClick={this.props.updateContact}
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
  updateContact: () => dispatch(updateContact()),
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(ContactEdit);
