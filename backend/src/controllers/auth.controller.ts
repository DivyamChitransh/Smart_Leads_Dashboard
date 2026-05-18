import { Response } from 'express';
import { AuthRequest } from '../types';
import { asyncHandler } from '../utils/asyncHandler';
import { sendSuccess } from '../utils/response';
import * as authService from '../services/auth.service';

export const register = asyncHandler(async (req: AuthRequest, res: Response) => {
  const result = await authService.registerUser(req.body);
  sendSuccess(res, 201, 'Account created', result);
});

export const login = asyncHandler(async (req: AuthRequest, res: Response) => {
  const result = await authService.loginUser(req.body);
  sendSuccess(res, 200, 'OK', result);
});

export const getMe = asyncHandler(async (req: AuthRequest, res: Response) => {
  const user = await authService.getCurrentUser(req.user!.userId);
  sendSuccess(res, 200, 'OK', { user });
});
