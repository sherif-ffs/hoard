import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export function AppContextProvider({ children }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemPanelIsOpen, setItemPanelIsOpen] = useState(false);

  const [itemToCollect, setItemToCollect] = useState(null);
  const [collectionsPanelIsOpen, setCollectionsPanelIsOpen] = useState(false);

  const [createCollectionModalIsOpen, setCollectionModalIsOpen] = useState(false);
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);

  const openCreateCollectionModal = () => setCollectionModalIsOpen(true);
  const closeCreateCollectionModal = () => setCollectionModalIsOpen(false);

  const handleSetSelectedItem = (item) => {
    setItemPanelIsOpen(true);
    setSelectedItem(item);
  };

  const handleSetItemToCollect = (item) => {
    if (!collectionsPanelIsOpen) {
      setCollectionsPanelIsOpen(true);
    }

    setItemToCollect(item);
  };

  const handleCloseItemPanel = () => setItemPanelIsOpen(false);

  const closeCollectionsPanel = () => setCollectionsPanelIsOpen(false);

  return (
    <AppContext.Provider
      value={{
        selectedItem,
        itemPanelIsOpen,
        createCollectionModalIsOpen,
        itemToCollect,
        collectionsPanelIsOpen,
        createModalIsOpen,
        setSelectedItem,
        setItemPanelIsOpen,
        setItemToCollect,
        setCollectionsPanelIsOpen,
        handleSetSelectedItem,
        handleSetItemToCollect,
        handleCloseItemPanel,
        closeCollectionsPanel,
        openCreateCollectionModal,
        closeCreateCollectionModal,
        setCreateModalIsOpen,
      }}
    >
      {' '}
      {children}{' '}
    </AppContext.Provider>
  );
}
