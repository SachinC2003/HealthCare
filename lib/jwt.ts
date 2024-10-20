import jwt, { JwtPayload } from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key'; // Use an environment variable for the secret key

// Define the custom JWT payload interface
interface CustomJwtPayload extends JwtPayload {
  userId: number;
}

// Function to create a token
export function signToken(payload: object, expiresIn: string = '10h'): string {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Function to verify a token
/*export function verifyToken(token: string): CustomJwtPayload {
  try {
    // Verify the token and assert the type to CustomJwtPayload
    return jwt.verify(token, SECRET_KEY) as CustomJwtPayload;
  } catch (err) {
    throw new Error('Invalid token');
  }
}*/
export function verifyToken(token: string): CustomJwtPayload {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as CustomJwtPayload;
    return decoded;
  } catch (err) {
    //console.error('Token verification error:', err.message); // Log specific error message
    throw new Error('Invalid token');
  }
}

