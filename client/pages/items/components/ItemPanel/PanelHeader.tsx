import Link from 'next/link';

import SaveSVG from '../../../components/ui/icons/SaveSVG';
import { useItemContext } from '../../../contexts/ItemsContext';

import styles from './PanelHeader.module.scss';

const PanelHeader = () => {
  const { handleSetItemToCollect, selectedItem } = useItemContext();
  const { name, url, author, userId, tags } = selectedItem;

  return (
    <>
      <header className={styles.header}>
        <div className={styles.details}>
          <Link href={url}>
            <a target="_blank">
              <h1>{name}</h1>
            </a>
          </Link>
          <Link href={`/profile/${userId}`}>
            <h3>Uploaded By: {author}</h3>
          </Link>
        </div>
        <button
          className={styles.saveButton}
          onClick={() => handleSetItemToCollect(selectedItem)}
        >
          <SaveSVG height={30} width={30} color="#050505" />
        </button>
      </header>
      <ul className={styles.tags}>
        {tags &&
          !!tags.length &&
          tags.map((tag: string, i: number) => (
            <li key={i} className={styles.tag}>
              {tag}
            </li>
          ))}
      </ul>
    </>
  );
};

export default PanelHeader;
