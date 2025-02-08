import React from "react";

const SidebarContext = React.createContext({
  showSidebar: false,
  onClickShowButtonHandler: () => {},
});

export const useSidebar = () => React.useContext(SidebarContext);

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showSidebar, setShowSidebar] = React.useState<boolean>(false);

  const onClickShowButtonHandler = () => {
    setTimeout(() => {}, 1000);
    setShowSidebar(!showSidebar);
  };

  return (
    <SidebarContext.Provider
      value={{
        showSidebar,
        onClickShowButtonHandler,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
