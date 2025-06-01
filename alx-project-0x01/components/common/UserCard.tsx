import { UserProps } from "@/interfaces";

const UserCard: React.FC<UserProps> = ({
    id,
    name,
    username,
    email,
    phone,
    address,
    website,
    company,
}) =>{
    return(
<div className="max-w-xl mx-auto my-6 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        {name}
    </h2>
    <p className="text-gray-600 mb-1">
        <strong>Username:</strong>{username}
    </p>
     <p className="text-gray-600 mb-1">
        <strong>Email:</strong>{email}
    </p>
     <p className="text-gray-600 mb-1">
        <strong>Phone:</strong>{phone}
    </p>
     <p className="text-gray-600 mb-1">
        <strong>Website:</strong>{""}
        <a href={`https://${website}`} target="_blank" className="text-blue-600 underline"> {website}</a>
    </p>

    <div className="text-sm text-gray-500">
      <p>
          <strong>Address:</strong> {address.street}, {address.suite}, {address.city}, {address.zipcode}
        </p>
         <p>
          <strong>Company:</strong> {company.name}&quot;{company.catchPhrase}&quot;
        </p>
         <p>
          <strong>User ID:</strong> {id}
        </p>
    </div>
</div>
    )
}
export default UserCard;