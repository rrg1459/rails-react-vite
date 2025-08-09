const SessionActions = ({ uid, onSignOut, onFetchUsers, onLocale, language, sessionActions }) => (
  <div className="border p-4 rounded-md">
    <h2 className="text-xl font-semibold mb-2">{sessionActions.active_sesscion}</h2>
    <p className="mb-2">{sessionActions.uid}: <span className="font-mono text-sm">{uid}</span></p>
    <button onClick={onSignOut} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 mr-2">{sessionActions.log_out}</button>
    <button onClick={onFetchUsers} className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 mr-2">{sessionActions.get_users}</button>
    <button onClick={onLocale} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">{language}</button>
  </div>
);

export default SessionActions;
