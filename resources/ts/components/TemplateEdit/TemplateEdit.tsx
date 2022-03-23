import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { RootDispatch, RootState } from "../../store/store";
import { replaceContent, replaceTitle } from "./TemplateEdit.slice";
import { editTemplate, readTemplate } from "./TemplateEdit.thunk";
import Button from "../Button";
import Input from "../Input";
import MessagePreview from "../MessagePreview";
import Textarea from "../Textarea";

interface Props extends StateProps, DispatchProps {}

class TemplateEdit extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  handleFieldChange(name: string, value: string) {
    if (name === "title") this.props.replaceTitle(value);
    if (name === "content") this.props.replaceContent(value);
  }

  handleEditClick() {
    this.props.editTemplate();
  }

  componentDidMount() {
    this.props.readTemplate();
  }

  render() {
    return (
      <div className="grid grid-cols-2 gap-5 px-10">
        <div className="pb-10">
          <Input
            type="text"
            name="title"
            label="Title"
            value={this.props.form.title}
            placeholder="Enter message title"
            onChange={this.handleFieldChange}
          />
          <Textarea
            name="content"
            label="Content"
            value={this.props.form.content}
            rows={4}
            placeholder="Enter content"
            onChange={this.handleFieldChange}
          />
          <Button
            size="regular"
            text="Edit template"
            icon="ri-pencil-line"
            onClick={this.handleEditClick}
          />
        </div>
        <div className="flex items-end justify-center">
          <MessagePreview text={this.props.form.content} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  form: state.templateEdit.form,
});

const mapDispatchToProps = (dispatch: RootDispatch) => ({
  replaceTitle: (title: string) => dispatch(replaceTitle(title)),
  replaceContent: (content: string) => dispatch(replaceContent(content)),
  readTemplate: () => dispatch(readTemplate()),
  editTemplate: () => dispatch(editTemplate()),
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(TemplateEdit);
