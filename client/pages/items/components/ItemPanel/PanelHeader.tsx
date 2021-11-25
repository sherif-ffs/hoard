// import classNames from 'classnames';
import Link from 'next/link';

import SaveSVG from '../../../components/ui/icons/SaveSVG';

import styles from './PanelHeader.module.scss';

interface Props {
  name: string;
  userId: string;
  author: string;
  url: string;
  openCollectionsPanel: () => void;
  tags: string[] | null | undefined;
}
const PanelHeader = (props: Props) => {
  const { name, url, author, userId, tags, openCollectionsPanel } = props;
  return (
    <>
      <header className={styles.header}>
        <div className={styles.left}>
          <Link href={url}>
            <a target="_blank">
              <h1>{name}</h1>
            </a>
          </Link>
          <Link href={`/profile/${userId}`}>
            <h3>Uploaded By: {author}</h3>
          </Link>
        </div>
        <div className={styles.right}>
          <button className={styles.saveButton} onClick={openCollectionsPanel}>
            <SaveSVG height={30} width={30} color="#050505" />
          </button>
        </div>
      </header>
      <ul className={styles.tags}>
        {tags &&
          !!tags.length &&
          tags.map((tag, i) => (
            <li key={i} className={styles.tag}>
              {tag}
            </li>
          ))}
      </ul>
    </>
  );
};

export default PanelHeader;
