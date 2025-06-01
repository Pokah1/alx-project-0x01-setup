import Header from "@/components/layout/Header";
import React, { useState } from "react";
import UserCard from "@/components/common/UserCard";
import UserModal from "@/components/common/UserModal";
import {UserData, UserProps } from "@/interfaces";
import Footer from "@/components/layout/Footer";

interface UsersPageProps {
  users: UserProps[];
}


const Users: React.FC<UsersPageProps> = ({ users }) => {
const [isModalOpen, setModalOpen] = useState(false);
  const [allUsers, setAllUsers] = useState<UserData[]>(users);

const handleAddUser = (newUser: UserData) => {
   const newId = allUsers.length + 1;
       const userWithId: UserData = {
      ...newUser,
      id: newId,
    };
   setAllUsers([...allUsers, userWithId]);
   setModalOpen(false);
}

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="p-4">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-semibold">User List</h1>
          <button
             onClick={() => setModalOpen(true)}
          className="bg-blue-700 px-4 py-2 rounded-full text-white">
            Add User
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {allUsers.map((user) => (
            <UserCard
              key={user.id}
              id={user.id}
              name={user.name}
              username={user.username}
              email={user.email}
              address={user.address}
              phone={user.phone}
              website={user.website}
              company={user.company}
            />
          ))}
        </div>

          {/* Render the modal when isModalOpen is true */}
          {isModalOpen && (
          <UserModal
            onClose={() => setModalOpen(false)}
            onSubmit={handleAddUser}
          />
        )}
      </main>
      <Footer/>
    </div>
  );
};

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users")
  const posts = await response.json()

  return {
    props: {
      posts
    }
  }
}
export default Users;