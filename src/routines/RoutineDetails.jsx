import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { deleteRoutine, getRoutine } from "../api/routines";
import { useAuth } from "../auth/AuthContext";
import SetForm from "./SetForm";
import SetList from "./SetList";


export default function RoutineDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [routine, setRoutine] = useState(null);
  const [error, setError] = useState(null);

  const syncRoutine = useCallback(async () => {
    setError(null);

    try {
      const data = await getRoutine(id);
      setRoutine(data);
    } catch (e) {
      setError(e.message);
    }
  }, [id]);

  useEffect(() => {
    syncRoutine();
  }, [syncRoutine]);

  const tryDeleteRoutine = async () => {
    setError(null);

    try {
      await deleteRoutine(token, id);
      navigate("/routines");
    } catch (e) {
      setError(e.message);
    }
  };

  if (error && !routine) {
    return (
      <>
        <p role="alert">{error}</p>
        <Link to="/routines">Back to routines</Link>
      </>
    );
  }

  if (!routine) {
    return <p>Loading routine...</p>;
  }

  return (
    <>
      <h1>{routine.name}</h1>

      <p>Goal: {routine.goal}</p>

      <p>Created by: {routine.creatorName}</p>

      {token && (
        <button onClick={tryDeleteRoutine}>
          Delete routine
        </button>
      )}

      {error && <p role="alert">{error}</p>}

      <h2>Sets</h2>

      <SetList
        sets={routine.sets ?? []}
        syncRoutine={syncRoutine}
      />

      {token && (
        <SetForm
          routineId={id}
          syncRoutine={syncRoutine}
        />
      )}

      <Link to="/routines">Back to routines</Link>
    </>
  );
}