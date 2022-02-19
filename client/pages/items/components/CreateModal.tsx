import { useState } from 'react';

import { useAppContext } from '../../../contexts/AppContext';
import CreateCollectionForm from '../../collections/CreateCollectionForm';
import Modal from '../../ui/Modal';
import Tabs from '../../ui/Tabs';
import Mask from '../../ui/Mask';

import CreateItemForm from './CreateItemForm';

const CreateModal = () => {
  const { createModalIsOpen, closeCreateModal, closeCreateCollectionModal } =
    useAppContext();
  const [activeTab, setActiveTab] = useState(1);
  const tabCopy = ['Webpage', 'Collection'];

  return (
    <Mask isOpen={createModalIsOpen} close={closeCreateModal}>
      <Modal isOpen={createModalIsOpen}>
        <Tabs {...{ activeTab, setActiveTab, tabCopy }} dark={false} />
        {activeTab === 1 ? (
          <CreateItemForm />
        ) : (
          <CreateCollectionForm
            context="create-modal"
            {...{ closeCreateCollectionModal }}
          />
        )}
      </Modal>
    </Mask>
  );
};

export default CreateModal;
