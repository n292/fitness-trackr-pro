const API = import.meta.env.VITE_API;


export async function getRoutines() {
  const response = await fetch(API + "/routines");
  const result = await response.json();

  if (!response.ok) {
    throw Error(result.message || "Unable to load routines.");
  }

  return result;
}

export async function getRoutine(id) {
  const routines = await getRoutines();
  const routine = routines.find((routine) => routine.id === Number(id));

  if (!routine) {
    throw Error("Routine not found.");
  }

  return routine;
}


export async function createRoutine(token, routine) {
  if (!token) {
    throw Error("You must be signed in to create a routine.");
  }

  const response = await fetch(API + "/routines", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(routine),
  });

  const result = await response.json();

  if (!response.ok) {
    throw Error(result.message || "Unable to create routine.");
  }

  return result;
}


export async function deleteRoutine(token, id) {
  if (!token) {
    throw Error("You must be signed in to delete a routine.");
  }

  const response = await fetch(API + "/routines/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message || "Unable to delete routine.");
  }
}