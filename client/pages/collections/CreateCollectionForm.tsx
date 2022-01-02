import classNames from 'classnames';
import React, { useState } from 'react';
import Router from 'next/router';

import { TagOption, TagOptions } from '../constants/Tags';
import MultiSelect from '../ui/MultiSelect';
import { useAuthContext } from '../contexts/AuthContext';
import { useAppContext } from '../contexts/AppContext';
import { createCollection } from './api/CollectionsApi';

import styles from '../items/components/CreateContentForm.module.scss';

interface Props {
  context: string;
}

const CreateCollectionForm = (props: Props) => {
  const { user } = useAuthContext();
  const { closeCreateCollectionModal, setCreateModalIsOpen } = useAppContext();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [tags, setTags] = useState<String[]>([]);
  const [creating, setCreating] = useState(false);
  const [creationSuccess, setCreationSuccess] = useState(false);

  const { context } = props;

  const generateOnClickEvent = () => {
    if (context === 'collections-panel') {
      closeCreateCollectionModal();
    } else {
      setCreateModalIsOpen(false);
    }
  };

  const handleSelectTags = (items: Array<TagOption>) => {
    const itemValues = items.map((item) => item.value);
    setTags(itemValues);
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setTags([]);
    setVisibility('public');
  };

  const handleCreationSuccess = () => {
    setCreating(false);
    setCreationSuccess(true);
    setTimeout(() => {
      setCreationSuccess(false);
    }, 2000);
    resetForm();
    setTimeout(() => {
      setCreateModalIsOpen(false);
    }, 2400);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const collection = {
      title: name,
      author: user.email,
      userId: user._id,
      description: description,
      tags: tags,
      items: [],
      isPrivate: visibility === 'private',
      likes: 0,
    };
    const result = await createCollection(collection);
    const data = await result.json();
    const { status } = data;
    if (status === 'ok') {
      handleCreationSuccess();
      resetForm();
      if (context !== 'collections-panel') {
        Router.push(`/collections/${data.data._id}`);
      }
      setCreating(false);
      setCreateModalIsOpen(false);
      return;
    }

    setCreating(false);
    closeCreateCollectionModal();
    setCreateModalIsOpen(false);
    alert('Something went wrong :/');
    return;
  };

  return (
    <form className={styles.form}>
      <div className={styles.inputWrapper}>
        <label>Collection Name</label>
        <input
          className={styles.input}
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={styles.inputWrapper}>
        <label>Select Tags</label>
        <MultiSelect
          handleChange={handleSelectTags}
          options={TagOptions}
          placeholder="select tags..."
        />
      </div>
      <div className={styles.inputWrapper}>
        <label>Whats this about</label>
        <input
          className={styles.input}
          type="text"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
              <span>Scraping Url...</span>
            </div>
          ) : (
            <span>
              {creationSuccess ? 'Collection Created!' : 'Contribute'}
            </span>
          )}
        </button>
      </div>
    </form>
  );
};

export default CreateCollectionForm;
