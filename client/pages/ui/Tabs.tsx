import Tab from './Tab';
import styles from './Tabs.module.scss';

interface Props {
  activeTab: number;
  setActiveTab: any;
  tabCopy: string[];
  dark: boolean;
}
const Tabs = (props: Props) => {
  const { setActiveTab, activeTab, tabCopy, dark } = props;
  return (
    <div className={styles.wrapper}>
      <Tab
        onClick={() => setActiveTab(1)}
        tabCopy={tabCopy[0]}
        version={'CTA'}
        inactive={activeTab !== 1}
        {...{ dark }}
      />
      <Tab
        onClick={() => setActiveTab(2)}
        tabCopy={tabCopy[1]}
        version={'CTA'}
        inactive={activeTab !== 2}
        {...{ dark }}
      />
    </div>
  );
};

export default Tabs;
