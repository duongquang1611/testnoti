import axios from "axios";
import { Env } from "../../environment";

export const ScheduleApi = {
  getScheduleByDate: async (from, to, state) => {
    return await axios.get(`${Env.appUrl}/${Env.domain}/hsyt/lichhens/theongay?from=${from}&to=${to}&iState=${state}`);
  },
  getRoom: async () => {
    return await axios.get(`${Env.appUrl}/${Env.domain}/khoaphongs`);
  },
  createSchedule: async schedule => {
    console.log(schedule);
    return await axios.post("http://10.2.10.41:3000/api/schedule", schedule);
  }
};
