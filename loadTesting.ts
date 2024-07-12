import http from 'k6/http';
import { sleep } from 'k6';

export const options = {

  // A number specifying the number of VUs to run concurrently.
  vus: 100,
  // A string specifying the total duration of the test run.
  duration: '300s',

};


export default function() {

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  for (let workoutId = 1; workoutId <= 100; workoutId++) {
    const url = `http://localhost:5000/api/schedule/workout/${workoutId}/completion`;
    const payload = JSON.stringify({
      markAs: true,
    });

    http.post(url, payload, params);
  }
}

// export default function () {
//   for (let id = 1; id <= 100; id++) {
//     http.get(`http://localhost:5000/api/hydration/${id}`);
//   }
// }
