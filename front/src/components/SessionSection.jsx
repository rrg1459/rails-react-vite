import SessionActions from '../signs/SessionActions';
import UserList from './UserList';

function SessionSection({ uid, users, onSignOut, onFetchUsers, onLocale, language, sessionActions }) {

  return (
    <div className="space-y-6">
      <SessionActions
        uid={uid}
        onSignOut={onSignOut}
        onFetchUsers={onFetchUsers}
        onLocale={onLocale}
        language={language}
        sessionActions={sessionActions}
      />

      {users.length > 0 && <UserList users={users} />}
    </div>
  );
}

export default SessionSection;