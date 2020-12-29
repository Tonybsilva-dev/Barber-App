import { Router } from 'express';
import { getCustomRepository } from 'typeorm'
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

//Rota para obter agendamentos
appointmentsRouter.get('/', async (request, response) => {
  //Pegamos um repositório para funções personalizadas
  const appointmentsRepository = getCustomRepository(AppointmentsRepository)
  //Buscamos todos os agendamentos
  const appointments = await appointmentsRepository.find();
  //Retornamos todos os agendamentos
  return response.json(appointments)
});

//Rota para criar um agendamento
appointmentsRouter.post('/', async (request, response) => {
  try {
    //Dados necessários para criar um agendamento
    const { provider_id, date } = request.body;
    //Convertendo a Data
    const parsedDate = parseISO(date);
    //Inicializamos o seviço de criação de agendamento
    const createAppointment = new CreateAppointmentService();
    //Salvamos a instancia dos dados
    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    });
    //Retornamos o agendamento
    return response.json(appointment);
  } catch (err) {
    //Retornamos o erro disponibilzado pelo service
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
