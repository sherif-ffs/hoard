import { useState } from 'react';

import { useAppContext } from '../../components/AppWrapper';
import CreateCollectionForm from '../../collections/CreateCollectionForm';
import Modal from '../../components/ui/Modal';
import Tabs from '../../components/ui/Tabs';
import Mask from '../../components/ui/Mask';
import CreateItemForm from './CreateItemForm';

const CreateModal = () => {
  const { createModalIsOpen } = useAppContext();
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
