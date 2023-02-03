import hotelService from "@/services/hotels-service";
import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const hotels = await hotelService.getHotels();
  return res.status(httpStatus.OK).send(hotels);
}

//