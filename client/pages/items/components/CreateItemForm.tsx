import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { TagOption, TagOptions } from '../../constants/Tags';
import MultiSelect from '../../components/ui/MultiSelect';
import Button from '../../components/ui/Button';
import { useAppContext } from '../../components/AppWrapper';
import { useItemContext } from '../../contexts/ItemsContext';
import { createItem } from '../api/ItemApi';
import Spinner from '../../components/ui/Spinner';
import CheckSVG from '../../components/ui/icons/CheckSVG';
import styles from './CreateContentForm.module.scss';

const CreateItemForm = () => {
  const { setCreateModalIsOpen, user, myCollections } = useAppContext();
  const { handleSetSelectedItem } = useItemContext();
  const { email, name, _id } = !!user && user;
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [tags, setTags] = useState<String[]>([]);
  const [collectionOptions, setCollectionOptions] = useState([]);
  const [collectionData, setCollectionData] = useState<Object[]>([]);
  const [creating, setCreating] = useState(false);
  const [creationSuccess, setCreationSuccess] = useState(false);

  const handleCollectionChange = (
    collections: Array<{ label: string; value: string }>
  ) => {
    const collectionData = collections.map((item) => ({
      title: item.label,
      id: item.value,
    }));
    setCollectionData(collectionData);
  };
  const handleSelectTags = (items: Array<TagOption>) => {
    const itemValues = items.map((item) => item.value);
    setTags(itemValues);
  };

  useEffect(() => {
    if (myCollections && !!myCollections.length) {
      const options = myCollections.map((collection: any) => ({
        label: collection.title,
        value: collection._id,
      }));
      setCollectionOptions(options);
    }
  }, [myCollections]);

  const resetForm = () => {
    setUrl('');
    setDescription('');
    setTags([]);
    setVisibility('public');
  };

  const redirectUserToItemPanel = (data: any) => {
    console.log('data: ', data);
    handleSetSelectedItem(data);
  };

  const handleCreationSuccess = (data: any) => {
    setCreating(false);
    setCreationSuccess(true);
    setTimeout(() => {
      setCreationSuccess(false);
    }, 2000);
    resetForm();
    setTimeout(() => {
      redirectUserToItemPanel(data);
      setCreateModalIsOpen(false);
    }, 2400);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setCreating(true);
    const item = {
      name: '',
      author: email,
      userId: _id,
      description,
      url,
      tags: tags,
      isPrivate: visibility === 'private',
      likes: 0,
      collections: collectionData,
    };
    const result = await createItem(item);
    const data = await result.json();
    const { status } = data;
    if (status === 'ok') {
      handleCreationSuccess(data.data);
      return;
    }

    setCreating(false);
    setCreateModalIsOpen(false);
    return;
  };
  return (
    <form className={styles.form}>
      <h1>Create Item</h1>
      <div className={styles.inputWrapper}>
        <label>Url *</label>
        <input
          className={styles.input}
          type="text"
          placeholder="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div className={styles.inputWrapper}>
        <label>Add to Collection</label>
        <MultiSelect
          placeholder="select collection"
          handleChange={handleCollectionChange}
          options={collectionOptions}
        />
      </div>
      <div className={styles.inputWrapper}>
        <label>Add Tags</label>
        <MultiSelect
          placeholder="add tags..."
          handleChange={handleSelectTags}
          options={TagOptions}
        />
      </div>
      <div className={styles.buttonWrapper}>
        <button
          className={styles.closeButton}
          onClick={() => setCreateModalIsOpen(false)}
        >
          Cancel
        </button>
        <button
          onClick={(e: any) => handleSubmit(e)}
          className={classNames(styles.submit, {
            [styles.success]: creationSuccess,
          })}
          disabled={creating}
        >
          {creating ? (
            <div className={styles.loading}>
              {/* <Spinner /> */}
              <span>Scraping Url...</span>
            </div>
          ) : (
            <span>{creationSuccess ? 'Item Created!' : 'Create'}</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default CreateItemForm;
