import { useState } from 'react';

import { useAuthContext } from '../../contexts/AuthContext';
import CreateCollectionForm from '../../collections/CreateCollectionForm';
import Modal from '../../ui/Modal';
import Tabs from '../../ui/Tabs';
import Mask from '../../ui/Mask';

import CreateItemForm from './CreateItemForm';

const CreateModal = () => {
  const { createModalIsOpen } = useAuthContext();
  const [activeTab, setActiveTab] = useState(1);
  const tabCopy = ['Item', 'Collection'];

  return (
    <Mask isOpen={createModalIsOpen}>
      <Modal isOpen={createModalIsOpen}>
        <Tabs {...{ activeTab, setActiveTab, tabCopy }} />
        {activeTab === 1 ? (
          <CreateItemForm />
        ) : (
          <CreateCollectionForm context="create-modal" />
        )}
      </Modal>
    </Mask>
  );
};

export default CreateModal;
