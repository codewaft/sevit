import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { RootDispatch, RootState } from "../../store/store";
import { replaceContent, replaceTitle } from "./TemplateEdit.slice";
import { updateTemplate, readTemplate } from "./TemplateEdit.thunk";
import Button from "../Button";
import Input from "../Input";
import MessagePreview from "../MessagePreview";
import Textarea from "../Textarea";

interface Props extends StateProps, DispatchProps {}

class TemplateEdit extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  handleFieldChange(name: string, value: string) {
    const { replaceTitle, replaceContent } = this.props;
    if (name === "title") replaceTitle(value);
    if (name === "content") replaceContent(value);
  }

  componentDidMount() {
    this.props.readTemplate();
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
            text="Update template"
            icon="ri-pencil-line"
            onClick={this.props.updateTemplate}
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
  updateTemplate: () => dispatch(updateTemplate()),
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(TemplateEdit);
