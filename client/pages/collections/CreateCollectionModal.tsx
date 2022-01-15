import { useAppContext } from '../contexts/AppContext';

import Mask from '../ui/Mask';
import Modal from '../ui/Modal';
import CreateCollectionForm from './CreateCollectionForm';

const CreateCollectionModal = () => {
  const { createCollectionModalIsOpen, closeCreateCollectionModal } =
    useAppContext();
  return (
    <Mask
      isOpen={createCollectionModalIsOpen}
      close={closeCreateCollectionModal}
    >
      <Modal isOpen={createCollectionModalIsOpen}>
        <CreateCollectionForm
          context="collections-panel"
          {...{ closeCreateCollectionModal }}
        />
      </Modal>
    </Mask>
  );
};

export default CreateCollectionModal;
