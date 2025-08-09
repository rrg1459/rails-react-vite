const Message = ({ message, error=null}) => {

  return (
    <div>
      {message && (
        <div
          style={{ color: 'green' }}
          className="mb-4 p-2 bg-blue-100 text-blue-800 rounded-md"
        >
          {message}
        </div>
      )}
      {error && (
        <div
          style={{ color: 'red' }}
          className="mb-4 p-2 bg-gray-100 text-red-800 rounded-md"
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default Message;