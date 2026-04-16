import type { Request, Response } from 'express';
import {
  loginService,
  refreshTokenService,
  registerService,
} from '../services/auth.service';

const registerController = async (req: Request, res: Response) => {
  try {
    const { email, tokens } = await registerService(req.body);
    res.status(201).json({
      email,
      tokens,
    });
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : 'Unexpected error',
    });
  }
};

const loginController = async (req: Request, res: Response) => {
  try {
    const loginResult = await loginService(req.body);
    if (!loginResult) {
      return res.status(401).json({
        message: 'Invalid email or password',
      });
    }
    res.status(200).json({
      email: loginResult.email,
      tokens: loginResult.tokens,
    });
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : 'Unexpected error',
    });
  }
};

const refreshTokenController = async (req: Request, res: Response) => {
  try {
    const refreshToken = await refreshTokenService(req.body);
    if (!refreshToken) {
      return res.status(401).json({
        status: 'Unauthorized',
      });
    }
    if (refreshToken.errors.error && refreshToken?.errors.status === '401') {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }
    if (refreshToken.errors.error && refreshToken?.errors.status === '403') {
      return res.status(401).json({
        message: 'Forbidden',
      });
    }
    const newAccessToken = refreshToken.tokens.accessToken;
    const newRefreshToken = refreshToken.tokens.refreshToken;
    res.status(200).json({
      tokens: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unexpected error',
    });
  }
};

export { registerController, loginController, refreshTokenController };
