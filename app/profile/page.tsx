/** @format */

'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Import Card components from ShadCN
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table'; // Import Table components from ShadCN

interface ProfilePageProps { }

const ProfilePage: React.FC<ProfilePageProps> = () => {
  const [userInfo, setUserInfo] = useState<Record<string, any> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchUserInfo = async () => {
    try {
      const res = await axios.get('http://localhost:90/accestoken');
      const { oidc_name, oidc_preferred_username, oidc_email, oidc_room, oidc_doorm, oidc_roles } = res.data;
      const Name = oidc_name;
      const Username = oidc_preferred_username;
      const Email = oidc_email;
      const Room = oidc_room;
      const Doorm = oidc_doorm;
      const Roles = oidc_roles ? oidc_roles.split(',')[0] : 'Not Defined';
      const filteredUserInfo = { Name, Username, Email, Room, Doorm, Roles };
      setUserInfo(filteredUserInfo);
    } catch (error) {
      setError('Failed to fetch user data.');
    }
  };

  useEffect(() => {
    fetchUserInfo(); // Fetch user info on component mount
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <Card className="w-full max-w-2xl p-8">
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody>
              {userInfo ? (
                Object.entries(userInfo).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell>{key}</TableCell>
                    <TableCell className='w-1/2 text-right'>{
                      value !== undefined && value !== null ?
                        (typeof value === 'object' ? JSON.stringify(value) : String(value))
                        : 'Not Defined'
                    }</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2}>Not Defined</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
