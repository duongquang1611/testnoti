import axios from 'axios';
import { Env } from '../../environment';

const appointmentApi = {
    getListAppointmentById: async (id) => {
        try {
            let res = await axios.get(`https://bvdkdongda.hosoyte.com/api/01004/hsyt/benhnhans/${id}/lichhens`);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
}
//     getListAppointmentById: async (id, state) => {
//         try {
//             let res = await axios.get(`http://10.2.10.182:3000/api/schedule/patient/${id}`, { params: { state: state } }
//             );
//             return res.data;
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }

export default appointmentApi;