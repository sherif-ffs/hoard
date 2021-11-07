import { useState } from 'react';
import { useAppContext } from '../../components/AppWrapper';
import Modal from '../../components/ui/Modal';
import Tabs from '../../components/ui/Tabs';
import Mask from '../../components/ui/Mask';
import CreateItemForm from '../components/CreateItemForm';
import CreateCollectionForm from '../../collections/CreateCollectionForm';
interface Props {
  email: string;
  name: string;
  _id: string;
  collections: [];
}
const CreateModal = (props: Props) => {
  const { createModalIsOpen } = useAppContext();
  const [activeTab, setActiveTab] = useState(1);
  const { email, name, _id, collections } = props;
  return (
    <Mask isOpen={createModalIsOpen}>
      <Modal isOpen={createModalIsOpen}>
        <Tabs {...{ activeTab, setActiveTab }} />
        {activeTab === 1 ? (
          <CreateItemForm {...{ email, name, _id, collections }} />
        ) : (
          <CreateCollectionForm />
        )}
      </Modal>
    </Mask>
  );
};

export default CreateModal;
