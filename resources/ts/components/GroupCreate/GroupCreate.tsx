import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { RootDispatch, RootState } from "../../store/store";
import { replaceTitle } from "./GroupCreate.slice";
import { createGroup } from "./GroupCreate.thunk";
import Button from "../Button";
import Input from "../Input";

interface Props extends StateProps, DispatchProps {}

class GroupCreate extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleCreateClick = this.handleCreateClick.bind(this);
  }

  handleFieldChange(name: string, value: string) {
    if (name === "title") this.props.replaceTitle(value);
  }

  handleCreateClick() {
    this.props.createGroup();
  }

  render() {
    return (
      <div className="px-10 pb-10">
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
          text="Create group"
          icon="ri-add-circle-line"
          onClick={this.handleCreateClick}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  form: state.groupCreate.form,
});

const mapDispatchToProps = (dispatch: RootDispatch) => ({
  replaceTitle: (title: string) => dispatch(replaceTitle(title)),
  createGroup: () => dispatch(createGroup()),
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(GroupCreate);
