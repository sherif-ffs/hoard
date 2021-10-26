import Router, { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import type { NextPage } from 'next';

const Profile = () => {
  const router = useRouter();
  const id = router.query;

  return <p>{id}</p>;
};

export default Profile;
