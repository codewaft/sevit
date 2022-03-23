import React, { PureComponent } from "react";
import FileUpload from "./FileUpload";
import Button from "./Button";

export default class ContactsImport extends PureComponent {
  handleFileChange = () => {};

  handleImportClick = () => {};

  render() {
    return (
      <div className="px-10 pb-10">
        <FileUpload
          name="contacts"
          label="Contacts"
          placeholder="Choose contacts.csv"
          accept=".csv"
          onChange={this.handleFileChange}
        />
        <Button
          size="regular"
          text="Import contacts"
          icon="ri-upload-cloud-2-line"
          onClick={this.handleImportClick}
        />
      </div>
    );
  }
}
