import httpStatus from "http-status";

import { NextFunction, Request, Response } from "express";
import { teamServices } from "./team.services";

const getAllTeam = async (res: Response) => {
    const result = await teamServices.getAllTeam();
    res.status(httpStatus.OK).json({
        success: true,
        message: "All team fetched successfully",
        data: result,
    });
};

export const teamControllers = {
    getAllTeam,
};
