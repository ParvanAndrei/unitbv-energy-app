/** @format */

'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ProfilePageProps {}

const ProfilePage: React.FC<ProfilePageProps> = () => {
  const [userInfo, setUserInfo] = useState<Record<string, any> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get('http://localhost:90/accestoken');
        console.log(res)
        setUserInfo(res.data);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
        setError('Failed to fetch user data.');
      }
    };

    fetchUserInfo();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <table>
        <thead>
          <tr>
            <th>Attribute</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {userInfo ? (
            Object.entries(userInfo).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{
                  value !== undefined && value !== null ? 
                  (typeof value === 'object' ? JSON.stringify(value) : String(value)) 
                  : 'gol'
                }</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2}>gol</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProfilePage;
