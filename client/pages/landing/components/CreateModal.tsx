import { useState } from 'react';
import Modal from '../../components/ui/Modal';
import Tabs from '../../components/ui/Tabs';

interface Props {
  isOpen: boolean;
}
const CreateModal = (props: Props) => {
  const [activeTab, setActiveTab] = useState(1);
  const { isOpen } = props;
  return (
    <Modal {...{ isOpen }}>
      <Tabs {...{ activeTab, setActiveTab }} />
      {activeTab === 1 ? <p>create item</p> : <p>create collection</p>}
    </Modal>
  );
};

export default CreateModal;
