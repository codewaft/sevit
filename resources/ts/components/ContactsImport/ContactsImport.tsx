import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { RootDispatch, RootState } from "../../store/store";
import { replaceContacts } from "./ContactsImport.slice";
import { importContacts } from "./ContactsImport.thunk";
import FileUpload from "../FileUpload";
import Button from "../Button";

interface Props extends StateProps, DispatchProps {}

class ContactsImport extends PureComponent<Props> {
  handleContactsChange = (name: string, contacts: File | null) => {
    this.props.replaceContacts(contacts);
  };

  render() {
    return (
      <div className="px-10 pb-10">
        <FileUpload
          name="contacts"
          label="Contacts"
          placeholder="Choose contacts.csv"
          accept=".csv"
          onChange={this.handleContactsChange}
        />
        <Button
          size="regular"
          text="Import contacts"
          icon="ri-upload-cloud-2-line"
          onClick={this.props.importContacts}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = (dispatch: RootDispatch) => ({
  replaceContacts: (contacts: File | null) => dispatch(replaceContacts(contacts)),
  importContacts: () => dispatch(importContacts()),
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(ContactsImport);
