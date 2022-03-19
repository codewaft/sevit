import React, { ComponentType } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

export interface NavigateProps {
  navigate: NavigateFunction;
}

type OmitNavigatePropsFrom<Props> = Omit<Props, keyof NavigateProps>;

export function withNavigate<Props extends object>(Component: ComponentType<Props>) {
  function ComponentWithNavigate(props: Props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  }
  return ComponentWithNavigate as ComponentType<OmitNavigatePropsFrom<Props>>;
}
