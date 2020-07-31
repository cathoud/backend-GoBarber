import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import AppointmentsRepository from '../repositories/IAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

interface Request {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: AppointmentsRepository,
  ) {}

  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const appointmentOnSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (appointmentOnSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
