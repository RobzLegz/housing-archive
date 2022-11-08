import React from "react";

export interface RefComponentModuleProps
  extends React.ComponentPropsWithRef<"section"> {}

const RefComponentModule = React.forwardRef<
  HTMLDivElement,
  RefComponentModuleProps
>((props, ref) => {
  return (
    <section
      ref={ref}
      className={props.className ? props.className : ""}
      {...props}
    >
      {props.children}
    </section>
  );
});

export default RefComponentModule;
