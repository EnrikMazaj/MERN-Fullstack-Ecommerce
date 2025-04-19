import express from 'express';
import { createTicket, deleteTicket, getTickets, getTicketById, updateTicket } from '../controllers/ticketController.js';

const router = express.Router();

// create ticket
router.post('/', createTicket);
// delete ticket
router.post('/:id/delete', deleteTicket);
// get all tickets
router.get('/', getTickets);
// get ticket by id
router.get('/:id', getTicketById);
// update ticket
router.put('/:id', updateTicket);

export default router; 