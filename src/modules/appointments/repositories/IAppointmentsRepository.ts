import Appointment from '../infra/typeorm/entities/Appointment';
import CreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';

export default interface AppointmentsRepository {
  create(data: CreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
