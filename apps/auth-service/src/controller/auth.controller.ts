import { NextFunction, Request, Response } from "express";
import {
  checkOtpRestrictions,
  sendOtp,
  trackOtpRequests,
  validationRegistrationData,
  verifyOtp,
} from "../utils/auth.helper";
import bcrypt from "bcryptjs";
import prisma from "@packages/libs/prisma";
import { ValidationError } from "@packages/error-handler";

// Register a new user
export const userRegistation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validationRegistrationData(req.body, "user");
    const { name, email, password } = req.body;

    const exsistingUser = await prisma.users.findUnique({ where: { email } });

    if (exsistingUser) {
      return next(new ValidationError("User already exsists with this email!"));
    }

    await checkOtpRestrictions(email, next);
    await trackOtpRequests(email, next);
    await sendOtp(name, email, "user-activation-email");

    res.status(200).json({
      message: "OTP sent to email. Please verify your account.",
    });
  } catch (error) {
    return next(error);
  }
};

// Verify user with otp
export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, otp, password, name } = req.body;
    if (!email || !otp || !password || !name) {
      return next(new ValidationError("All feilds are required!"));
    }

    const exsistingUser = await prisma.users.findUnique({ where: { email } });

    if (exsistingUser) {
      return next(new ValidationError("User already exsits with this email!"));
    }

    await verifyOtp(email, otp, next);
    const hashPassword = await bcrypt.hash(password, 10);

    await prisma.users.create({
      data: { name, email, password: hashPassword },
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
    });
  } catch (error) {
    return next(error);
  }
};
