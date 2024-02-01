import React, { FC } from "react";
import { Tooltip } from "@nextui-org/react";

const ToolTip: FC<ToolTipProps> = ({ text, children }) => {
  return (
    <Tooltip
      showArrow={true}
      content={text}
      classNames={{
        base: ["before:bg-[#232426]"],
        content: ["py-2 px-4 shadow-xl", "text-white bg-[#232426]"],
      }}
    >
      <div>{children}</div>
    </Tooltip>
  );
};

export default ToolTip;
