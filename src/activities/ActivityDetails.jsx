import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { deleteActivity, getActivity } from "../api/activities";
import { useAuth } from "../auth/AuthContext";


export default function ActivityDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [activity, setActivity] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadActivity = async () => {
      setError(null);

      try {
        const data = await getActivity(id);
        setActivity(data);
      } catch (e) {
        setError(e.message);
      }
    };

    loadActivity();
  }, [id]);

  const tryDelete = async () => {
    setError(null);

    try {
      await deleteActivity(token, id);
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

  if (error && !activity) {
    return <p role="alert">{error}</p>;
  }

  if (!activity) {
    return <p>Loading activity...</p>;
  }

  return (
    <>
      <h1>{activity.name}</h1>

      <p>{activity.description}</p>

      <p>Created by: {activity.creatorName}</p>

      {token && (
        <button onClick={tryDelete}>
          Delete
        </button>
      )}

      {error && <p role="alert">{error}</p>}

      <Link to="/">
        Back to activities
      </Link>
    </>
  );
}