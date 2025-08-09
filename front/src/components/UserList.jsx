import { useTranslation } from 'react-i18next';

const UserList = ({ users }) => {

  const { t } = useTranslation();

  return (
    <div className="border p-4 rounded-md">
      <h2 className="text-xl font-semibold mb-2">{t('users_list')}</h2>
      <ul className="list-disc pl-5">
        {users.map((user) => (
          <li key={user.id} className="mb-2">
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>{t('name')}:</strong> {user.firstName} {user.lastName}</p>
            <p><strong>{t('email')}:</strong> {user.email}</p>
            {user.img && <img src={user.img} alt="User" className="w-16 h-16 rounded-full mt-1" />}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;