import React, { PureComponent } from "react";

interface Props {
  text: string;
}

export default class MessagePreview extends PureComponent<Props> {
  get text() {
    const { text } = this.props;
    return (
      text && (
        <pre className="absolute top-20 bg-slate-100 inset-x-9 px-4 py-2.5 text-slate-900 text-[13px] rounded-lg max-h-64 overflow-auto whitespace-pre-wrap font-sans">
          {text}
        </pre>
      )
    );
  }

  render() {
    return (
      <div className="relative w-fit">
        <img className="w-72" src="/images/iphone.png" />
        {this.text}
      </div>
    );
  }
}
