import { useState } from "react";
import { deleteSet } from "../api/sets";
import { useAuth } from "../auth/AuthContext";


export default function SetList({ sets, syncRoutine }) {
  const { token } = useAuth();
  const [error, setError] = useState(null);

  if (!sets.length) {
    return <p>No sets yet. Add a set to this routine!</p>;
  }

  const tryDeleteSet = async (setId) => {
    setError(null);

    try {
      await deleteSet(token, setId);
      await syncRoutine();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <ul>
        {sets.map((set) => (
          <li key={set.id}>
            {set.name} — {set.count} reps

            {token && (
              <button
                onClick={() => tryDeleteSet(set.id)}
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>

      {error && <p role="alert">{error}</p>}
    </>
  );
}