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

  const handleSetSelectedItem = (item) => {
    console.log('item: ', item);
    if (!itemPanelIsOpen) {
      setItemPanelIsOpen(true);
    }
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
        setSelectedItem,
        itemPanelIsOpen,
        setItemPanelIsOpen,
        itemToCollect,
        setItemToCollect,
        collectionsPanelIsOpen,
        setCollectionsPanelIsOpen,
        handleSetSelectedItem,
        handleSetItemToCollect,
        handleCloseItemPanel,
        closeCollectionsPanel,
      }}
    >
      {' '}
      {children}{' '}
    </ItemsContext.Provider>
  );
}
