import React from "react";

interface HeaderProps { };

const Header = ({ children }: React.PropsWithChildren<HeaderProps>) => {
  return (
    <div className="flex justify-between items-baseline">
      <h1 className="text-2xl">
        {children}
      </h1>
    </div>
  );
};

export default Header;
