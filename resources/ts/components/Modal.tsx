import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { RootDispatch, RootState } from "../store/store";
import { resetActive as resetModalActive } from "./Modals/Modals.slice";
import Card from "./Card";
import Heading from "./Heading";
import Icon from "./Icon";

type Size = "half" | "full";
type SizeClasses = Record<Size, string>;

interface Props extends StateProps, DispatchProps {
  size: Size;
  heading?: string;
  children: JSX.Element;
}

class Modal extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }

  sizeClasses: SizeClasses = {
    half: "lg:w-4/12 md:w-5/12 sm:w-6/12 w-11/12",
    full: "xl:w-7/12 lg:w-8/12 w-11/12",
  };

  get className() {
    const sizeClass = this.sizeClasses[this.props.size];
    return `max-h-[calc(100%-2rem)] overflow-y-auto ${sizeClass}`;
  }

  get heading() {
    const { heading } = this.props;
    return (
      heading && (
        <div className="px-5 md:px-10 mb-5">
          <Heading size="regular" text={heading} />
        </div>
      )
    );
  }

  handleCloseClick() {
    this.props.resetModalActive();
  }

  render() {
    return (
      <div className="fixed h-screen w-screen z-10 bg-slate-600/[.15] top-0">
        <div className="container mx-auto flex justify-center items-center h-full">
          <Card color="gray" className={this.className}>
            <div className="flex justify-end px-3 pt-2 -mb-2">
              <Icon size="regular" name="ri-close-line" onClick={this.handleCloseClick} />
            </div>
            {this.heading}
            {this.props.children}
          </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = (dispatch: RootDispatch) => ({
  resetModalActive: () => dispatch(resetModalActive()),
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
