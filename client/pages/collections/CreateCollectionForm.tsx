import React, { useState } from 'react';
import { createCollection } from './api/CollectionsApi';
import { TagOption, TagOptions } from '../constants/Tags';
import MultiSelect from '../components/ui/MultiSelect';
import { useAppContext } from '../components/AppWrapper';

const CreateCollectionForm = () => {
  const { user } = useAppContext();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [tags, setTags] = useState<String[]>([]);

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
      alert('collection Created Successfully');
      resetForm();
      return;
    }

    alert('Something went wrong');
    return;
  };

  return (
    <form style={{ border: '1px solid black', padding: '2rem' }}>
      <input
        className="name"
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="description"
        type="text"
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="radio"
        onChange={() => setVisibility('public')}
        name="public"
        checked={visibility === 'public'}
      />{' '}
      Public
      <input
        type="radio"
        onChange={() => setVisibility('private')}
        name="private"
        checked={visibility === 'private'}
      />{' '}
      Private
      <MultiSelect handleChange={handleSelectTags} options={TagOptions} />
      <button onClick={(e) => handleSubmit(e)}>Create Item</button>
    </form>
  );
};

export default CreateCollectionForm;
