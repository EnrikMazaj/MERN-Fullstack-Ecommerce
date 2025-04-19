import { Request, Response } from 'express';
import Ticket from '../models/Ticker.js';   

export const createTicket = async (req: Request, res: Response) => {
    const { title, description, price } = req.body;
    const ticket = await Ticket.create({ title, description, price });
    res.status(201).json(ticket);
};

export const deleteTicket = async (req: Request, res: Response) => {
    const { id } = req.params;
    const ticket = await Ticket.findByIdAndDelete(id);
    res.status(200).json(ticket);
};

export const getTickets = async (req: Request, res: Response) => {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
};


export const getTicketById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const ticket = await Ticket.findById(id);
    res.status(200).json(ticket);
};

export const updateTicket = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, price } = req.body;
    const ticket = await Ticket.findByIdAndUpdate(id, { title, description, price }, { new: true });
    res.status(200).json(ticket);
};