import { useItemContext } from '../contexts/ItemsContext';

import Mask from '../components/ui/Mask';
import Modal from '../components/ui/Modal';
import CreateCollectionForm from './CreateCollectionForm';

const CreateCollectionModal = () => {
  const { createCollectionModalIsOpen } = useItemContext();
  return (
    <Mask isOpen={createCollectionModalIsOpen}>
      <Modal isOpen={createCollectionModalIsOpen}>
        <CreateCollectionForm context="collections-panel" />
      </Modal>
    </Mask>
  );
};

export default CreateCollectionModal;
