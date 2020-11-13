import { isEqual } from 'date-fns'
import Appointment from '../models/Appointments';


class AppointmentRepository{
  public findByDate(date: Date): Appointment | null{
    const findAppointment = this.appointments.find(apppointment =>
      isEqual(date, apppointment.date),
 );
 return findAppointment || null
  }
}

export default AppointmentRepository;
