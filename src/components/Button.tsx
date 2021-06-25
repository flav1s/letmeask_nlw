import React, { ButtonHTMLAttributes } from "react";

import cls from "classnames";

import "../styles/button.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  // eslint-disable-next-line react/require-default-props
  isOutlined?: boolean;
};

export function Button({
  isOutlined = false,
  ...props
}: ButtonProps): JSX.Element {
  return (
    <button
      type="button"
      className={cls("button", { outlined: isOutlined })}
      {...props}
    />
  );
}
