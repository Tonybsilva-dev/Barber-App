import { isEqual } from 'date-fns'
import Appointment from '../models/Appointments';


class AppointmentRepository{
  public findByDate(date: Date): Appointment | null{
    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date),
 );
 return findAppointment || null
  }
}

export default AppointmentRepository;
