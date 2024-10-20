// pages/api/upload-image.ts
/*import type { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from '../../../lib/cloudinary'; // Adjust the path if needed
import { IncomingForm, File as FormidableFile } from 'formidable';
import fs from 'fs';
import util from 'util';

const unlinkFile = util.promisify(fs.unlink);

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadImage = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Something went wrong' });
    }

    try {
      // Ensure `files.file` is defined and handle the file upload
      const file = (files.file as FormidableFile[])?.[0];
      if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const result = await cloudinary.uploader.upload(file.filepath);

      // Remove the temporary file
      await unlinkFile(file.filepath);

      res.status(200).json({ url: result.secure_url });
    } catch (uploadError) {
      console.error('Upload failed:', uploadError);
      res.status(500).json({ error: 'Upload failed' });
    }
  });
};

export default uploadImage;
import { NextRequest, NextResponse } from 'next/server';
import { IncomingForm, Fields, Files, File } from 'formidable';
import cloudinary from '@/lib/cloudinary'; // Adjust the path if needed
import { promises as fs } from 'fs';

// Disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

const parseForm = async (req: NextRequest): Promise<{ fields: Fields; files: Files }> => {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm();

    const chunks: Buffer[] = [];
    req.on('data', (chunk) => {
      chunks.push(chunk);
    });

    req.on('end', () => {
      const buffer = Buffer.concat(chunks);
      form.parse(buffer, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });
  });
};

export async function POST(req: NextRequest) {
  try {
    const { files } = await parseForm(req);
    const file = files.file as File;

    if (!file || Array.isArray(file)) {
      return NextResponse.json({ error: 'No file or multiple files uploaded' }, { status: 400 });
    }

    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(file.filepath);

    // Remove the temporary file
    await fs.unlink(file.filepath);

    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error('Upload failed:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}*/

import type { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from '../../../lib/cloudinary'; // Adjust the path if needed
import { IncomingForm, File as FormidableFile } from 'formidable';
import fs from 'fs';
import util from 'util';

const unlinkFile = util.promisify(fs.unlink);


const uploadImage = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Something went wrong' });
    }

    try {
      // Ensure `files.file` is defined and handle the file upload
      
    } catch (uploadError) {
      console.error('Upload failed:', uploadError);
      res.status(500).json({ error: 'Upload failed' });
    }
  });
};