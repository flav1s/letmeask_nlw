import React, { ButtonHTMLAttributes } from "react";

import "../styles/button.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps): JSX.Element {
  // eslint-disable-next-line react/button-has-type
  return <button className="button" {...props} />;
}
