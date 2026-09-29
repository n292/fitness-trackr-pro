import { useEffect, useState } from "react";
import { getRoutines } from "../api/routines";
import { useAuth } from "../auth/AuthContext";
import RoutineForm from "./RoutineForm";
import RoutineList from "./RoutineList";


export default function RoutinesPage() {
  const { token } = useAuth();
  const [routines, setRoutines] = useState([]);
  const [error, setError] = useState(null);

  const syncRoutines = async () => {
    setError(null);

    try {
      const data = await getRoutines();
      setRoutines(data);
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    syncRoutines();
  }, []);

  return (
    <>
      <h1>Routines</h1>

      {error && <p role="alert">{error}</p>}

      <RoutineList routines={routines} />

      {token && <RoutineForm syncRoutines={syncRoutines} />}
    </>
  );
}