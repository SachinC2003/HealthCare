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

export default uploadImage;*/
import type { NextApiRequest, NextApiResponse } from 'next';
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Something went wrong' });
    }

    try {
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
}
