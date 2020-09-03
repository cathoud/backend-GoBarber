import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      provider_id: '123456789',
      date: new Date(),
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456789');
  });

  it('should not be able to create two appointments on the same date and time', async () => {
    const appointmentDate = new Date();
    await createAppointment.execute({
      provider_id: '123456789',
      date: appointmentDate,
    });

    expect(
      createAppointment.execute({
        provider_id: '123456789',
        date: appointmentDate,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
