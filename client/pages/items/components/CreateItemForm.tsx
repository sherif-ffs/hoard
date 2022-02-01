import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import toast from 'react-hot-toast';

import { TagOption, TagOptions } from '../../../constants/Tags';
import MultiSelect from '../../ui/MultiSelect';
import loadMyCollections from '../../collections/hooks/loadCollectionById';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useAppContext } from '../../../contexts/AppContext';
import Loading from '../../ui/Loading';
import Error from '../../ui/Error';
import { createItem } from '../api/ItemApi';

import styles from './CreateContentForm.module.scss';

const CreateItemForm = () => {
  const { user } = useAuthContext();
  const { setCreateModalIsOpen } = useAppContext();
  const { handleSetSelectedItem } = useAppContext();
  const { email, _id } = !!user && user;
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [tags, setTags] = useState<String[]>([]);
  const [collectionOptions, setCollectionOptions] = useState([]);
  const [collectionData, setCollectionData] = useState<Object[]>([]);
  const [creating, setCreating] = useState(false);
  const [creationSuccess, setCreationSuccess] = useState(false);

  const response = user && user._id && loadMyCollections(user._id);
  const { collections: myCollections, status, error } = response;

  if (status === 'loading') {
    return <Loading copy="Loading collections..." />;
  }

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
    handleSetSelectedItem(data);
  };

  const handleCreationSuccess = (data: any) => {
    setCreating(false);
    setCreationSuccess(true);
    setTimeout(() => {
      redirectUserToItemPanel(data);
      setCreateModalIsOpen(false);
      setCreationSuccess(false);
    }, 2000);
    resetForm();
    return toast.success('Item Created Successfully');
  };

  function isValidHttpUrl(s: string) {
    let url;

    try {
      url = new URL(s);
    } catch (_) {
      return false;
    }

    return url.protocol === 'http:' || url.protocol === 'https:';
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const t = isValidHttpUrl(url);
    if (!t) {
      alert('Please enter valid Url');
      return;
    }
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
      datePublished: new Date(),
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
    return toast.error('Something went wrong');
  };
  return (
    <form className={styles.form}>
      {error && <Error />}
      <div className={styles.inputWrapper}>
        <label>Url *</label>
        <input
          className={styles.input}
          type="text"
          minLength={1}
          maxLength={1000}
          required
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
            <span>Scraping Url...</span>
          ) : (
            <span>{creationSuccess ? 'Item Created!' : 'Contribute'}</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default CreateItemForm;
