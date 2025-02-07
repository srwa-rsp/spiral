"use client";
import React from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import Spinner from "@/components/Spinner/Spinner";

const classes: any = {
  base: "focus:outline-none transition ease-in-out duration-300 py-2 px-1 text-[1rem] font-bold flex justify-center items-center relative  cursor-pointer",
  disabled: "!opacity-50 !cursor-not-allowed",
  colors: {
    primary: "bg-secondary hover:bg-blue-dark focus:ring-blue-light text-white",
    secondary:
      "bg-white hover:bg-gray-dark focus:ring-secondary text-enable border border-1 border-secondary ",
    danger: "bg-red-middle hover:bg-red-dark focus:ring-red-light",
    success: "bg-green-middle hover:bg-green-dark focus:ring-green-light",
  },
};

const Button = React.forwardRef(
  (
    {
      children,
      type,
      className,
      color,
      disabled,
      loading,
      href,
      onClick,
      ...rest
    }: any,
    ref
  ) => {
    const router = useRouter();
    return (
      <button
        disabled={disabled}
        type={type}
        className={clsx(
          classes.base,
          classes.colors[color],
          disabled && classes.disabled,
          className
        )}
        {...rest}
        onClick={() => (onClick ? onClick() : href ? router.push(href) : {})}
      >
        {!loading ? (
          children
        ) : (
          <>
            {children} <Spinner />
          </>
        )}
      </button>
    );
  }
);
Button.displayName = "Button";
export default Button;
