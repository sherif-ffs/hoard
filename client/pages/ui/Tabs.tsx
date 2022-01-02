import { useState } from 'react';
import Tab from './Tab';
import styles from './Tabs.module.scss';

interface Props {
  activeTab: number;
  setActiveTab: any;
  tabCopy: string[];
}
const Tabs = (props: Props) => {
  const [selectedTab, setSelectedTab] = useState(1);
  const { setActiveTab, activeTab, tabCopy } = props;
  return (
    <div className={styles.wrapper}>
      <Tab
        onClick={() => setActiveTab(1)}
        tabCopy={tabCopy[0]}
        version={'CTA'}
        inactive={activeTab !== 1}
      />
      <Tab
        onClick={() => setActiveTab(2)}
        tabCopy={tabCopy[1]}
        version={'CTA'}
        inactive={activeTab !== 2}
      />
    </div>
  );
};

export default Tabs;
