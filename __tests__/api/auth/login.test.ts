import { POST } from '@/app/api/auth/login/route';
import { NextResponse } from 'next/server';
import { connect } from '@/lib/mongodb';
import User from '@/lib/models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Mock external dependencies
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, init) => ({ data, init })),
  },
}));
jest.mock('@/lib/mongodb', () => ({
  connect: jest.fn(),
}));
jest.mock('@/lib/models/user', () => ({
  findOne: jest.fn(),
}));
jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
}));
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

describe('Login API Route', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    process.env.JWT_SECRET = 'test_jwt_secret'; // Set a test JWT secret
  });

  it('should return 400 if email or password are not provided', async () => {
    const request = {
      json: async () => ({ email: 'test@example.com' }),
    } as Request;

    const response = await POST(request);

    expect(NextResponse.json).toHaveBeenCalledWith(
      { message: 'Email and password are required' },
      { status: 400 }
    );
  });

  it('should return 404 if user not found', async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);

    const request = {
      json: async () => ({ email: 'test@example.com', password: 'password123' }),
    } as Request;

    const response = await POST(request);

    expect(connect).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(NextResponse.json).toHaveBeenCalledWith(
      { message: 'User not found' },
      { status: 404 }
    );
  });

  it('should return 400 if invalid password', async () => {
    (User.findOne as jest.Mock).mockResolvedValue({ password: 'hashed_password' });
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    const request = {
      json: async () => ({ email: 'test@example.com', password: 'wrong_password' }),
    } as Request;

    const response = await POST(request);

    expect(connect).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(bcrypt.compare).toHaveBeenCalledWith('wrong_password', 'hashed_password');
    expect(NextResponse.json).toHaveBeenCalledWith(
      { message: 'Invalid password' },
      { status: 400 }
    );
  });

  it('should return 500 if JWT_SECRET is not defined', async () => {
    delete process.env.JWT_SECRET; // Unset JWT_SECRET for this test
    (User.findOne as jest.Mock).mockResolvedValue({ _id: '123', password: 'hashed_password' });
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const request = {
      json: async () => ({ email: 'test@example.com', password: 'password123' }),
    } as Request;

    const response = await POST(request);

    expect(NextResponse.json).toHaveBeenCalledWith(
      { message: 'JWT_SECRET is not defined' },
      { status: 500 }
    );
  });

  it('should return a token on successful login', async () => {
    const mockUser = { _id: 'user123', password: 'hashed_password' };
    (User.findOne as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue('mock_jwt_token');

    const request = {
      json: async () => ({ email: 'test@example.com', password: 'password123' }),
    } as Request;

    const response = await POST(request);

    expect(connect).toHaveBeenCalled();
    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashed_password');
    expect(jwt.sign).toHaveBeenCalledWith({ id: 'user123' }, 'test_jwt_secret', {
      expiresIn: '1h',
    });
    expect(NextResponse.json).toHaveBeenCalledWith({ token: 'mock_jwt_token' });
  });
});
