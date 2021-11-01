import { useState } from 'react';
import Modal from '../../components/ui/Modal';
import Tabs from '../../components/ui/Tabs';
import Mask from '../../components/ui/Mask';
import CreateItemForm from '../components/CreateItemForm';
import CreateCollectionForm from '../../collections/CreateCollectionForm';
interface Props {
  isOpen: boolean;
  email: string;
  name: string;
  _id: string;
  collections: [];
}
const CreateModal = (props: Props) => {
  const [activeTab, setActiveTab] = useState(1);
  const { isOpen, email, name, _id, collections } = props;
  return (
    <Mask {...{ isOpen }}>
      <Modal {...{ isOpen }}>
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
