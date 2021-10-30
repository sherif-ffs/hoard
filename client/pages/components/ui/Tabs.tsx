import { useState } from 'react';
import Tab from './Tab';
import styles from './Tabs.module.scss';

interface Props {
  activeTab: number;
  setActiveTab: any;
}
const Tabs = (props: Props) => {
  const [selectedTab, setSelectedTab] = useState(1);
  const { setActiveTab, activeTab } = props;
  return (
    <div className={styles.wrapper}>
      <Tab
        onClick={() => setActiveTab(1)}
        tabCopy={'Create Item'}
        version={'CTA'}
        inactive={activeTab !== 1}
      />
      <Tab
        onClick={() => setActiveTab(2)}
        tabCopy={'Create Collection'}
        version={'CTA'}
        inactive={activeTab !== 2}
      />
    </div>
  );
};

export default Tabs;
