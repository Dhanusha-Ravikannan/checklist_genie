
let tasks = [
  { id: 1, name: "Daily clock in", answer: "", comment: "" },
  { id: 2, name: "Monday meeting", answer: "", comment: "" },
  { id: 3, name: "Testing", answer: "", comment: "" },
  { id: 4, name: "Workdone email", answer: "", comment: "" },
  { id: 5, name: "Clock out", answer: "", comment: "" },
];

export const getTasks = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tasks);
    }, 500); 
  });
};

export const submitTasks = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Submitted data:", data); 
      resolve({ success: true });
    }, 500); 
  });
};
