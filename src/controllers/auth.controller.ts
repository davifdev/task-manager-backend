import type { Request, Response } from 'express';
import {
  loginService,
  logoutService,
  refreshTokenService,
  registerService,
} from '../services/auth.service';

const registerController = async (req: Request, res: Response) => {
  try {
    const registerResult = await registerService(req.body);

    const accessToken = registerResult.tokens.accessToken;
    const refreshToken = registerResult.tokens.refreshToken;

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
    });

    res.status(201).json({
      username: registerResult.username,
      email: registerResult.email,
      accessToken,
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

    const accessToken = loginResult.tokens.accessToken;
    const refreshToken = loginResult.tokens.refreshToken;

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
    });

    res.status(200).json({
      username: loginResult.username,
      email: loginResult.email,
      accessToken,
    });
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : 'Unexpected error',
    });
  }
};

const refreshTokenController = async (req: Request, res: Response) => {
  try {
    const refreshToken = await refreshTokenService({
      refreshToken: req.cookies.refreshToken,
    });
    if (!refreshToken) {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }
    if (refreshToken.errors.error && refreshToken?.errors.status === '401') {
      return res.status(401).json({
        message: 'Unauthorized',
      });
    }
    if (refreshToken.errors.error && refreshToken?.errors.status === '403') {
      return res.status(403).json({
        message: 'Forbidden',
      });
    }

    const newAccessToken = refreshToken.tokens.accessToken;
    const newRefreshToken = refreshToken.tokens.refreshToken;

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      sameSite: 'strict',
    });

    res.status(200).json({
      accessToken: newAccessToken,
    });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unexpected error',
    });
  }
};

const logoutController = async (req: Request, res: Response) => {
  try {
    const logoutResult = await logoutService({
      token: req.cookies.refreshToken,
    });

    if (!logoutResult) {
      return res.status(403).json({
        message: 'Forbidden',
      });
    }

    if (logoutResult.status === '204') {
      res.clearCookie('refreshToken');
      res.status(204).json({
        message: logoutResult.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Unexpected error',
    });
  }
};

export {
  registerController,
  loginController,
  refreshTokenController,
  logoutController,
};
