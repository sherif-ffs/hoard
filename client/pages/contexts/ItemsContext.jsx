import { createContext, useContext, useState, useEffect } from 'react';

const ItemsContext = createContext();

export function useItemContext() {
  return useContext(ItemsContext);
}

export function ItemsContextProvider({ children }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemPanelIsOpen, setItemPanelIsOpen] = useState(false);

  const [itemToCollect, setItemToCollect] = useState(null);
  const [collectionsPanelIsOpen, setCollectionsPanelIsOpen] = useState(false);

  const [createCollectionModalIsOpen, setCollectionModalIsOpen] = useState(false);

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
    <ItemsContext.Provider
      value={{
        selectedItem,
        itemPanelIsOpen,
        createCollectionModalIsOpen,
        itemToCollect,
        collectionsPanelIsOpen,
        setSelectedItem,
        setItemPanelIsOpen,
        setItemToCollect,
        setCollectionsPanelIsOpen,
        handleSetSelectedItem,
        handleSetItemToCollect,
        handleCloseItemPanel,
        closeCollectionsPanel,
        openCreateCollectionModal,
        closeCreateCollectionModal
      }}
    >
      {' '}
      {children}{' '}
    </ItemsContext.Provider>
  );
}
