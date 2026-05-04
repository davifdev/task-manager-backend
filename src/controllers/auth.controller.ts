import type { Request, Response } from 'express';
import {
  getUserService,
  loginService,
  logoutService,
  refreshTokenService,
  registerService,
} from '../services/auth.service';

const registerController = async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const registerResult = await registerService(req.body);

    const accessToken = registerResult.tokens.accessToken;
    const refreshToken = registerResult.tokens.refreshToken;

    res.status(201).json({
      username: registerResult.username,
      email: registerResult.email,
      tokens: {
        accessToken,
        refreshToken,
      },
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

    res.status(200).json({
      username: loginResult.username,
      email: loginResult.email,
      tokens: {
        accessToken,
        refreshToken,
      },
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
      refreshToken: req.body.refreshToken,
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

const getUserController = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) return;

  try {
    const user = await getUserService(userId);
    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
    });
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
  getUserController,
};
