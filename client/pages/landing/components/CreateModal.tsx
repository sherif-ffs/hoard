import { useState } from 'react';
import Modal from '../../components/ui/Modal';
import Tabs from '../../components/ui/Tabs';
import Mask from '../../components/ui/Mask';
import CreateItemForm from '../components/CreateItemForm';
interface Props {
  isOpen: boolean;
}
const CreateModal = (props: Props) => {
  const [activeTab, setActiveTab] = useState(1);
  const { isOpen } = props;
  return (
    <Mask>
      <Modal {...{ isOpen }}>
        <Tabs {...{ activeTab, setActiveTab }} />
        {activeTab === 1 ? <CreateItemForm /> : <p>create collection</p>}
      </Modal>
    </Mask>
  );
};

export default CreateModal;
