import React, { useState } from 'react';
import classNames from 'classnames';

import { TagOptions } from '../constants/Tags';

import styles from './Filter.module.scss';
import { useEffect } from 'react';

interface Props {
  updateFilters: (filters: []) => void;
}

const Filters = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filterList, setFilterList] = useState<string>([]);
  const [filterString, setFilterString] = useState('');
  const [filteredTags, setFilteredTags] = useState(
    TagOptions.map((t) => t.value)
  );
  const tags = TagOptions.map((t) => t.value);

  const removeItem = (tag: string) => {
    const existing = [...filterList];
    const index = existing.indexOf(tag);
    existing.splice(index, 1);
    setFilterList(existing);
  };

  const addItem = (tag: string) => {
    const existing = [...filterList];
    existing.push(tag);
    setFilterList(existing);
  };

  const handleSearch = (e: any) => {
    const input = e.target.value.toLowerCase();
    if (input.length === 0) {
      setFilteredTags(TagOptions.map((t) => t.value));
      return;
    }
    const existing = TagOptions.map((t) => t.value);
    const newTags = existing.filter((t) => t.includes(input));
    setFilteredTags(newTags);
  };

  const clearFilter = () => {
    setIsOpen(false);
    setFilterList([]);
    props.updateFilters([]);
  };
  const filterItems = () => {
    setIsOpen(false);
    props.updateFilters(filterList);
  };

  const toggle = () => (isOpen ? setIsOpen(false) : setIsOpen(true));
  return (
    <div className={styles.wrapper}>
      <div
        className={classNames(styles.button, { [styles.open]: isOpen })}
        onClick={!isOpen ? toggle : undefined}
      >
        {isOpen ? (
          <section className={styles.tagsWrapper}>
            <input onChange={handleSearch} placeholder="Search for tags" />
            <div className={styles.tags}>
              {filteredTags.map((t) => {
                const selected = filterList.includes(t);
                return (
                  <span
                    className={classNames(styles.tag, {
                      [styles.selected]: selected,
                    })}
                    onClick={() => (selected ? removeItem(t) : addItem(t))}
                    key={t}
                    value={t}
                  >
                    {t}
                  </span>
                );
              })}
            </div>
            <div className={styles.buttons}>
              <button onClick={toggle}>Close</button>
              <button onClick={filterItems} className={styles.cta}>
                Filter
              </button>
              {filterList.length > 0 && (
                <button onClick={clearFilter} className={styles.cta}>
                  Clear Filters
                </button>
              )}
            </div>
          </section>
        ) : (
          <>
            <span onClick={toggle} className={styles.toggleButton}>
              Filter Items{' '}
              {filterList.length > 0 && (
                <span className={styles.filterCount}>
                  ({filterList.length})
                </span>
              )}
            </span>
          </>
        )}
      </div>
      {!isOpen && filterList.length > 0 && (
        <>
          <div className={styles.filterText}>
            <span>
              <strong>Filtering by:</strong>
            </span>
            {filterList.map((tag: string, i: number) => {
              const isLast = i === filterList.length - 1;
              return (
                <span key={tag}>
                  {tag}
                  {!isLast ? ',' : null}
                </span>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Filters;
