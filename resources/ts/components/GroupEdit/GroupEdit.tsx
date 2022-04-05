import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { RootDispatch, RootState } from "../../store/store";
import { replaceTitle } from "./GroupEdit.slice";
import { editGroup, readGroup } from "./GroupEdit.thunk";
import Button from "../Button";
import Input from "../Input";

interface Props extends StateProps, DispatchProps {}

class GroupEdit extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  handleFieldChange(name: string, value: string) {
    if (name === "title") this.props.replaceTitle(value);
  }

  handleEditClick() {
    this.props.editGroup();
  }

  componentDidMount() {
    this.props.readGroup();
  }

  render() {
    return (
      <div className="px-5 md:px-10 pb-10">
        <Input
          type="text"
          name="title"
          label="Title"
          value={this.props.form.title}
          placeholder="Enter group title"
          onChange={this.handleFieldChange}
        />
        <Button
          size="regular"
          text="Update group"
          icon="ri-pencil-line"
          onClick={this.handleEditClick}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  form: state.groupEdit.form,
});

const mapDispatchToProps = (dispatch: RootDispatch) => ({
  replaceTitle: (title: string) => dispatch(replaceTitle(title)),
  readGroup: () => dispatch(readGroup()),
  editGroup: () => dispatch(editGroup()),
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(GroupEdit);
